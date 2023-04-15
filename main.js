music = "";
scoreLeftWrist = 0; 
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
music = loadSound("music1.mp3");
}
function setup(){
canvas = createCanvas(600,500);
canvas.center();

 video = createCapture(VIDEO);
video.hide();
  posenet = ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotPoses)
}

function modelLoaded(){
console.log("Congratulations!!! your posenet model is intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist result = "+ scoreLeftWrist)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist X = " + leftWristX + " left wrist Y = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightWristX + " right wrist Y = " + rightWristY)
    }
}
function draw(){
image(video, 0, 0, 600, 500);
fill("red");
stroke("red");
if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,18);
NumleftY = Number(leftWristY);
removeDecimals = floor(NumleftY);
 volume = removeDecimals/500;
 document.getElementById("volume").innerHTML = "volume is: " + volume;
 music.setVolume(volume);
}
if(scoreRightWrist > 0.2){
    fill("red");
stroke("red");
    circle(rightWristX,rightWristY,18);
    if(rightWristY > 0 && rightWristY <= 100){
       document.getElementById("speed").innerHTML="speed is: 0.5x";
       music.rate(0.5);
    }
    if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML="speed is: 1x";
        music.rate(1);
     } 
     if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML="speed is: 1.5x";
        music.rate(1.5);
     } 
     if(rightWristY > 300 && rightWristY <=400){
        document.getElementById("speed").innerHTML="speed is: 2x";
        music.rate(2);
     } 
     if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML="speed is: 2.5x";
        music.rate(2.5);
     }
}
}
function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}
function yo(){
music.pause();
}
function yay(){
    music.stop();
    music.play();
}