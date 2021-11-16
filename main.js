Song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
rem_decimal = 0;
volume = 0;
lscore = 0;

function preload() {

Song = loadSound("music.mp3")

}

function setup() {

Canvas = createCanvas(600,500);
Canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotposes);

}
function modelloaded() {

console.log("success posenet");

}
function gotposes(results) {

if( results.length > 0) 
{
  console.log(results);
  leftwristx = results[0].pose.leftWrist.x;
  leftwristy = results[0].pose.leftWrist.y;
  rightwristx = results[0].pose.rightWrist.x;
  rightwristy = results[0].pose.rightWrist.y;
  lscore = results[0].pose.keypoints[9].score;
  
} 



}
function draw() {

image(video,0,0,600,500);
fill('red');
stroke('red');
circle(leftwristx-60,leftwristy,20)
if (lscore > 0.2) {
  circle(leftwristx-60,leftwristy,20)
  leftwristy = Number(leftwristy)
  rem_decimal = floor(leftwristy)
  volume = leftwristy/500;
  document.getElementById("the").innerHTML = "Volume" + volume;
  Song.setVolume(volume)  
}
if (rightwristy>0 && rightwristy <= 100) { 
document.getElementById("the2").innerHTML = "Speed = 0.5x";
Song.rate(0.5);
}
if (rightwristy>100 && rightwristy <= 200) { 
document.getElementById("the2").innerHTML = "Speed = 1x";
Song.rate(1);
}
if (rightwristy>200 && rightwristy <= 300) { 
document.getElementById("the2").innerHTML = "Speed = 1.5x";
Song.rate(1.5);
}
if (rightwristy>300 && rightwristy <= 400) { 
document.getElementById("the2").innerHTML = "Speed = 2x";
Song.rate(2);
}
if (rightwristy>400 && rightwristy <= 500) { 
document.getElementById("the2").innerHTML = "Speed = 2.5x";
Song.rate(2.5);
}
}
function play() {
Song.play();


}
