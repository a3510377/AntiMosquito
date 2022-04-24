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
import { datasType, dataTypes } from "./utils/types";

const mapEl = ref<HTMLElement>();
const title = ref<string>();
let map: Map;
// MAP
onMounted(() => mapEl.value && (map = new Map(mapEl.value)));

// connect
onMounted(() => {
  let source = new EventSource(`${apiUrl}/api/v1/map/events`);
  source.addEventListener("set", ({ data: _data }) => {
    let data = <dataTypes>JSON.parse(_data);
    switch (data.type) {
      case "ram":
        map.rams = <datasType["ram"]>data.data;
        Object.values(map.map.getLayers()).forEach((v) =>
          v.getSource().dispatchEvent("change")
        );
        break;
    }
  });
  source.addEventListener("add", ({ data: _data }) => {
    let data = <dataTypes>_data;
    switch (data.type) {
      case "ram":
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
