<template>
  <div class="map" ref="map" />
  <div class="loading" ref="loading" />
</template>

<script lang="ts">
import { ref, reactive, Ref, defineComponent } from "vue";

import axios from "axios";
import { Map, View, Geolocation, Feature } from "ol";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector, OSM } from "ol/source";
import { defaults, Attribution } from "ol/control";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { TopoJSON, GeoJSON } from "ol/format";
import { fromLonLat } from "ol/proj";
import { Geometry, Point } from "ol/geom";
import { Tile as TileLayer } from "ol/layer";
import { defaults as defaultControls } from "ol/control";
import "ol/ol.css";

import { apiUrl } from "@/config";
import { ApiMainData } from "@/types/apiData";
import { cFeature, countyStyle, townStyle, villageStyle } from "./util";
import { baseControl, baseControlDiv } from "./controls";

export default defineComponent({
  data() {
    return {
      data: null as unknown as ApiMainData,
      layers: {} as { [key: string]: layerVector<sourceVector<Geometry>> },
    };
  },
  setup() {
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
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : void 0
      );
      if (!firstPosDone) {
        appView.setCenter(coordinates);
        firstPosDone = true;
      }
    });
    return { oldClick, positionFeature, map, appView, geolocation };
  },
  async mounted() {
    let oldClick = this.oldClick,
      positionFeature = this.positionFeature,
      map = this.map,
      appView = this.appView;
    this.data = (
      await axios({
        url: `${apiUrl}/api/v1/data`,
        method: "GET",
      })
    ).data as ApiMainData;

    let layers = (this.layers = {
      /** 里 */
      village: new layerVector({
        source: new sourceVector({
          url: "/data/topo/village/20210324.json",
          format: new TopoJSON(),
        }),
        style: villageStyle.bind(this),
        zIndex: 50,
      }),
      /** 鄉鎮 */
      town: new layerVector({
        source: new sourceVector({
          url: "/data/topo/town/city.topo.json",
          format: new TopoJSON(),
        }),
        style: townStyle.bind(this),
        zIndex: 100,
      }),
      /** 縣市 */
      county: new layerVector({
        source: new sourceVector({
          url: "/data/topo/county/20200820.json",
          format: new TopoJSON(),
        }),
        style: countyStyle.bind(this),
        zIndex: 150,
      }),
      /**快篩試劑配置醫療院所 @url https://data.cdc.gov.tw/dataset/dengue-ns1 */
      NS1Test: new layerVector({
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
    } as unknown as { [key: string]: layerVector<sourceVector<Geometry>> });
    let A_map = new Map({
      controls: defaultControls(),
      target: map,
      layers: [
        new TileLayer({
          source: new OSM(),
          zIndex: 0,
        }),
        layers.village,
        layers.town,
        layers.county,
        layers.NS1Test,
        layers.locationPoint,
      ],
      view: appView,
    });
    new baseControlDiv({
      target: map,
      control: [
        new baseControl(
          {
            target: map,
            text: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1.375em" viewBox="0 0 24 24" width="1.375em" fill="#fff"><rect fill="none" height="24" width="24"/><path d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M20.5,9c0,3.65-1.49,5.27-3.01,5.98c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1s1,0.45,1,1V9z M10.69,10.48 c-0.44,0.26-0.96,0.56-1.69,0.76V10.2c0.48-0.17,0.84-0.38,1.18-0.58C10.72,9.3,11.23,9,12,9s1.27,0.3,1.8,0.62 c0.34,0.2,0.71,0.42,1.2,0.59v1.04c-0.75-0.21-1.26-0.51-1.71-0.78C12.83,10.2,12.49,10,12,10C11.51,10,11.16,10.2,10.69,10.48z"/></svg>`,
            title: "快篩院所",
          },
          () => layers.NS1Test.setVisible(!layers.NS1Test.getVisible())
        ),
        new baseControl(
          {
            target: map,
            text: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
            title: "定位到我",
            show: !!this.geolocation.getPosition(),
          },
          () => {
            A_map.getView().setZoom(12);
            A_map.getView().animate({
              center: this.geolocation.getPosition(),
              duration: 1,
            });
          }
        ),
      ],
    });
    A_map.on("singleclick", (e) => {
      /* 里 */
      A_map.forEachFeatureAtPixel(
        e.pixel,
        (_feature) => {
          let feature = _feature as cFeature;

          if (
            feature.get("VILLNAME") &&
            A_map.getView().get("resolution") < 40
          ) {
            feature.setStyle(
              villageStyle.call(this, feature, void 0, {
                stroke: new Stroke({ color: "#000", width: 3 }),
              })
            );
            if (oldClick.village && oldClick.village?.ol_uid !== feature.ol_uid)
              oldClick.village?.setStyle(villageStyle.bind(this));
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
            townStyle.call(this, feature, resolution, {
              stroke: new Stroke({ color: "#000", width: 3 }),
            })
          );
          if (oldClick.town && oldClick.town?.ol_uid !== feature.ol_uid)
            oldClick.town?.setStyle(townStyle.bind(this));
          oldClick.town = feature;
        },
        { layerFilter: (layer) => layer === layers.town }
      );
      A_map.forEachFeatureAtPixel(
        e.pixel,
        (_feature) => {
          let feature = _feature as cFeature;
          feature.setStyle(
            countyStyle.call(this, feature, void 0, {
              stroke: new Stroke({ color: "#000", width: 3 }),
            })
          );
          if (oldClick.county && oldClick.county?.ol_uid !== feature.ol_uid)
            oldClick.county?.setStyle(townStyle.bind(this));
          oldClick.county = feature;
        },
        { layerFilter: (layer) => layer === layers.county }
      );
    });
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
  :deep {
    .ol-attribution.ol-unselectable.ol-control.ol-uncollapsible {
      display: none;
    }
  }
}
</style>
