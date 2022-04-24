<template>
  <div class="maps flex flex-item-center">
    <div class="map" ref="mapEl">
      <div class="info" ref="info">
        <h1 class="title" v-text="title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

import { apiUrl } from "@/config";

import Map from "./utils/map";
import { dataTypes } from "./utils/types";

const mapEl = ref<HTMLElement>();
const title = ref<string>();

// MAP
onMounted(() => mapEl.value && new Map(mapEl.value));

// connect
onMounted(() => {
  let source = new EventSource(`${apiUrl}/map/data`);
  source.addEventListener("set", ({ data: _data }) => {
    let data = <dataTypes>_data;
    switch (data.type) {
      case "ram":
      case "count":
    }
  });
  source.addEventListener("add", ({ data: _data }) => {
    let data = <dataTypes>_data;
    switch (data.type) {
      case "ram":
      case "count":
    }
  });
  source.addEventListener("open", () => {}, false);
  source.addEventListener("close", () => {}, false);
});
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
