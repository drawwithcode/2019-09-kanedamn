function preload() {
}

function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  setShakeThreshold(10);
  frameRate(12);

  leftEye = new Eye(width/2 - 100, height/2 - 30, 80);
  rightEye = new Eye(width/2 + 100, height/2 - 30, 80);

}

function draw() {
  clear();
  background("black");

  leftEye.display();
  rightEye.display();

//create a cursor when the screen is touched
  for(var i = 0; i < touches.length; i++){
  fill(150, 100);
  ellipse(touches[i].x, touches[i].y, 30);
}

  //if the eyes aren't touched, he's happy
  if (leftEye.touched == false && rightEye.touched == false) {
    noFill();
    stroke("white");
    strokeWeight(10);
    beginShape();
    vertex(width/2 - 20, height/2);
    vertex(width/2, height/2 + 20);
    vertex(width/2 + 20, height/2);
    endShape();
  }
  //if his head is petted, he's happy
  else if(leftEye.touched == true && rightEye.touched == true){
    noFill();
    stroke("white");
    strokeWeight(10);
    beginShape();
    vertex(width/2 - 20, height/2);
    vertex(width/2, height/2 + 20);
    vertex(width/2 + 20, height/2);
    endShape();
  }
  //if one eye is touched, he's sad
  else if (leftEye.touched == true || rightEye.touched == true) {
    noFill();
    stroke("white");
    strokeWeight(10);
    beginShape();
    vertex(width/2 - 20, height/2);
    vertex(width/2, height/2 - 20);
    vertex(width/2 + 20, height/2);
    endShape();
  }
  //if the device is shaken, he's scared
  if(leftEye.shaken == true && rightEye.shaken == true){
    fill("black");
    stroke("white");
    strokeWeight(10);
    rectMode(CENTER);
    rect(width/2, height/2 + 10, 70, 45, 20);
  }

  textSize(20);
  noStroke();
  textAlign(CENTER,CENTER);
  textFont("Dosis");
  fill("white");
  text("Bother your phone!", width/2, height/2 + 200);

  textSize(15);
  noStroke();
  textAlign(CENTER,CENTER);
  textFont("Dosis");
  fill("white");
  text("stick a finger in its eyes, pet it, or shake it", width/2, height/2 + 230);

}

function touchStarted(){
  for(var i = 0; i < touches.length; i++){
    //when the cursor touches left eye, it closes
    var d1 = dist(touches[i].x, touches[i].y, leftEye.x, leftEye.y);
    if(d1 < leftEye.size/2){
      leftEye.touched = true;
    }
    //when the cursor touches right eye, it closes
    var d2 = dist(touches[i].x, touches[i].y, rightEye.x, rightEye.y);
    if(d2 < rightEye.size/2){
      rightEye.touched = true;
    }
    //when the cursor touches his head, both the eyes close
    if(touches[i].y < height/2 - 80){
      leftEye.touched = true;
      rightEye.touched = true;
    }
  }
}

//return eye.touched state to false once the cursor stops touching them
function touchEnded(){
  leftEye.touched = false;
  rightEye.touched = false;
}

var value = 0;

function deviceShaken(){

  value++
  if (value < 25) {
    leftEye.shaken = true;
    rightEye.shaken = true;
  }
  //if value is between 25 and 50, shaken is activated
  if (value > 50){
    leftEye.shaken = false;
    rightEye.shaken = false;
  }
  //if value is between 50 and 100, shaken is deactivated
  //if value is above 100, value returns to 0
  if (value > 100) {
    value = 0;
  }
}

function touchMoved(){
  return false;
}

//create eye object
function Eye(_x, _y, _size) {
  this.x = _x;
  this.y = _y;
  this.size = _size;
  this.color = "white";
  this.touched = false;
  this.shaken = false;

  this.display = function() {
    //when the eyes aren't touched they're white circles
    if (this.touched == false) {
      noStroke();
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
    //when the eyes are touched they're white rectangles
    else if (this.touched == true) {
      noStroke();
      fill(this.color);
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size / 6);
    }
    //when the device is shaken the eyes become black
    if (this.shaken == true){
      stroke(this.color);
      strokeWeight(10);
      fill(0);
      ellipse(this.x, this.y, this.size);
    }

  }

}
