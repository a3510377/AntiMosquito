import { Map as OlMap, View, Geolocation, Feature } from "ol";
import { defaults as defaultControls } from "ol/control";
import {
  defaults as defaultsInteraction,
  DragRotateAndZoom,
} from "ol/interaction";
import { OSM } from "ol/source";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer } from "ol/layer";
import { MapOptions } from "ol/PluggableMap";
import { reactive } from "vue";

import layers from "./layers";

export default class Map {
  map: OlMap;
  rams = reactive<{
    [county: string]: {
      main?: number;
      data?: {
        [town: string]: {
          main?: number;
          data?: { [village: string]: number };
        };
      };
    };
  }>({});
  constructor(mapEl: HTMLElement, options?: MapOptions) {
    const appView = new View({
      center: fromLonLat([120.221507, 23.000694]),
      zoom: 12,
      maxResolution: 750,
      minResolution: 0.1,
    });
    const positionFeature = new Feature();
    const geolocation = new Geolocation({
      projection: appView.getProjection(),
    });

    geolocation.setTracking(true);
    geolocation.on("error", (error) => console.log(error.message));
    geolocation.on("change:position", () => {
      let coordinates = geolocation.getPosition();
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : void 0
      );
      // appView.setCenter(coordinates);
    });
    this.map = new OlMap({
      controls: defaultControls().extend([]),
      interactions: defaultsInteraction().extend([new DragRotateAndZoom()]),
      target: mapEl,
      layers: [
        // new TileLayer({ source: new OSM(), zIndex: 1 }),
        ...Object.values(layers(this)),
      ],
      view: appView,
      ...options,
    });
  }
}
