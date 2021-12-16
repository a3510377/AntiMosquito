<template>
  <div class="map" ref="map" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Map, View, Geolocation, Feature } from "ol";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { Style, Fill, Stroke, Text, Circle } from "ol/style";
import { TopoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import "ol/ol.css";

export default defineComponent({
  mounted() {
    let positionFeature = new Feature(),
      firstPosDone = false;
    let appView = new View({
      center: fromLonLat([120.221507, 23.000694]),
      zoom: 12,
    });
    let geolocation = new Geolocation({ projection: appView.getProjection() });
    geolocation.setTracking(true);
    geolocation.on("error", (error) => console.log(error.message));
    geolocation.on("change:position", function () {
      var coordinates = geolocation.getPosition();
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : void 0
      );
      if (!firstPosDone) {
        appView.setCenter(coordinates);
        firstPosDone = true;
      }
    });

    let map = new Map({
      target: this.$refs.map as HTMLElement,
      layers: [
        /* 鄉鎮 */
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",
            format: new TopoJSON(),
          }),
          style: (data) => {
            let info = data.getProperties();
            let main = new Style({
              stroke: new Stroke({ color: "#000", width: 1 }),
              fill: new Fill({ color: "#ffffff" }),
              text: new Text({
                font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
                fill: new Fill({ color: "#000" }),
              }),
            });
            main.getText().setText(`${info.TOWNNAME}${info.VILLNAME}`);
            return main;
          },
          zIndex: 50,
        }),
        /* 區 */
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/city/city.topo.json",
            format: new TopoJSON(),
          }),
          style: new Style({
            stroke: new Stroke({ color: "#ff0000", width: 1 }),
            fill: new Fill({ color: "#ffffff00" }),
          }),
          zIndex: 100,
        }),
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",
            format: new TopoJSON(),
          }),
          style: new Style({
            stroke: new Stroke({ color: "#0000ff", width: 1 }),
            fill: new Fill({ color: "#ffffff00" }),
          }),
          zIndex: 100,
        }),
        /* 定位點 */
        new layerVector({
          source: new sourceVector({ features: [positionFeature] }),
          style: new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({ color: "#3399CC" }),
              stroke: new Stroke({ color: "#fff", width: 2 }),
            }),
          }),
          zIndex: 200,
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
