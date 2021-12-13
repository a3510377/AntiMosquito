# AntiMosquito 後端 + 前端 伺服器

IDEA:

> client 向 server 發送 token ( 含安全金鑰及 ID )
> token 格式:
> ${id.toString()}.${randomStr(4)}.${randomStr(20)}
> ODYzNjc2ODQ3NzMxMzc2MTcw.AWAa.XaFWA54Fkp-FkaUOKjav

#### mongodb 數據庫模型示例

`_id` 由 `MongoDB` 自動生成

```
// use MongoDB
Mosquitos
  +---站點1 (外來鍵: data->siteInfo->_id)
    |---_id
    |---Time( 時間 ( t1 ~ t2) )
    |---humidity( 濕度 )
    |---Mosquitos( 蚊子數量 )
    |---Temperature( 溫度 )
  =-copy-=
data
  +---siteInfo
    |---_id
    |---Location( 站點位置 )
    |---Token
    |---ID
  =-else-=
```

#### 設定

1.  請創建一個 `mongodb` 資料庫
2.  請複製 `.env.example` 檔案，並將檔案名換成 `.env`，並將設定內容進行填寫
3.  安裝 [node.js](https://nodejs.org/en/)
4.  windows 中，請於 cmd 執行

```cmd
npm i -g yarn
yarn
yarn add @types/express @types/http-errors @types/morgan @types/shelljs
yarn start
```

#### docs

```
id -> {
  42 to 4: time,
  1 to 4: 隨機數
}
```

- 創建帳號
  - `/api/v1/setup?ip=X.X.X.X`
    - `method`: `GET`
    - 回傳: $CREATE_TOKEN
  - `/api/v1/check?ip=X.X.X.X&token=$CREATE_TOKEN`
    - `method`: `GET`
    - 回傳: `{ _id: # userID, Location: {}, Ip: "X.X.X.X", Token: $TOKEN # 以後需使用到的 token }`
- post data
  - `/api/v1/postData`
    - `method`: `POST`
    - `headers`: `{ Authorization: $TOKEN }`
    - `data`: `[ { Time: ..., humidity: ..., Mosquitos: ..., Temperature: ..., } ]`
    - 回傳: 存取的資料
