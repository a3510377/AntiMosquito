<template>
  <Map />
  <chartMain />
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

<style lang="scss" scoped></style>
