<template>
  <header id="header" class="flex flex-item-center">
    <router-link to="/" class="title">蚊親更清晰</router-link>
    <div class="menu flex flex-item-center">
      <div class="list flex flex-center" ref="menuListEl">
        <div class="content">
          <div class="item">
            <router-link to="/DiseaseInfo">滋事館</router-link>
          </div>
        </div>
      </div>
      <div class="openMenu flex flex-item-center" @click="toggleMenu">
        <div class="style" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

export default defineComponent({
  setup() {
    const menuListEl = ref("menuListEl") as unknown as Ref<HTMLElement>;
    return { menuListEl };
  },
  mounted() {
    addEventListener(
      "resize",
      () => window.innerWidth < 700 && this.menuListEl.classList.remove("open")
    );
  },
  methods: {
    toggleMenu() {
      this.menuListEl.classList.toggle("open");
    },
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
  z-index: 9999;
  @media all and (max-width: 700px) {
    .title {
      width: 100%;
    }
    .list:not(.open) {
      display: none;
    }
    .menu {
      width: 0 !important;
      .openMenu {
        display: flex !important;
      }
    }
  }
  .title {
    font-weight: 900;
    padding: 0;
    font-size: 20pt;
    min-width: 14%;
    margin: 0 10px;
    text-align: center;
  }
  .menu {
    height: 100%;
    width: 100%;
    .list {
      &.open {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        background: red;
        width: 80%;
        .content {
          padding-top: var(--html-margin-top);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          .item {
            width: 80%;
            border-radius: 0;
          }
        }
      }
      .content {
        display: flex;
        .item {
          cursor: pointer;
          padding: 10px 15px;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          &:hover {
            background-color: rgb(45, 45, 45);
          }
        }
      }
    }
    .openMenu {
      cursor: pointer;
      width: 30px;
      height: 30px;
      position: fixed;
      right: 15px;
      display: none;
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
}
</style>
