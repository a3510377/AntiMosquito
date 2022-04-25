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
import { datasType } from "./types";
import { baseControl, baseControlDiv } from "./controls";
import { toggleFullScreen } from "@/util/utils";
import {
  enlargeSvg,
  mosquitoSvg,
  positionSvg,
  screeningHospitalSvg,
} from "@/assets/svgs/svgs";
import { showLayer } from "./style";

export default class Map {
  map: OlMap;
  geolocation: Geolocation;
  showToggle: boolean = false;
  rams = reactive<datasType["ram"]>({});
  constructor(public mapEl: HTMLElement, options?: MapOptions) {
    let firstPosDone = false;

    const appView = new View({
      center: fromLonLat([120.32205, 23.04825]),
      zoom: 6.5,
      maxResolution: 750,
      minResolution: 0.1,
    });
    const positionFeature = new Feature();
    const geolocation = (this.geolocation = new Geolocation({
      projection: appView.getProjection(),
    }));

    geolocation.setTracking(true);
    geolocation.on("error", (error) => console.log(error.message));
    geolocation.on("change:position", () => {
      let coordinates = geolocation.getPosition();
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : void 0
      );
      if (!firstPosDone) {
        appView.setCenter(coordinates);
        firstPosDone = true;
      }
    });
    this.map = new OlMap({
      controls: defaultControls().extend([]),
      interactions: defaultsInteraction().extend([new DragRotateAndZoom()]),
      target: mapEl,
      layers: [
        new TileLayer({ source: new OSM(), zIndex: 1 }),
        ...Object.values(layers(this)),
      ],
      view: appView,
      ...options,
    });

    new baseControlDiv({
      target: mapEl,
      classList: ["split", "nTop"],
      control: [
        new baseControl(
          {
            target: mapEl,
            text: positionSvg,
            title: "定位到我",
            show: !!this.geolocation.getPosition(),
          },
          () => {
            this.map.getView().setZoom(6.5);
            this.map.getView().animate({
              center: this.geolocation.getPosition(),
              duration: 1,
            });
          }
        ),
        new baseControl(
          {
            title: "放大",
            text: enlargeSvg,
            target: this.mapEl,
          },
          () =>
            toggleFullScreen(this.mapEl)
              ? this.mapEl.classList.add("full")
              : this.mapEl.classList.remove("full")
        ),
      ],
    });
    new baseControlDiv({
      target: mapEl,
      classList: ["split"],
      control: [
        new baseControl(
          {
            target: mapEl,
            text: mosquitoSvg,
            title: "蚊子數量",
          },
          () => {
            this.showToggle = this.mapEl.classList.toggle("off");
            ["village", "town", "county"].forEach((_) =>
              showLayer(
                this,
                <"village" | "town" | "county">_,
                !this.showToggle
              )
            );
          }
        ),
        new baseControl(
          {
            target: mapEl,
            text: screeningHospitalSvg,
            title: "快篩院所",
          },
          () =>
            showLayer(
              this,
              "NS1Test",
              !this.mapEl.classList.toggle("offNS1Test")
            )
        ),
      ],
    });
  }
}
