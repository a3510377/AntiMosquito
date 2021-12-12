<template>
  <div class="menu flex">
    <div class="list flex">
      <div>1</div>
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
    <div class="openMenu"><div class="style" /></div>
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
  .list {
    > div {
      padding: 0 10%;
    }
  }
  .openMenu {
    width: 30px;
    height: 30px;
    .style {
      &,
      &:after,
      &:before {
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
