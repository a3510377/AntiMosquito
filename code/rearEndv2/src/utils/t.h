#include <EEPROM.h>

void writeString(char add, String data);
String read_String(char add);
int address = 10;

void setup()
{
    Serial.begin(9600);
    EEPROM.begin(512);
    String data = "164845101108610";

    writeString(10, data);
    delay(10);
}

void loop()
{
    String recivedData;
    recivedData = read_String(10);
    Serial.print("Read Data:");
    Serial.println(recivedData);
    delay(1000);
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