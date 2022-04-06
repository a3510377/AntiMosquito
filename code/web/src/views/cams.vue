<template>
  <div class="cams">
    <p v-if="!ready" class="not-ready" v-text="`請稍後${vReady}`" />
    <div v-else class="cam" v-for="(_, index) in data" :key="index">
      <img :src="_.img" alt="" />
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
      data: <{ [id: string]: { img: string; user: Object } }>{},
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
      let data = JSON.parse(_data);
      console.log(data);

      this.data;
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
  display: flex;
  align-items: center;
  justify-content: center;

  .not-ready {
    font-size: 25pt;
  }
}
</style>
