<template>
  <div class="main">
    <HeaderMain />
    <slot />
    <HeaderMain />
  </div>
</template>

<script lang="ts">
import HeaderMain from "@/components/main/headers/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderMain,
  },
});
</script>

<style lang="scss" scoped></style>
