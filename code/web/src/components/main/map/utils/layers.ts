import { hospitalSvg } from "@/assets/svgs/svgs";
import { TopoJSON, GeoJSON } from "ol/format";
import { Geometry } from "ol/geom";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { Style, Fill, Stroke, Icon, Circle } from "ol/style";
import Map from "./map";
import { countyStyle, setShow, townStyle, villageStyle } from "./style";
const webURL = import.meta.env.BASE_URL;

export default (
  _: Map
): { [key: string]: layerVector<sourceVector<Geometry>> } => ({
  /** */
  setShow: new layerVector({
    zIndex: 0,
    source: new sourceVector({
      url: `${webURL}data/topo/town/city.topo.json`,
      format: new TopoJSON(),
    }),
    style: setShow.bind(null, _),
  }),
  /**里 */
  village: new layerVector({
    className: "village",
    source: new sourceVector({
      url: `${webURL}data/topo/village/20210324.json`,
      format: new TopoJSON(),
    }),
    style: villageStyle.bind(null, _),
    zIndex: 50,
  }),
  /**鄉鎮 */
  town: new layerVector({
    className: "town",
    source: new sourceVector({
      url: `${webURL}data/topo/town/city.topo.json`,
      format: new TopoJSON(),
    }),
    style: townStyle.bind(null, _),
    zIndex: 100,
  }),
  /**縣市 */
  county: new layerVector({
    className: "county",
    source: new sourceVector({
      url: `${webURL}data/topo/county/20200820.json`,
      format: new TopoJSON(),
    }),
    style: countyStyle.bind(null, _),
    zIndex: 150,
  }),
  /**快篩試劑配置醫療院所 @url https://data.cdc.gov.tw/dataset/dengue-ns1 */
  NS1Test: new layerVector({
    className: "NS1Test",
    source: new sourceVector({
      url: `${webURL}data/ns1hosp_20160603.json`,
      format: new GeoJSON(),
    }),
    style: new Style({
      image: new Icon({
        src: `data:image/svg+xml;utf8,${hospitalSvg}`,
        opacity: 1,
        scale: 1,
      }),
    }),
    zIndex: 200,
  }),
  /**定位點 */
  locationPoint: new layerVector({
    source: new sourceVector({ features: [] }),
    style: new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: "#3399CC" }),
        stroke: new Stroke({ color: "#fff", width: 2 }),
      }),
    }),
    zIndex: 250,
  }),
});
