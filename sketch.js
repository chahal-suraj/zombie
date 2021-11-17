var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet;
var zombie,ZombieImg;
var gameState=PLAY;
var PLAY=1;
var END=0; 
var score;
var destroy1;

function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  ZombieImg = loadImage("assets/zombie.png");
}

function setup() {
createCanvas(1000,700);

bg = createSprite(500,400,1000,1000)
bg.addImage(bgImg)

player = createSprite(200,500,50,50);
player.addImage(shooterImg);
player.scale = 0.3;
player.debug = false;
player.setCollider("rectangle",0,0,300,300);

bulletGroup=new Group();
ZombieGroup=new Group();

score=0;
}

function draw() {
  background(0); 
  text("score: "+score,800,50);
  fill("white")

if(gameState===PLAY){
player.visible=true;
}
if(gameState===END){
  ZombieGroup.destroy();
  bulletGroup.destroyEach();
  player.visible=false;
  zombie.lifetime=0;
}
if (player.collide(ZombieGroup)) {
  gameState=END;
}
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if (bulletGroup.isTouching(ZombieGroup)) {
  zombie.destroy();
  bulletGroup.destroyEach();
  score+=20;
}
createZombie();
drawSprites();
s();

}



function s(){
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
    shootBullet();
  }
  else if(keyWentUp("space")){
    player.addImage(shooterImg);
    bullet.velocityX=5;
  }
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-20
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function createZombie(){
  if(frameCount%200===0){
  zombie = createSprite(800,random(20,780),40,40);
  zombie.addImage(ZombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -3;
  zombie.lifetime = 600;
  ZombieGroup.add(zombie);
}
}