#include <Adafruit_NeoPixel.h>


#define PIN            2

#define NUMPIXELS      8

int inByte = 0;         // incoming serial byte

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);


void setup() {
  Serial.begin(9600);
  Serial.setTimeout(20);

  pixels.begin();
}

void loop() {
  if (Serial.available() > 0) {
    byte buffer[8];
    Serial.readBytes(buffer, 8);
    
    for ( int i = 0; i < 8; i++) {
      pixels.setPixelColor(7 - i, pixels.Color(0, 0, buffer[i]));
    }

    pixels.show();
  }

}
