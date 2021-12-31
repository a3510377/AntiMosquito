declare type float = number;
declare interface JsonAny {
  [x: string]:
    | null
    | string
    | number
    | boolean
    | float
    | Date
    | JsonAny
    | JsonArray;
}
declare interface JsonArray
  extends Array<
    null | string | number | boolean | Date | JsonAny | JsonArray | float
  > {}
