void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int a = 2;
  while(true){
    if(a%2 == 0){
      Serial.println(12345);
      a += 1;
      delay(100);      
    }  
    else{
    Serial.println(67890);
    a -= 1;
    delay(100); 
   }
 }
}
