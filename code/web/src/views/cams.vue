<template>
  <div class="cams">
    <p v-if="!ready" class="not-ready" v-text="`請稍後${vReady}`" />
    <div v-else>
      <div v-for="(_, index) in data" :key="index">
        <img
          :src="_.show ? _.fImg : _.img"
          class="cam"
          @click="_.show = !_.show"
        />
        <div>
          <p v-text="`數量: ${_?.data?.contours || 0}`" />
          <p v-text="`ID: ${_.id || ''}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderMain from "@/components/main/headers/index.vue";
import { defineComponent } from "vue";

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
            user: Object;
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
    let source = new EventSource("//127.0.01:3500/api/v1/postImg/imgs");
    source.addEventListener("addImg", ({ data: _data }) => {
      let data = <
        {
          id: string;
          img: string;
          user: Object;
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
  height: 100%;

  .not-ready {
    font-size: 25pt;
  }
  .cam {
    width: 10em;
    cursor: pointer;
  }
  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
}
</style>
