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
import { Geometry, Point } from "ol/geom";
import "ol/ol.css";

import { apiUrl } from "@/config";
import { Options as StyleOptions } from "ol/style/Style";
import { ApiMainData } from "@/types/apiData";
import RenderFeature from "ol/render/Feature";

interface cFeature extends Feature<Geometry> {
  _chick: boolean;
  mosquitos: number;
}

export default defineComponent({
  data() {
    return {
      data: {} as ApiMainData,
      oldClick: {
        /**里 */
        village: void 0 as cFeature | undefined,
        /**鄉 */
        town: void 0 as cFeature | undefined,
      },
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
    /** 里 */
    let village = new layerVector({
        source: new sourceVector({
          url: "https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",
          format: new TopoJSON(),
        }),
        style: this.villageStyle.bind(this),
        zIndex: 50,
      }),
      /** 鄉鎮 */
      town = new layerVector({
        source: new sourceVector({
          url: "https://kiang.github.io/taiwan_basecode/city/city.topo.json",
          format: new TopoJSON(),
        }),
        style: this.townStyle.bind(this),
        zIndex: 100,
      }),
      /** 縣市 */
      county = new layerVector({
        source: new sourceVector({
          url: "https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",
          format: new TopoJSON(),
        }),
        style: this.countyStyle.bind(this),
        zIndex: 150,
      }),
      /** 定位點 */
      locationPoint = new layerVector({
        source: new sourceVector({ features: [positionFeature] }),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: "#3399CC" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        }),
        zIndex: 200,
      });
    let map = new Map({
      target: this.$refs.map as HTMLElement,
      layers: [village, town, county, locationPoint],
      view: appView,
      controls: defaults({ attribution: false }).extend([
        new Attribution({ collapsible: false, collapsed: true }),
      ]),
    });
    map.on("singleclick", (e) => {
      /* 里 */
      map.forEachFeatureAtPixel(
        e.pixel,
        (_feature) => {
          let feature = _feature as cFeature;

          if (feature.get("VILLNAME") && map.getView().get("resolution") < 40) {
            feature.setStyle(
              this.villageStyle(feature, void 0, {
                stroke: new Stroke({ color: "#000", width: 3 }),
              })
            );
            if (this.oldClick.village)
              this.oldClick.village?.setStyle(this.villageStyle);
            this.oldClick.village = feature;
          }
        },
        { layerFilter: (layer) => layer === village }
      );
      /* 鄉鎮 */
      map.forEachFeatureAtPixel(
        e.pixel,
        (_feature) => {
          let feature = _feature as cFeature;
          let resolution = map.getView().get("resolution") as number;
          feature.setStyle(
            this.townStyle(feature, resolution, {
              stroke: new Stroke({ color: "#000", width: 3 }),
            })
          );
          if (this.oldClick.town && !Object.is(this.oldClick, feature))
            this.oldClick.town?.setStyle(this.townStyle);
          this.oldClick.town = feature;
        },
        { layerFilter: (layer) => layer === town }
      );
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
    countyStyle(
      _feature: cFeature | Feature<Geometry> | RenderFeature,
      resolution?: number,
      options?: StyleOptions
    ) {
      let feature = _feature as cFeature;
      let mosquitos = 0;
      console.log(feature.mosquitos);

      if (feature.mosquitos === void 0) {
        let data = this.data?.[feature.get("COUNTYNAME")];
        if (typeof data === "object")
          Object.entries(data).forEach(([$_0, value]) =>
            Object.entries(value).forEach(([$_1, _value]) =>
              _value.forEach((v) => (mosquitos += v.mosquitos))
            )
          );
      }
      mosquitos = feature.mosquitos ||= mosquitos;

      // if (mosquitos)

      return new Style({
        stroke: new Stroke({ color: "#0000ff", width: 1 }),
        fill: new Fill({ color: "#ffffff00" }),
        text: new Text({
          font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
          text:
            resolution && resolution > 180
              ? feature.get("COUNTYNAME") + mosquitos || ""
              : void 0,
        }),
        ...options,
      });
    },
    townStyle(
      _feature: cFeature | Feature<Geometry> | RenderFeature,
      resolution?: number,
      options?: StyleOptions
    ) {
      let feature = _feature as cFeature;
      if (resolution && resolution > 40 && resolution < 180) {
        let mosquitos = 0;

        if (feature.mosquitos === void 0)
          Object.entries(
            this.data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")] ||
              {}
          ).forEach(([$_0, value]) =>
            value.forEach((v) => (mosquitos += v.mosquitos))
          );

        mosquitos = feature.mosquitos ||= mosquitos;

        return new Style({
          stroke: new Stroke({ color: "#ff0000", width: 1 }),
          fill: new Fill({
            color: this.setFillColor(~~(mosquitos / 50)),
          }),
          text: new Text({
            font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
            text: `${feature.get("TOWNNAME")}\n${mosquitos || ""}`,
          }),
          ...options,
        });
      }
      if (resolution && resolution <= 180)
        return new Style({
          stroke: new Stroke({ color: "#ff0000", width: 1 }),
        });
      return new Style({
        fill: new Fill({ color: "#fff" }),
        stroke: new Stroke({ color: "#ff00004a", width: 1 }),
      });
    },
    villageStyle(
      _feature: cFeature | Feature<Geometry> | RenderFeature,
      resolution?: number,
      options?: StyleOptions
    ) {
      let feature = _feature as cFeature;
      if (resolution && resolution > 40)
        return new Style({ fill: new Fill({ color: "#ffffff" }) });
      let mosquitos = 0;

      if (feature.mosquitos === void 0)
        (
          this.data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")]?.[
            feature.get("VILLNAME")
          ] || []
        ).forEach((d) => (mosquitos += d.mosquitos));

      mosquitos = feature.mosquitos ||= mosquitos;

      return new Style({
        stroke: new Stroke({ color: "#000", width: 1 }),
        fill: new Fill({ color: this.setFillColor(~~(mosquitos / 10)) }),
        text: new Text({
          font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
          fill: new Fill({ color: "#000" }),
          text: `${feature.get("VILLNAME") || ""}\n${mosquitos || ""}`,
        }),
        ...options,
      });
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
