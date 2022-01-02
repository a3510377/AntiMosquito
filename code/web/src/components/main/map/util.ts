import { Feature } from "ol";
import { Style, Fill, Stroke, Text } from "ol/style";
import { Geometry } from "ol/geom";
import RenderFeature from "ol/render/Feature";
import { Options as StyleOptions } from "ol/style/Style";
import { ApiMainData } from "@/types/apiData";

export interface typeThis {
  data: ApiMainData;
  ram: {
    [county: string]: {
      main?: number;
      data?: {
        [town: string]: {
          main?: number;
          data?: {
            [village: string]: number;
          };
        };
      };
    };
  };
}

export interface cFeature extends Feature<Geometry> {
  ol_uid: string;
  mosquitos: number;
}

export function setFillColor(num: number) {
  let color = "#fff";

  if (num > 50) color = "#470115";
  else if (num > 20) color = "#6f006d";
  else if (num > 10) color = "#a4005b";
  else if (num > 5) color = "#d00b33";
  else if (num > 3) color = "#e75033";
  else if (num > 1) color = "#ffa133";
  else if (num > 0) color = "#e3d738";

  return color;
}
export function countyStyle(
  this: typeThis,
  _feature: cFeature | Feature<Geometry> | RenderFeature,
  resolution?: number,
  options?: StyleOptions
) {
  let feature = _feature as cFeature,
    mosquitos: number = 0,
    countyMain = this.ram?.[feature.get("COUNTYNAME")];

  if (countyMain === void 0 || (countyMain?.main || -1) < 0) {
    mosquitos = 0;
    let data = this.data?.[feature.get("COUNTYNAME")];
    if (typeof data === "object")
      Object.entries(data).forEach(([_, value]) =>
        Object.entries(value).forEach(([_, _value]) =>
          _value.forEach((v) => ((mosquitos as number) += v.mosquitos))
        )
      );
    (this.ram[feature.get("COUNTYNAME")] ||= { main: mosquitos }).main =
      mosquitos;
  }

  /*  */
  mosquitos =
    (this.ram[feature.get("COUNTYNAME")] ||= { main: mosquitos }).main ||
    mosquitos;

  if (resolution && resolution > 180)
    return new Style({
      stroke: new Stroke({ color: "#0000ff", width: 1 }),
      fill: new Fill({ color: setFillColor(~~(mosquitos / 100)) }),
      text: new Text({
        font: "20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
        text: `${feature.get("COUNTYNAME")}\n${mosquitos > 0 ? mosquitos : ""}`,
      }),
      ...options,
    });
  return new Style({
    stroke: new Stroke({ color: "#0000ff", width: 1 }),
    fill: new Fill({ color: "#ffffff00" }),
  });
}
export function townStyle(
  this: typeThis,
  _feature: cFeature | Feature<Geometry> | RenderFeature,
  resolution?: number,
  options?: StyleOptions
) {
  let feature = _feature as cFeature;

  if (resolution && resolution > 40 && resolution < 180) {
    let mosquitos = 0,
      townMain =
        this.ram?.[feature.get("COUNTYNAME")]?.data?.[feature.get("TOWNNAME")];

    if (townMain === void 0 || (townMain?.main || -1) < 0) {
      Object.entries(
        this.data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")] || {}
      ).forEach(([_, value]) =>
        value.forEach((v) => (mosquitos += v.mosquitos))
      );
      (((this.ram[feature.get("COUNTYNAME")] ||= {}).data ||= {})[
        feature.get("TOWNNAME")
      ] ||= {}).main = mosquitos;
    }
    /*  */
    mosquitos =
      (((this.ram[feature.get("COUNTYNAME")] ||= {}).data ||= {})[
        feature.get("TOWNNAME")
      ] ||= {}).main || mosquitos;

    return new Style({
      stroke: new Stroke({ color: "#ff0000", width: 1 }),
      fill: new Fill({
        color: setFillColor(~~(mosquitos / 50)),
      }),
      text: new Text({
        font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
        text: `${feature.get("TOWNNAME")}\n${mosquitos > 0 ? mosquitos : ""}`,
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
}
export function villageStyle(
  this: typeThis,
  _feature: cFeature | Feature<Geometry> | RenderFeature,
  resolution?: number,
  options?: StyleOptions
) {
  if (resolution && resolution > 40)
    return new Style({ fill: new Fill({ color: "#ffffff" }) });
  let feature = _feature as cFeature,
    mosquitos = 0,
    VILLNAMEMain =
      this.ram?.[feature.get("COUNTYNAME")]?.data?.[feature.get("TOWNNAME")]
        ?.data?.["VILLNAME"];

  if (VILLNAMEMain === void 0 || VILLNAMEMain < 0) {
    (
      this.data?.[feature.get("COUNTYNAME")]?.[feature.get("TOWNNAME")]?.[
        feature.get("VILLNAME")
      ] || []
    ).forEach((d) => (mosquitos += d.mosquitos));
    ((((this.ram[feature.get("COUNTYNAME")] ||= {}).data ||= {})[
      feature.get("TOWNNAME")
    ] ||= {}).data ||= {})[feature.get("VILLNAME")] = mosquitos;
  }

  mosquitos =
    ((((this.ram[feature.get("COUNTYNAME")] ||= {}).data ||= {})[
      feature.get("TOWNNAME")
    ] ||= {}).data ||= {})[feature.get("VILLNAME")] || mosquitos;

  return new Style({
    stroke: new Stroke({ color: "#000", width: 1 }),
    fill: new Fill({ color: setFillColor(~~(mosquitos / 10)) }),
    text: new Text({
      font: "14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",
      fill: new Fill({ color: "#000" }),
      text: `${feature.get("VILLNAME") || ""}\n${
        mosquitos > 0 ? mosquitos : ""
      }`,
    }),
    ...options,
  });
}
