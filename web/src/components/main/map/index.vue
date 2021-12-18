<template>
  <div class="map" ref="map" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Map, View, Geolocation, Feature } from "ol";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { Style, Fill, Stroke, Text, Circle } from "ol/style";
import { TopoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import "ol/ol.css";
import { apiUrl } from "@/config";
import { ApiMainData } from "@/types/apiData";

export default defineComponent({
  data() {
    return {
      data: {} as ApiMainData,
    };
  },
  async mounted() {
    let data = (this.data = (
      await axios({
        url: `${apiUrl}/api/v1/data`,
        method: "GET",
      })
    ).data as ApiMainData);
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
      let coordinates = geolocation.getPosition();
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
        /* 里 */
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",
            format: new TopoJSON(),
          }),
          style: (feature, resolution) => {
            if (resolution > 40)
              return new Style({ fill: new Fill({ color: "#ffffff" }) });
            let mosquitos = 0;

            (
              data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")]?.[
                feature.get("VILLNAME")
              ] || []
            ).forEach((d) => (mosquitos += d.mosquitos));

            return new Style({
              stroke: new Stroke({ color: "#000", width: 1 }),
              fill: new Fill({ color: this.setFillColor(~~(mosquitos / 10)) }),
              text: new Text({
                font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
                fill: new Fill({ color: "#000" }),
                text: feature.get("VILLNAME"),
              }),
            });
          },
          zIndex: 50,
        }),
        /* 鄉區 */
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/city/city.topo.json",
            format: new TopoJSON(),
          }),
          style: (feature, resolution) => {
            if (resolution > 40 && resolution < 180) {
              let mosquitos = 0;
              Object.entries(
                data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")] ||
                  {}
              ).forEach(([$_0, value]) =>
                value.forEach((v) => (mosquitos += v.mosquitos))
              );
              return new Style({
                stroke: new Stroke({ color: "#ff0000", width: 1 }),
                fill: new Fill({
                  color: this.setFillColor(~~(mosquitos / 50)),
                }),
                text: new Text({
                  font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
                  text: feature.get("TOWNNAME"),
                }),
              });
            }
            if (resolution <= 180)
              return new Style({
                stroke: new Stroke({ color: "#ff0000", width: 1 }),
              });
          },
          zIndex: 100,
        }),
        /* 縣市 */
        new layerVector({
          source: new sourceVector({
            url: "https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",
            format: new TopoJSON(),
          }),
          style: (feature, resolution) => {
            return new Style({
              stroke: new Stroke({ color: "#0000ff", width: 1 }),
              fill: new Fill({ color: "#ffffff00" }),
              text: new Text({
                font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
                text: resolution > 180 ? feature.get("COUNTYNAME") : void 0,
              }),
            });
          },
          zIndex: 150,
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
  methods: {
    setFillColor(num: number) {
      let color = "#fff";

      if (num > 50) color = "#470115";
      else if (num > 20) color = "#6f006d";
      else if (num > 10) color = "#a4005b";
      else if (num > 5) color = "#d00b33";
      else if (num > 3) color = "#e75033";
      else if (num > 1) color = "#ffa133";
      else if (num > 0) color = "#e3d738";

      return color;
    },
  },
});
</script>

<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
}
</style>
