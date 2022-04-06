<template>
  <div class="cams">
    <div class="cam" v-for="(_, index) in data" :key="index">
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
      data: <{ img: string; user: Object }[]>[],
    };
  },
  components: {
    HeaderMain,
  },
  mounted() {
    let source = new EventSource("//127.0.01:3500/api/v1/postImg/imgs", {
      // withCredentials: true,
    });
    source.addEventListener("addImg", (data) => {
      this.data.push(JSON.parse(data.data));
    });
    source.addEventListener(
      "open",
      function (e) {
        // 連線已建立
      },
      false
    );
  },
});
</script>

<style lang="scss" scoped></style>
