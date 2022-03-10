#include <Arduino.h>
#include <WiFi.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"

const char *ssid = "REPLACE_WITH_YOUR_SSID";
const char *password = "REPLACE_WITH_YOUR_PASSWORD";

String serverName = "192.168.1.XXX";

String serverPath = "/upload";

const int serverPort = 80;

WiFiClient client;

void setup()
{
    Serial.begin(115200);
    WIFI.mode(WIFI_STA);
}

void loop()
{
}