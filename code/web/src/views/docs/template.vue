<template>
  <div class="docs">
    <docsMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import docsMenu from "@/components/docs/menu.vue";

export default defineComponent({
  components: {
    docsMenu,
  },
});
</script>

<style lang="scss" scoped></style>
