#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"

const char *ssid = "monkey";
const char *password = "123456789";

const int serverPort = 3500;
const int address = 10;

const String serverName = "192.168.137.1";
const String serverPath = "/api/v1/postImg";
const String getIdPath = "/api/v1/makeId";

String id;

void restart();
void writeString(char add, String data);
String sendPhoto();
String read_String(char add);

WiFiClient client;

#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27

#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

const int timerInterval = 1e3;
unsigned long previousMillis = 0;

void setup()
{
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.print("連線到 ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.print("IP 位置: ");
  Serial.println(WiFi.localIP());

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound())
  {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  }
  else
  {
    config.frame_size = FRAMESIZE_CIF;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    Serial.printf("相機初始化失敗並出現錯誤 0x%x", err);
    restart();
  }

  id = read_String(address);
  if (!id)
  {
    if (!client.connect(serverName.c_str(), serverPort))
      return restart();

    String getAll;
    String getBody;
    int timoutTimer = 1e4;
    long startTimer = millis();
    boolean state = false;

    client.println("POST " + getIdPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println();

    while ((startTimer + timoutTimer) > millis())
    {
      Serial.print(".");
      delay(100);
      while (client.available())
      {
        char c = client.read();
        if (c == '\n')
        {
          if (getAll.length() == 0)
            state = true;
          getAll = "";
        }
        else if (c != '\r')
          getAll += String(c);
        if (state)
          getBody += String(c);
        startTimer = millis();
      }
      if (getBody.length() > 0)
        break;
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }

  sendPhoto();
}

void loop()
{
  unsigned long currentMillis = millis();
  if (!(currentMillis - previousMillis >= timerInterval))
    return;
  sendPhoto();
  previousMillis = currentMillis;
}

String sendPhoto()
{
  String getAll;
  String getBody;

  camera_fb_t *fb = NULL;
  fb = esp_camera_fb_get();
  if (!fb)
  {
    Serial.println("相機拍攝失敗");
    restart();
  }

  Serial.println("連接到服務器: " + serverName);

  if (client.connect(serverName.c_str(), serverPort))
  {
    Serial.println("連接成功!");
    String head = "--RandomNerdTutorials\r\nContent-Disposition: form-data; name=\"myfile\"; filename=\"esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--RandomNerdTutorials--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;

    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=RandomNerdTutorials");
    client.println();
    client.print(head);

    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n = 0; n < fbLen; n = n + 1024)
    {
      if (n + 1024 < fbLen)
      {
        client.write(fbBuf, 1024);
        fbBuf += 1024;
      }
      else if (fbLen % 1024 > 0)
      {
        size_t remainder = fbLen % 1024;
        client.write(fbBuf, remainder);
      }
    }
    client.print(tail);

    esp_camera_fb_return(fb);

    int timoutTimer = 1e4;
    long startTimer = millis();
    boolean state = false;

    while ((startTimer + timoutTimer) > millis())
    {
      Serial.print(".");
      delay(100);
      while (client.available())
      {
        char c = client.read();
        if (c == '\n')
        {
          if (getAll.length() == 0)
            state = true;
          getAll = "";
        }
        else if (c != '\r')
          getAll += String(c);
        if (state == true)
          getBody += String(c);
        startTimer = millis();
      }
      if (getBody.length() > 0)
        break;
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }
  else
  {
    getBody = "連接到 " + serverName + " 失敗";
    Serial.println(getBody);
  }
  return getBody;
}
void writeString(char add, String data)
{
  int _size = data.length();
  int i;
  for (i = 0; i < _size; i++)
    EEPROM.write(add + i, data[i]);
  EEPROM.write(add + _size, '\0');
  EEPROM.commit();
}
String read_String(char add)
{
  int i;
  char data[100];
  int len = 0;
  unsigned char k;
  k = EEPROM.read(add);
  while (k != '\0' && len < 500)
  {
    k = EEPROM.read(add + len);
    data[len] = k;
    len++;
  }
  data[len] = '\0';
  return String(data);
}
void restart()
{
  delay(500);
  ESP.restart();
}