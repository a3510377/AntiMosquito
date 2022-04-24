<template>
  <div class="main">
    <HeaderMain />
    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderMain from "@/components/main/headers/index.vue";
</script>

<style lang="scss" scoped></style>
