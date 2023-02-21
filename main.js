img = "";
sound = "";
status = "";
objects = [];

function preload(){
    img = loadImage("livingroom.jpeg");
    sound = loadSound("Alarm.mp3");

}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    object_detection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Baby not detected";
    //sound.play();
}

function modelLoaded(){
    console.log("Model has loaded successfully");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status != ""){
        object_detection.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            if(objects.label == "person"){
                document.getElementById("status").innerHTML = "Status: Baby detected";
                sound.stop();
            }else{
                document.getElementById("status").innerHTML = "Status: Baby not detected";
                sound.play();
            }
        }
        if(objects.length<=0){
            document.getElementById("status").innerHTML = "Status: Baby not detected";
                sound.play();
        }
      }
    }