<template>
  <div class="map" ref="map" />
  <div class="loading" ref="loading" />
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, onMounted } from "vue";

import axios from "axios";
import { Map, View, Geolocation, Feature } from "ol";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { TopoJSON, GeoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import { Geometry, Point } from "ol/geom";
import "ol/ol.css";

import { apiUrl } from "@/config";
import { ApiMainData } from "@/types/apiData";
import { cFeature, countyStyle, townStyle, villageStyle } from "./util";

/* refs */
const map = ref(null) as unknown as Ref<HTMLElement>;
const oldClick = reactive({
  /**里 */
  village: void 0 as cFeature | undefined,
  /**鄉 */
  town: void 0 as cFeature | undefined,
  /**縣市 */
  county: void 0 as cFeature | undefined,
});

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
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : void 0);
  if (!firstPosDone) {
    appView.setCenter(coordinates);
    firstPosDone = true;
  }
});
onMounted(async () => {
  const data = reactive(
    (
      await axios({
        url: `${apiUrl}/api/v1/data`,
        method: "GET",
      })
    ).data as ApiMainData
  );
  const _this = { data };

  const layers = reactive({
    /** 里 */
    village: new layerVector({
      source: new sourceVector({
        url: "https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",
        format: new TopoJSON(),
      }),
      style: villageStyle.bind(_this),
      zIndex: 50,
    }),
    /** 鄉鎮 */
    town: new layerVector({
      source: new sourceVector({
        url: "https://kiang.github.io/taiwan_basecode/city/city.topo.json",
        format: new TopoJSON(),
      }),
      style: townStyle.bind(_this),
      zIndex: 100,
    }),
    /** 縣市 */
    county: new layerVector({
      source: new sourceVector({
        url: "https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",
        format: new TopoJSON(),
      }),
      style: countyStyle.bind(_this),
      zIndex: 150,
    }),
    /**快篩試劑配置醫療院所 @url https://data.cdc.gov.tw/dataset/dengue-ns1 */
    test: new layerVector({
      source: new sourceVector({
        url: "/data/ns1hosp_20160603.json",
        format: new GeoJSON(),
      }),
      zIndex: 200,
    }),
    /** 定位點 */
    locationPoint: new layerVector({
      source: new sourceVector({ features: [positionFeature] }),
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "#3399CC" }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      }),
      zIndex: 250,
    }),
  }) as unknown as { [key: string]: layerVector<sourceVector<Geometry>> };

  let A_map = new Map({
    target: map.value,
    layers: [
      layers.village,
      layers.town,
      layers.county,
      layers.test,
      layers.locationPoint,
    ],
    view: appView,
    controls: defaults({ attribution: false }).extend([
      new Attribution({ collapsible: false, collapsed: true }),
    ]),
  });
  A_map.on("singleclick", (e) => {
    /* 里 */
    A_map.forEachFeatureAtPixel(
      e.pixel,
      (_feature) => {
        let feature = _feature as cFeature;

        if (feature.get("VILLNAME") && A_map.getView().get("resolution") < 40) {
          feature.setStyle(
            villageStyle.call(_this, feature, void 0, {
              stroke: new Stroke({ color: "#000", width: 3 }),
            })
          );
          if (oldClick.village && oldClick.village?.ol_uid !== feature.ol_uid)
            oldClick.village?.setStyle(villageStyle.bind(_this));
          oldClick.village = feature;
        }
      },
      { layerFilter: (layer) => layer === layers.village }
    );
    /* 鄉鎮 */
    A_map.forEachFeatureAtPixel(
      e.pixel,
      (_feature) => {
        let feature = _feature as cFeature;
        let resolution = A_map.getView().get("resolution") as number;
        feature.setStyle(
          townStyle.call({ data: data }, feature, resolution, {
            stroke: new Stroke({ color: "#000", width: 3 }),
          })
        );
        if (oldClick.town && oldClick.town?.ol_uid !== feature.ol_uid)
          oldClick.town?.setStyle(townStyle.bind(_this));
        oldClick.town = feature;
      },
      { layerFilter: (layer) => layer === layers.town }
    );
    A_map.forEachFeatureAtPixel(
      e.pixel,
      (_feature) => {
        let feature = _feature as cFeature;
        feature.setStyle(
          countyStyle.call({ data: data }, feature, void 0, {
            stroke: new Stroke({ color: "#000", width: 3 }),
          })
        );
        if (oldClick.county && oldClick.county?.ol_uid !== feature.ol_uid)
          oldClick.county?.setStyle(townStyle.bind(_this));
        oldClick.county = feature;
      },
      { layerFilter: (layer) => layer === layers.county }
    );
  });
});
</script>

<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
}
</style>
