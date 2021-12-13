import { GeolocationAPIData } from "./axios.data";

export interface catchData {
  api: {
    checks: {
      [IP: string]: {
        timeOut: NodeJS.Timeout;
        token: string;
        ipData: GeolocationAPIData;
      };
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
/**db 主要 types */
export interface mainReturn {
  _id: number;
}

/**db 站點模型 */
export interface siteInfo extends mainReturn {
  Location: string;
  Token: string;
  ID: string;
}

export interface dataMosquitos {
  Time: string; // 時間( timestamp1~timestamp2 )
  humidity: number; // 濕度( % )
  Mosquitos: number; // 蚊子數量
  Temperature: number; // 溫度( 度 )
}

// let ex: dataMosquitos[] = [
//   {
//     Time: "1639398628645~1639398637309",
//     humidity: 70,
//     Mosquitos: 1,
//     Temperature: 31.1,
//   },
// ];
