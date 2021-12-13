<template>
  <templateMain />
  <router-views />
</template>

<script lang="ts">
import templateMain from "@/views/template/main.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    templateMain,
  },
});
</script>

<style lang="scss">
@import url(@/assets/scss/main.scss);
</style>
