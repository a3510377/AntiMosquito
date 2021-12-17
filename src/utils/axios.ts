import axios from "axios";
import { config } from "dotenv";
import { xml2json } from "xml-js";

import { GeolocationAPIData } from "@/types/axios.data";
config();

/**查看IP資料
 * @param IP 須查詢的IP
 */
export const getIp = async (
  IP: string
): Promise<GeolocationAPIData | false> => {
  if (
    !/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(
      IP
    )
  )
    return false;
  let data = (
    await axios({
      url: `http://api.ipstack.com/${IP}?access_key=${process.env.ipApiToken}&format=1`,
      method: "GET",
    })
  ).data as GeolocationAPIData;
  return data?.error ? false : data;
};
export const getVillage = async (longitude: float, latitude: float) => {
  let data = (
    await axios({
      url: `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}/4326`,
      method: "GET",
    })
  ).data;
  return data?.error ? false : data;
};
