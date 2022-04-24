<template>
  <div class="cams">
    <div
      v-if="Object.keys(data).length <= 0 || !ready"
      class="errorText not-ready"
    >
      {{ !ready ? "連線中" : "尚無數據" }}
      <p v-text="vReady" />
    </div>

    <div v-else class="content">
      <div v-for="(_, index) in data" :key="index" class="cam">
        <img :src="_.show ? _.fImg : _.img" @click="_.show = !_.show" />
        <div>
          <p v-text="`ID: ${_.id || ''}`" />
          <p v-text="`名稱: ${_.user.name || ''}`" />
          <p v-text="`數量: ${_?.data?.contours || 0}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderMain from "@/components/main/headers/index.vue";
import { defineComponent } from "vue";
import { apiUrl } from "@/config";
import { userType } from "@/types/apiData";

export default defineComponent({
  data() {
    return {
      timeOut: <NodeJS.Timeout | undefined>void 0,
      ready: <boolean>false,
      data: <
        {
          [id: string]: {
            id: string;
            img: string;
            user: userType;
            fImg: string;
            show: boolean;
            data: { contours: number };
          };
        }
      >{},
      vReady: "",
    };
  },
  components: {
    HeaderMain,
  },
  beforeUnmount() {
    this.closeTimeOut();
  },
  mounted() {
    let txt = ".".repeat(4);
    this.timeOut = setInterval(() => {
      this.vReady =
        this.vReady.length >= txt.length
          ? txt[0]
          : txt.substring(0, this.vReady.length + 1);
    }, 5e2);

    let source = new EventSource(`${apiUrl}/api/v1/postImg/imgs`);
    source.addEventListener("addImg", ({ data: _data }) => {
      let data = <
        {
          id: string;
          img: string;
          user: userType;
          fImg: string;
          data: { contours: number };
        }
      >JSON.parse(_data);
      this.data[data.id] = {
        ...data,
        show: this.data[data.id] === void 0 ? false : this.data[data.id].show,
      };
    });
    source.addEventListener("open", () => (this.ready = true), false);
    source.addEventListener("close", () => (this.ready = false), false);
    source.addEventListener("deleteImg", ({ data }) => delete this.data[data]);
  },
  methods: {
    closeTimeOut() {
      this.timeOut && clearInterval(this.timeOut);
    },
  },
});
</script>

<style lang="scss" scoped>
.cams {
  color: white;
  width: 100%;
  height: calc(100vh - var(--html-margin-top, 0));
  .errorText {
    width: 100%;
    height: 100%;
    font-size: 25pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .cam {
      margin: 10px 1em;
      img {
        cursor: pointer;
      }
    }
  }
}
</style>
