<template>
  <HeaderMain />
  <chartMain />
</template>

<script lang="ts">
import HeaderMain from "@/components/main/headers/index.vue";
import chartMain from "@/components/main/chart/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderMain,
    chartMain,
  },
});
</script>

<style lang="scss" scoped></style>
