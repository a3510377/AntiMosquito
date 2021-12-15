<template>
  <div class="map" ref="map" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Map, View } from "ol";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { Style, Fill, Stroke, Text } from "ol/style";
import { TopoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

export default defineComponent({
  mounted() {
    // target: this.$refs.map as HTMLElement,
    let appView = new View({
      center: fromLonLat([120.221507, 23.000694]),
      zoom: 12,
    });
    let map = new Map({
      target: this.$refs.map as HTMLElement,
      layers: [
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",
            format: new TopoJSON(),
          }),
          style: (data) => {
            let info = data.getProperties();
            let main = new Style({
              stroke: new Stroke({ color: "rgba(0,0,0,1)", width: 1 }),
              fill: new Fill({ color: "#ffffff" }),
              text: new Text({
                font: '14px "Open Sans", "Arial Unicode MS", "sans-serif"',
                fill: new Fill({ color: "#000" }),
              }),
            });
            console.log(info);

            main
              .getText()
              .setText(info.COUNTYNAME + info.TOWNNAME + info.VILLNAME);
            return main;
          },
          zIndex: 50,
        }),
      ],
      view: appView,
      controls: defaults({ attribution: false }).extend([
        new Attribution({ collapsible: false, collapsed: true }),
      ]),
    });
  },
});
</script>

<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
}
</style>
