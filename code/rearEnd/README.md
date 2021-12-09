# AntiMosquito 後端 + 前端 伺服器

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
