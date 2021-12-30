#include <Wire.h>
#include "DHT.h"
#include "RTClib.h"
#include <ArduinoJson.h>
#include <APDS9930.h>

APDS9930 apds = APDS9930();
RTC_DS1307 RTC;
DHT dht(8, DHT11);

// WiFi config
String ssid = "OoO";
String password = "00000000";
String host = "antimosquito.a102009102009.repl.co";
String port = "80";
String path = "/api/v1/postData";
String ip = "118.232.71.19";
String token = "gF96agCDcgPc4k6Z.3s9unq8.nwVSdkrrN2Mdg2jqIN4o";

int threshold = 0;
int bias = 3;
int Mosquitos = 0;
float ambient_light = 0;
uint16_t ch0 = 0;
uint16_t ch1 = 1;
int num = 0;
String ideData = "", espData = "";
void sendJson(int mosquitos = 1);

void setup()
{
  digitalWrite(2, HIGH);
  Serial.begin(9600);
  Serial2.begin(9600);
  Wire.begin();
  dht.begin();
  RTC.begin();
  Serial2.println("AT+RST");

  if (!RTC.isrunning())
    RTC.adjust(DateTime(__DATE__, __TIME__));

  // APDS-9930 Init
  if (apds.init())
    Serial.println(F("APDS-9930 初始化完成"));
  else
    Serial.println(F("APDS-9930 初始化過程中出現問題！"));

  // 開啟 APDS-9930
  if (apds.enableLightSensor(false))
    Serial.println(F("傳感器正在運行"));
  else
    Serial.println(F("傳感器初始化過程中出現問題！"));

  // 等待初始化
  delay(500);

  if (!apds.readAmbientLightLux(ambient_light) || !apds.readCh0Light(ch0) || !apds.readCh1Light(ch1))
    Serial.println(F("讀取光值時出錯"));
  else
  {
    threshold = ambient_light - bias;
    // 顯示感測器數值
    Serial.print(F("Ambient: "));
    Serial.print(ambient_light);
    Serial.print(F("  threshold: "));
    Serial.print(threshold);
    Serial.print(F("  Ch0: "));
    Serial.print(ch0);
    Serial.print(F("  Ch1: "));
    Serial.println(ch1);
  }
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
    if (!apds.readAmbientLightLux(ambient_light) || !apds.readCh0Light(ch0) || !apds.readCh1Light(ch1))
      Serial.println(F("Error reading light values"));
    else
    {
      threshold = ambient_light - bias;
      // 顯示感測器數值
      Serial.print(F("Ambient: "));
      Serial.print(ambient_light);
      Serial.print(F("  threshold: "));
      Serial.print(threshold);
      Serial.print(F("  Ch0: "));
      Serial.print(ch0);
      Serial.print(F("  Ch1: "));
      Serial.println(ch1);

      // 如果偵測到發送
      if (ambient_light < threshold)
      {
        digitalWrite(2, HIGH);
        delay(100);
        digitalWrite(2, LOW);
        sendJson();
      }
    }
  }
}

void sendJson(int mosquitos = 1)
{
  Serial.println("準備發送");

  float h = dht.readHumidity();    // 讀取濕度
  float t = dht.readTemperature(); // 讀取攝氏溫度

  // make Json
  StaticJsonDocument<200> json_doc;
  char json_output[150];

  json_doc["ip"] = ip;
  json_doc["time"] = String(now.unixtime() - 3600) + "~" + String(now.unixtime());
  json_doc["humidity"] = h;
  json_doc["mosquitos"] = mosquitos;
  json_doc["temperature"] = t;

  // json to string
  serializeJson(json_doc, json_output);

  // http post
  Serial2.println("POST " + path + " HTTP/1.1");
  Serial2.println("Host: " + host);
  Serial2.println("authorization: " + token);
  Serial2.println("Content-Type: application/json");
  Serial2.println("Cache-Control: no-cache");
  Serial2.print("Content-Length: ");
  Serial2.println(strlen(json_output));
  Serial2.println("");
  Serial2.println(json_output);

  Mosquitos = 0;
}
