import { ApiMainData } from "@/types/apiData";

/**server send datas type */
export interface datasType {
  ram: {
    [county: string]: {
      main?: number;
      data?: {
        [town: string]: {
          main?: number;
          data?: { [village: string]: number };
        };
      };
    };
  };
  count: { [key: `${string}.${string}.${string}`]: number };
}

/**server send data type */
export interface dataType<K extends keyof datasType> {
  type: K;
  data: datasType[K];
}

export type keysType = keyof datasType;

export type dataTypes = dataType<keysType>;
