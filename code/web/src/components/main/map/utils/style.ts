import { Options } from "ol/layer/BaseVector";
import VectorSource from "ol/source/Vector";
import Geometry from "ol/geom/Geometry";
import { Fill, Stroke, Style, Text } from "ol/style";
import RenderFeature from "ol/render/Feature";
import { Feature } from "ol";

import Map from "./map";

export type stylesType = Options<VectorSource<Geometry>>["style"];
export type stylesFuncType = (
  arg0: RenderFeature | Feature<Geometry>,
  arg1: number
) => void | Style | Style[];
export type layersStyleFuncType = (
  arg: Map,
  arg0: RenderFeature | Feature<Geometry>,
  arg1: number
) => void | Style | Style[];

export const setFontColor = (color: string) =>
  ({
    "#fff": "#000",
    "#470115": "#fff",
    "#6f006d": "#fff",
    "#a4005b": "#fff",
    "#d00b33": "#fff",
    "#e75033": "#fff",
    "#ffa133": "#fff",
    "#e3d738": "#fff",
  }[color] || color);

export const setFillColor = (num: number) => {
  let color = "#fff";

  if (num > 50) color = "#470115";
  else if (num > 20) color = "#6f006d";
  else if (num > 10) color = "#a4005b";
  else if (num > 5) color = "#d00b33";
  else if (num > 3) color = "#e75033";
  else if (num > 1) color = "#ffa133";
  else if (num > 0) color = "#e3d738";

  return color;
};

export const showLayer = (
  _: Map,
  className: "village" | "town" | "county" | "NS1Test",
  start?: boolean
) =>
  _.map
    .getLayers()
    .getArray()
    .find((_) => _.getClassName() === className)
    ?.setVisible(!!start);

/**里 */
export const villageStyle: layersStyleFuncType = (_, feature, resolution) => {
  let mosquitos: number =
    _.rams[feature.get("COUNTYNAME")]?.data?.[feature.get("TOWNNAME")]?.data?.[
      feature.get("VILLNAME")
    ] || 0;

  let fillColor = setFillColor(~~(mosquitos / 10));
  return new Style({
    stroke: new Stroke({ color: "#000", width: 1 }),
    fill: new Fill({ color: fillColor }),
    text: new Text({
      font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
      fill: new Fill({ color: setFontColor(fillColor) }),
      text: `${feature.get("VILLNAME") || ""}\n${
        mosquitos > 0 ? mosquitos : ""
      }`,
    }),
  });
};
/**鄉鎮 */
export const townStyle: layersStyleFuncType = (_, feature, resolution) => {
  let mosquitos: number =
    _.rams[feature.get("COUNTYNAME")]?.data?.[feature.get("TOWNNAME")]?.main ||
    0;

  let fillColor = setFillColor(~~(mosquitos / 50));

  if (resolution > 40 && resolution < 180)
    return new Style({
      stroke: new Stroke({ color: "#ff0000", width: 1 }),
      fill: new Fill({ color: fillColor }),
      text: new Text({
        font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
        fill: new Fill({ color: setFontColor(fillColor) }),
        text: `${feature.get("TOWNNAME")}\n${mosquitos > 0 ? mosquitos : ""}`,
      }),
    });

  if (resolution <= 180)
    return new Style({ stroke: new Stroke({ color: "#ff0000", width: 1 }) });

  return new Style({
    fill: new Fill({ color: "#fff" }),
    stroke: new Stroke({ color: "#ff00004a", width: 1 }),
  });
};
/**縣市 */
export const countyStyle: layersStyleFuncType = (_, feature, resolution) => {
  let mosquitos: number = _.rams[feature.get("COUNTYNAME")]?.main || 0;
  let fillColor = setFillColor(~~(mosquitos / 50));
  if (resolution >= 180)
    return new Style({
      stroke: new Stroke({ color: "#0000ff", width: 1 }),
      fill: new Fill({ color: fillColor }),
      text: new Text({
        font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
        fill: new Fill({ color: setFontColor(fillColor) }),
        text: `${feature.get("COUNTYNAME")}\n${mosquitos > 0 ? mosquitos : ""}`,
      }),
    });
};
export const setShow: layersStyleFuncType = (_, _$, resolution) => {
  if (_.showToggle) return;
  /* 縣市 */
  if (resolution >= 180) showLayer(_, "county", true);
  else showLayer(_, "county", false);
  /* 區 */
  if (resolution < 180) showLayer(_, "town", true);
  else showLayer(_, "town", false);
  /* 里 */
  if (resolution < 40) showLayer(_, "village", true);
  else showLayer(_, "village", false);

  return new Style({ fill: new Fill({ color: "#0000" }) });
};
