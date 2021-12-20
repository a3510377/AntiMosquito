<template>
  <templateMain />
  <router-view class="wrapper" />
  <Map />
</template>

<script lang="ts">
import templateMain from "@/views/main.vue";
import { defineComponent } from "vue";
import Map from "@/components/main/map/index.vue";

export default defineComponent({
  components: {
    templateMain,
    Map,
  },
  setup() {
    setTimeout(() => {
      // console.clear();
      console.log(
        "%c Monkey %c\n awa",
        "padding: 10px 42px; font-size: 32px; font-weight: 600; color: #596164; text-shadow: 2px 2px 6px #ffb199; border-radius: 10px; background-color: rgb(233, 233, 233); background-image: radial-gradient( circle at 100% 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 0 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 50% 100%, white 10%, rgb(233, 233, 233) 10%, rgb(233, 233, 233) 23%, white 23%, white 30%, rgb(233, 233, 233) 30%, rgb(233, 233, 233) 43%, white 43%, white 50%, rgb(233, 233, 233) 50%, rgb(233, 233, 233) 63%, white 63%, white 71%, transparent 71%, transparent ), radial-gradient( circle at 100% 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ), radial-gradient( circle at 0 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ); background-size: 100px 50px;",
        "padding-top: 40px;"
      );
    }, 1e3);
  },
});
</script>

<style lang="scss">
@import url(@/assets/scss/main.scss);
</style>
