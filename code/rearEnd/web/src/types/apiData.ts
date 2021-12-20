export interface villageData {
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
