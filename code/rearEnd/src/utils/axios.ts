import axios from "axios";
import { GeolocationAPIData } from "@/types/axios.data";
import { config } from "dotenv";
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
  return (
    await axios({
      url: `http://api.ipstack.com/${IP}?access_key=${process.env.ipApiToken}&format=1`,
      method: "GET",
    })
  ).data as GeolocationAPIData;
};
