export interface userType {
  id: string;
  name?: string;
  description?: string;
  location: { /**緯度 */ latitude?: number; /**經度 */ longitude?: number };
  area: {
    /**縣 */
    county?: string;
    /**區 */
    town?: string;
    /**里 */
    village?: string;
  };
}

export interface villageData {
  _id: string;
  time: string;
  humidity: number;
  mosquitos: number;
  temperature: number;
  location: {
    location: {
      longitude: number;
      latitude: number;
    };
    area: {
      county: string;
      town: string;
      village: string;
    };
  };
}

export interface ApiMainData {
  [county: string]: {
    [town: string]: {
      [village: string]: villageData[];
    };
  };
}
export interface ApiAgeCountyGender061 {
  發病日: string;
  個案研判日: string;
  通報日: string;
  性別: "F" | "M";
  年齡層: string;
  最小統計區中心點X: string;
  最小統計區中心點Y: string;
  是否境外移入: string;
  感染國家: string;
  確定病例數: string;
  血清型: string;
  [key: string]: string;
}
