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
