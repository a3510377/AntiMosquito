<template>
  <div class="menu flex flex-item-center">
    <div class="list flex flex-center">
      <div>
        <a href="/">文檔</a>
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
    </div>
    <div class="openMenu flex flex-item-center"><div class="style" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  width: 100%;
  .list {
    > div {
      cursor: pointer;
      height: 100%;
      padding: 10px 15px;
      border-radius: 8px;
      &:hover {
        background-color: rgb(45, 45, 45);
      }
    }
  }
  .openMenu {
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: fixed;
    right: 15px;
    .style {
      position: relative;
      &,
      &:after,
      &:before {
        border-radius: 8px;
        content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background-color: #fff;
        color: #fff;
      }
      &:before {
        top: -10px;
      }
      &:after {
        top: 10px;
      }
    }
  }
}
</style>
