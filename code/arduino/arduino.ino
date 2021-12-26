#include "nodemcuv2.h"
#include <WiFi.h>
#include <FS.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char *ssid = "";
const char *password = "";

unsigned long lastTime = 0;
unsigned long timerDelay = 1e3 * 20;

// AsyncWebServer server(80);
String serverPath = "https://AntiMosquito.a102009102009.repl.co";
void wifiApInit();

void setup()
{
    SPIFFS.begin();
    Serial.begin(9600);
    //    pinMode(D2, INPUT);

    WiFi.begin("", "");
    Serial.println("連結");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);

        Serial.println(WiFi.localIP());
        Serial.println("連結完成");
    }
}
void loop()
{
}

void asyncGet()
{
    if ((millis() - lastTime) > timerDelay)
    {
        if (WiFi.status() == WL_CONNECTED)
        {
            WiFiClient client;
            HTTPClient http;

            http.begin(client, serverPath.c_str());
            int httpResponseCode = http.GET();
            if (httpResponseCode > 0)
            {
                Serial.print("HTTP Response code: ");
                Serial.println(httpResponseCode);
                String payload = http.getString();
                Serial.println(payload);
            }
            else
            {
                Serial.print("Error code: ");
                Serial.println(httpResponseCode);
            }
            // Free resources
            http.end();
        }
        else
            Serial.println("網路錯誤");
        lastTime = millis();
    }
}
//
// WiFi.mode(WIFI_STA_AP);
// void wifiApInit()
// {
// WiFi.softAPConfig(IP, IP, IPAddress(255, 255, 255, 0));
// WiFi.softAP(AP_ssid);
// }