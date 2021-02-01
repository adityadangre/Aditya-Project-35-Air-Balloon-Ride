var balloon,balloon_ani;
var bg,bg_img;
var database;
var position;

function preload(){
  balloon_ani=loadAnimation("img/1.png","img/2.png","img/3.png");
  bg_img=loadImage("img/4.png");
}

function setup() {
  createCanvas(1000,600);

  database=firebase.database();

  balloon=createSprite(80, 450, 50, 50);
  balloon.addAnimation("balloonn",balloon_ani);

  var pos=database.ref('balloon/position');
  pos.on("value",readPosition,showError);
}

function draw() {
  background(bg_img); 

  textSize(30);
  fill("blue");
  stroke("black");
  strokeWeight(3);
  text("Use Arrow Key To Move The Balloon",15,50);

  if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10,-0.01);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10,+0.01);
    }
console.log(position);
    
  drawSprites();
  }
}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  balloon.scale=position.s;
}

function writePosition(x,y,s){
  database.ref("balloon/position").set({
      'x':position.x+x,
      'y':position.y+y,
      's':position.s+s
  })
}



function showError(){
  console.log("Error in DataBase");
}
