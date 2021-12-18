export interface villageData {
  time: string;
  humidity: float;
  mosquitos: float;
  temperature: float;
  location: {
    location: {
      longitude: float;
      latitude: float;
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
