<template>
  <div class="home">
    <Map />
    <ChartMain />
  </div>
</template>

<script lang="ts" setup>
import Map from "@/components/main/map/index.vue";
import ChartMain from "@/components/main/chart/index.vue";
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  :deep() {
    .maps {
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
