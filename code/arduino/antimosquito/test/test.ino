#include <Wire.h>
#include <DHT.h>
#include <RTClib.h>
#include <ArduinoJson.h>
#include <APDS9930.h>

String ssid = "monkeyTest";
String password = "123456789";
String host = "192.168.137.1";
String port = "3000";
String path = "/api/v1/nowData";
String ip = "192.168.137.1";
String token = "ppml5Juie2o8dLTm.1k1kk0g.YNrYQHHXirtl8CK1qIOD";

int num = 0;
String espData = "";

void setup()
{
    Serial.begin(115200);
    Serial2.begin(115200);

    // 重製esp8266
    Serial2.println("AT+RST");
}

void loop()
{
    if (Serial2.available())
    {
        espData = Serial2.readString();
        Serial.println(espData);
        if (espData.indexOf("OK") > -1)
        {
            switch (num)
            {
            case 0:
                // 網卡模式
                Serial2.println("AT+CWMODE=1");
                num++;
                break;
            case 1:
                // 掃描熱點
                Serial2.println("AT+CWLAP");
                num++;
                break;
            case 2:
                // 連線到熱點
                Serial2.println("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"");
                num++;
                break;
            case 3:
                // 查詢目前IP
                Serial2.println("AT+CIFSR");
                num++;
                break;
            case 4:
                Serial.println("初始化完成");
                Serial2.println("AT+CIPSTART=\"TCP\",\"" + host + "\"," + port);
                num++;
                break;
            case 5:
                Serial2.println("AT+CIPMODE=1");
                num++;
                break;
            case 6:
                Serial2.println("AT+CIPSEND");
                num++;
                break;
            case 7:
                Serial.println("連線完成");
                digitalWrite(2, LOW);
                num++;
                break;
            }
        }
        espData = "";
    }
    if (num == 8)
    {
        // http post
        String data = "{\"a\": \"awa\"}";
        Serial2.println("POST " + path + " HTTP/1.1");
        Serial2.println("Host: " + host);
        Serial2.println("authorization: " + token);
        Serial2.println("Content-Type: application/json");
        Serial2.println("Cache-Control: no-cache");
        Serial2.print("Content-Length: ");
        Serial2.println(12);
        Serial2.println(data);
        Serial2.println("");
    }
}
