//Global Variables
var monkey, monkey_running, stone, stoneImg, banana, bananaImg;
var ground, gameOver, gameOverImg, restart, restartImg;

var bg, bgImg;

var score = 0;


function preload(){

  bgImg = loadImage("jungle.jpg");
  stoneImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
}


function setup() {
  createCanvas(800,400);
  
  bg = createSprite(0,0,800,400);
  bg.addImage("jungle",bgImg);
  bg.scale=1.6;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
    
  ground = createSprite(400,390,800,10);
 
  ground.x=ground.width/2;
  ground.visible=false;
  
  monkey = createSprite(50,380,50,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  
  
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  
  score = 0;
}


function draw(){
 background(255); 

 if(bg.x < 0){
   bg.x = bg.width/2;
 } 
  
 if(keyDown(32)){
   monkey.velocityY = -12;
 }
  monkey.velocityY += 0.5;
  
  monkey.collide(ground);
  
  spawnObstacles();
  food();
  
  if(FoodGroup.isTouching(monkey)){
    score += 2;
    FoodGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.14;
             break;
    case 20: monkey.scale = 0.16;
             break;
             
    case 30: monkey.scale = 0.18;
             break;
    case 40: monkey.scale = 0.2;
             break;         
  }  
  
  if(ObstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.12;
  }
  
 drawSprites(); 
  
 textSize(18);
 strokeWeight(4);
 fill(255);
  
 text("Score: "+score,width-150,30);
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,370,10,40);
    obstacle.velocityX = -4;
    
   
    obstacle.addImage(stoneImg);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function food() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana = createSprite(800,320,40,10);
    banana.y = random(200,350);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}
