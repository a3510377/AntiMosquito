import axios from "axios";
import { GeolocationAPIData } from "@/types/axios.data";

/**查看IP資料
 * @param IP 須查詢的IP
 */
export const getIp = async (
  IP: string
): Promise<GeolocationAPIData | boolean> => {
  if (
    !/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(
      IP
    )
  )
    return false;
  return (
    await axios({
      url: `https://api.ipgeolocation.io/ipgeo?ip=${IP}`,
      method: "GET",
    })
  ).data() as GeolocationAPIData;
};
