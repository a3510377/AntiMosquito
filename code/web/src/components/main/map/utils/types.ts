/**server send datas type */
export interface datasType {
  ram: {
    [county: string]: {
      main?: number;
      data?: {
        [town: string]: { main?: number; data?: { [village: string]: number } };
      };
    };
  };
  count: {
    type: string;
    mosquitos: number;
    area: {
      county: string;
      town: string;
      village: string;
    };
  };
}

/**server send data type */
export interface dataType<K extends keyof datasType> {
  type: K;
  data: datasType[K];
}

export type keysType = keyof datasType;

export type dataTypes = dataType<keysType>;
