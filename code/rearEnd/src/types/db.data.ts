import { GeolocationAPIData } from "./axios.data";

export interface catchData {
  api: {
    checks: {
      [IP: string]: {
        token: string;
        timeOut: NodeJS.Timeout;
        ipData: GeolocationAPIData;
      };
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
/**db 站點模型 */
export interface siteInfo {
  Token: string;
  ID: string;
}

export interface Location {
  location: {
    /**緯度 */
    latitude?: float;
    /**經度 */
    longitude?: float;
  };
  area: {
    /**縣 */
    county: string;
    /**區 */
    town: string;
    /**里 */
    village: string;
  };
}

export interface dataMosquitos {
  /**時間( timestamp1~timestamp2 ) */
  time: string;
  /**濕度( % ) */
  humidity: number;
  /**蚊子數量 */
  mosquitos: number;
  /**溫度( 度 ) */
  temperature: number;
}
export interface dbDataMosquitos extends dataMosquitos {
  /**位置資料 */
  location: Location;
}
