var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
  createCanvas(windowWidth-70,windowHeight-70)

//background image
//bg = createSprite(width/2,height/2,width,height);
//bg.addImage(bgImg);
//bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(width/2,height-5,width,10);
bottomGround.visible = true;
bottomGround.shapeColor="black" 

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.3;



}

function draw() {
  
  background("skyblue");
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
        drawSprites();
        
}