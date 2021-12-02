img="";
status_object="";
objects=[];
function preload(){
img=loadImage("fruit.jpg");
}

function setup(){
canvas=createCanvas(640,320);
canvas.center();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting object";
}

function modelLoaded(){
    console.log("model loaded!");
    status_object=true;
    objectDetector.detect(img,gotresults);
}

function gotresults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}

function draw(){
image(img,0,0,640,320);
if(status_object!=""){
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:object detected";
        fill("black");
        percent=floor(objects[0].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("black");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}

}
