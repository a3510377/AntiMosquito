/**db 主要 types */
export interface mainReturn {
  _id: number;
}

/**db 站點模型 */
export interface siteInfo extends mainReturn {
  Location: string;
  Token: string;
  ID: string;
}
