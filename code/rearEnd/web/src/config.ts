/**本站網址 */
export const apiUrl = "https://antimosquito.a102009102009.repl.co";

/**主流 API 版本 */
export const apiVersion = "1";

export class urls {
  /**登革熱1998年起每日確定病例統計
   * @url https://data.cdc.gov.tw/dataset/dengue-daily-determined-cases-1998
   * 每日更新
   * @data Array<\
   * 發病日: "1998/01/02"\
   * 個案研判日: "None"\
   * 通報日: "1998/01/07"\
   * 性別: "男"\
   * 年齡層: "40-44"\
   * 居住縣市: "屏東縣"\
   * 居住鄉鎮: "屏東市"\
   * 居住村里: "None"\
   * 最小統計區: "A1320-0136-00"\
   * 最小統計區中心點X: "120.505898941"\
   * 最小統計區中心點Y: "22.464206650"\
   * 一級統計區: "A1320-04-008"\
   * 二級統計區: "A1320-04"\
   * 感染縣市: "None"\
   * 感染鄉鎮: "None"\
   * 感染村里: "None"\
   * 是否境外移入: "否"\
   * 感染國家: "None"\
   * 確定病例數: "1"\
   * 居住村里代碼: "None"\
   * 感染村里代碼: "None"\
   * 血清型: "None"\
   * 內政部居住縣市代碼: "10013"\
   * 內政部居住鄉鎮代碼: "1001301"\
   * 內政部感染縣市代碼: "None"\
   * 內政部感染鄉鎮代碼: "None">
   */
  static Dengue_Daily = "https://od.cdc.gov.tw/eic/Dengue_Daily.json";

  /**登革熱近12個月每日確定病例統計
   * @url https://data.cdc.gov.tw/dataset/dengue-daily-determined-cases-latest-12m
   * 每日更新
   * @data Array<\
   *  發病日: "2020/12/04"\
   *  個案研判日: "2020/12/04"\
   *  通報日: "2020/12/04"\
   *  性別: "男"\
   *  年齡層: "40-44"\
   *  居住縣市: "高雄市"\
   *  居住鄉鎮: "前金區"\
   *  居住村里: "東金里"\
   *  最小統計區: "A6407-0031-00"\
   *  最小統計區中心點X: "120.293301923"\
   *  最小統計區中心點Y: "22.632154674"\
   *  一級統計區: "A6407-05-005"\
   *  二級統計區: "A6407-05"\
   *  感染縣市: "None"\
   *  感染鄉鎮: "None"\
   *  感染村里: "None"\
   *  是否境外移入: "是"\
   *  感染國家: "印尼"\
   *  確定病例數: "1"\
   *  居住村里代碼: "6400700-005"\
   *  感染村里代碼: "None"\
   *  血清型: "None"\
   *  內政部居住縣市代碼: "64"\
   *  內政部居住鄉鎮代碼: "6400700"\
   *  內政部感染縣市代碼: "None"\
   *  內政部感染鄉鎮代碼: "None">
   */
  static Dengue_Daily_last12m =
    "https://od.cdc.gov.tw/eic/Dengue_Daily_last12m.json";
}
