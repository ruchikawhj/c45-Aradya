var BobsGroup, TopObsGroup;
var bg, bgImg;
var t1, t2;
var sun, sunImg;
var bottomGround;
var topGround;
var balloon, balloonImg, balloonCollided;
var b1, b2, b3;
var c1,c2,c3,collectObsGroup;
var score=0;
var collectableCount=0;
var gameOver,gameOverImg,restart,restartImg;

var gameState="play";

function preload() {
  bgImg = loadImage("assets/bg.png");
  sunImg = loadImage("assets/sun.png");
  b1 = loadImage("assets/obsBottom1.png");
  b2 = loadImage("assets/obsBottom2.png");
  b3 = loadImage("assets/obsBottom3.png");
  t1 = loadImage("assets/obsTop1.png");
  t2 = loadImage("assets/obsTop2.png");
  c1=loadImage("assets/maggi.png");
  c2=loadImage("assets/pringles.png");
  c3=loadImage("assets/water.png");
  

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
  balloonCollided=loadAnimation("assets/balloon1.png");

  restartImg=loadImage("assets/reset.png");
  gameOverImg=loadImage("assets/gameOver.png");

}

function setup() {
  createCanvas(windowWidth - 70, windowHeight - 70)

  //creating top and bottom grounds
  bottomGround = createSprite(width / 2, height - 5, width, 10);
  bottomGround.visible = true;
  bottomGround.shapeColor = "black"

  //sun
  sun = createSprite(100, 80, 15, 15);
  sun.addImage(sunImg);
  sun.scale = 0.175

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.addAnimation("collided", balloonCollided);
  balloon.scale = 0.2;

  gameOver=createSprite(width/2,height/2-150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.2;

  restart=createSprite(width/2,height/2-50);
  restart.addImage(restartImg);
  restart.scale=0.2

  gameOver.visible=false;
  restart.visible=false;


  //TopObsGroup
  TopObsGroup = new Group();
  BobsGroup = new Group();
  collectObsGroup =new Group();
}

function draw() {

  background("skyblue");

  console.log(getFrameRate())
  
  if(gameState==="play"){
  score+=Math.round(getFrameRate()/60)
  balloon.changeAnimation("balloon");

  //making the hot air balloon jump
  if (keyDown("space")) {
    balloon.velocityY = -6;

  }

  //adding gravity
  balloon.velocityY = balloon.velocityY + 0.5;

  spawnBottomObs();
  spawnTopObs();
  spawnCollectables();
  for(var i=0;i<collectObsGroup.length;i++){
    if(collectObsGroup.get(i).isTouching(balloon)){
      collectableCount+=1;
      collectObsGroup.get(i).destroy();
    }

  }
  if(TopObsGroup.isTouching(balloon)||BobsGroup.isTouching(balloon)||balloon.y>height-balloon.height/2){
    gameState="end";
  }

}

if(gameState==="end"){
balloon.changeAnimation("collided");


balloon.velocityY=0;
BobsGroup.setVelocityXEach(0);
TopObsGroup.setVelocityXEach(0);
BobsGroup.setLifetimeEach(-1);
TopObsGroup.setLifetimeEach(-1)
gameOver.depth=BobsGroup.depth+2;
restart.depth=BobsGroup.depth+2;
gameOver.visible=true;
restart.visible=true;

}
  drawSprites();
  fill("black");
  stroke("white");
  strokeWeight(3);
  textSize(30);
  text("Score: "+score,width-180,100)
  text("Collected: "+collectableCount,width-180,140)
}

function spawnBottomObs() {
  if (frameCount % 120 === 0) {
    var bottom = createSprite(width, height - 140);
    var x = Math.round(random(1, 3));
    switch(x) { 
      case 1 : bottom.addImage(b1);
      break 

      case 2 : bottom.addImage(b2);
      break 

      case 3 : bottom.addImage(b3);
      break 
    }

    bottom.scale = 0.15;
    bottom.velocityX = -4;
    bottom.lifetime = 400; 

    BobsGroup.add(bottom);
  }
}

function spawnTopObs() {
  if (frameCount % 60 === 0) {
    var top = createSprite(width, 50);
    var x = Math.round(random(1, 2));
    switch(x) { 
      case 1 : top.addImage(t1);
      break 

      case 2 : top.addImage(t2);
      break 
    }

    top.y = Math.round(random(40, 100));
    top.scale = 0.1;
    top.velocityX = -4;
    top.lifetime = 400; 

    TopObsGroup.add(top);
  }
}

function spawnCollectables() {
  if (frameCount % 80 === 0) {
    var collect = createSprite(width, 50);
    var x = Math.round(random(1, 3));
    switch(x) { 
      case 1 : collect.addImage(c1);
      collect.scale=0.15;
      break 

      case 2 : collect.addImage(c2);
      collect.scale = 0.3;
      break 

      case 3 : collect.addImage(c3);
      collect.scale = 0.4;
      break 
    }

    collect.y = Math.round(random(100, height/2));
    
    collect.velocityX = -4;
    collect.lifetime = 400; 

    collectObsGroup.add(collect);
  }
}
