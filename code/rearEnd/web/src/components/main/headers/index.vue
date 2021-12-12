<template>
  <header id="header" class="flex flex-item-center">
    <h1 class="title">蚊子</h1>
    <Menu class="menu" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./menu/index.vue";

export default defineComponent({
  components: {
    Menu,
  },
});
</script>

<style lang="scss" scoped>
#header {
  color: #fff;
  background-color: #00000070;
  position: fixed;
  min-height: 50px;
  top: 0;
  left: 0;
  right: 0;
  .title {
    padding: 0;
    font-size: 20pt;
    margin: 0 5% 0 8%;
    width: 10%;
  }
  .menu {
    max-width: 80%;
  }
  @media all and (max-width: 550px) {
    .title {
      width: auto;
    }
    .menu {
      display: none;
    }
  }
}
</style>
