#include <Wire.h>
#include <DHT.h>
#include <RTClib.h>
#include <ArduinoJson.h>
#include <APDS9930.h>

// APDS9930 defined
#define DUMP_REGS
APDS9930 apds = APDS9930();
float ambient_light = 0;
uint16_t ch0 = 0;
uint16_t ch1 = 1;

// WiFi defined
String ssid = "monkeyTest";
String password = "123456789";
String host = "192.168.137.1";
String port = "3000";
String path = "/api/v1/nowData";
String ip = "163.26.155.19";
String token = "ppml5Juie2o8dLTm.1k1kk0g.YNrYQHHXirtl8CK1qIOD";

int threshold = 0;
int bias = 3;

int num = 0;
String ideData = "", espData = "";

RTC_DS1307 RTC;

// DHT defined
DHT dht(8, DHT11);

void setup()
{
    // Uart init
    Serial.begin(115200);
    Serial2.begin(115200);

    // LED Init
    pinMode(2, OUTPUT);

    // RTC Init
    Wire.begin();
    RTC.begin();
    if (!RTC.isrunning())
    {
        Serial.println("RTC is NOT running!");
        // following line sets the RTC to the date & time this sketch was compiled
        RTC.adjust(DateTime(__DATE__, __TIME__));
    }

    // APDS-9930 Init
    if (apds.init())
        Serial.println(F("APDS-9930 initialization complete"));
    else
        Serial.println(F("Something went wrong during APDS-9930 init!"));

    // Start running the APDS-9930 light sensor (no interrupts)
    if (apds.enableLightSensor(false))
        Serial.println(F("Light sensor is now running"));
    else
        Serial.println(F("Something went wrong during light sensor init!"));

#ifdef DUMP_REGS
    /* Register dump */
    uint8_t reg;
    uint8_t val;

    for (reg = 0x00; reg <= 0x19; reg++)
    {
        if ((reg != 0x10) && (reg != 0x11))
        {
            apds.wireReadDataByte(reg, val);
            Serial.print(reg, HEX);
            Serial.print(": 0x");
            Serial.println(val, HEX);
        }
    }
    apds.wireReadDataByte(0x1E, val);
    Serial.print(0x1E, HEX);
    Serial.print(": 0x");
    Serial.println(val, HEX);
#endif

    // Wait for initialization and calibration to finish
    delay(500);

    if (!apds.readAmbientLightLux(ambient_light) || !apds.readCh0Light(ch0) || !apds.readCh1Light(ch1))
        Serial.println(F("Error reading light values"));
    else
    {
        threshold = ambient_light - bias;
        // 顯示感測器數值
        Serial.print(F("Ambient: "));
        Serial.print(ambient_light);
        Serial.print("  threshold: ");
        Serial.print(threshold);
        Serial.print(F("  Ch0: "));
        Serial.print(ch0);
        Serial.print(F("  Ch1: "));
        Serial.println(ch1);
    }
    // 啟動 DHT
    dht.begin();

    digitalWrite(2, HIGH);

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
        if (!apds.readAmbientLightLux(ambient_light) || !apds.readCh0Light(ch0) || !apds.readCh1Light(ch1))
            Serial.println(F("Error reading light values"));
        else
        {
            threshold = ambient_light - bias;
            // 顯示感測器數值
            Serial.print(F("Ambient: "));
            Serial.print(ambient_light);
            Serial.print("  threshold: ");
            Serial.print(threshold);
            Serial.print(F("  Ch0: "));
            Serial.print(ch0);
            Serial.print(F("  Ch1: "));
            Serial.println(ch1);
            Serial.println(ambient_light, threshold);
            delay(100);
            if (ambient_light < threshold)
            {
                digitalWrite(2, HIGH);
                delay(100);
                digitalWrite(2, LOW);

                Serial.println("準備發送");

                float h = dht.readHumidity();    //讀取濕度
                float t = dht.readTemperature(); //讀取攝氏溫度

                Serial2.println("GET " + path + " HTTP/1.1");
                Serial2.print("Host: " + host + "?ip=" + ip + "&humidity=");
                Serial2.print(h);
                Serial2.print("&mosquitos=1" + "&temperature=");
                Serial2.println(t);
                Serial2.println("authorization: " + token);
                Serial2.println("Content-Type: application/json");
                Serial2.println("");
            }
        }
    }
}