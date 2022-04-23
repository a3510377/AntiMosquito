import { Map, View, Geolocation, Feature } from "ol";
import { defaults as defaultControls } from "ol/control";
import {
  defaults as defaultsInteraction,
  DragRotateAndZoom,
} from "ol/interaction";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";

import axios from "axios";

export default (mapEl: HTMLElement | undefined) => {
  const appView = new View({
    center: fromLonLat([120.221507, 23.000694]),
    zoom: 12,
    maxResolution: 750,
    minResolution: 0.1,
  });
  const positionFeature = new Feature();
  const geolocation = new Geolocation({ projection: appView.getProjection() });

  geolocation.setTracking(true);
  geolocation.on("error", (error) => console.log(error.message));
  geolocation.on("change:position", () => {
    let coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : void 0);
    // appView.setCenter(coordinates);
  });
  const map = new Map({
    controls: defaultControls().extend([]),
    interactions: defaultsInteraction().extend([new DragRotateAndZoom()]),
    target: mapEl,
    layers: [new TileLayer({ source: new OSM(), zIndex: 0 })],
    view: appView,
  });
};
