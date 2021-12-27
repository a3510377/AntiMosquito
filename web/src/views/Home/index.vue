<template>
  <div class="home">
    <Map />
    <chartMain />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Map from "@/components/main/map/index.vue";
import chartMain from "@/components/main/chart/index.vue";

export default defineComponent({
  components: {
    Map,
    chartMain,
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  :deep() {
    .map {
      height: 70vh;
      width: 80%;
    }
    .chart {
      width: 400px;
      height: 300px;
    }
  }
}
</style>
