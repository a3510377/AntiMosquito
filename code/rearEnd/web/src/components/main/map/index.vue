<template>
  <div class="map" ref="map"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ol, { Map, View } from "ol";
import { Vector as layerVector, Tile } from "ol/layer";
import { Vector as sourceVector, XYZ } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { TopoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

export default defineComponent({
  mounted() {
    // target: this.$refs.map as HTMLElement,
    let appView = new View({
      center: fromLonLat([120.221507, 23.000694]),
      zoom: 14,
    });
    let map = new Map({
      target: this.$refs.map as HTMLElement,
      layers: [
        // new layerVector({
        //   source: new sourceVector({
        //     url: import("@/data/Topology.json"),
        //     format: new TopoJSON({}),
        //   }),
        //   zIndex: 50,
        // }),
      ],
      view: appView,
      controls: defaults({ attribution: false }).extend([
        new Attribution({
          collapsible: false,
          collapsed: true,
        }),
      ]),
    });
  },
});
</script>

<style lang="scss" scoped>
.map {
  width: 300px;
  height: 300px;
}
</style>
