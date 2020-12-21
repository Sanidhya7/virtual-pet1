var basket_img,egg,egg_img;
var hen,hen_img,shelf1,ground,shelf2,edge,rand,egg_grp;
var score = 0,life = 3;
var gamestate;

function preload(){
  
  egg_img=loadImage("egg.png");
  basket_img=loadImage("basket.png");
  hen_img=loadImage("hen.png");
}

function setup(){
  
  createCanvas(560,500);
    
  /*egg=createSprite(5,85,40,10);
  egg.addImage("egg",egg_img);
  egg.scale = 0.5;
  */
  basket=createSprite(200,480,10,10);
  basket.addImage("hen",basket_img);
  
  
  hen = createSprite(40,50,10,10);
  hen.addImage("hen",hen_img);
  hen.scale = 0.8;

  
  shelf1 = createSprite(0,35,1500,100);
  shelf1.shapeColor="brown";
  
  
  shelf2 = createSprite(50,90,1500,30);
  shelf2.shapeColor = "#de5147";
  
  ground = createSprite(0,500,1500,30);
  ground.shapeColor = "green";
  
 
  egg_grp=new Group();
  
  gamestate="start";
  
 // basket.setCollider("rectangle",0,1,70,40);
 // basket.debug = true;
  basket.collide(ground); 
   for(var i=0; i<9; i++){
        
  hen = createSprite(40+(i*60),50,10,10);
  hen.addImage("hen",hen_img);
  hen.scale = 0.8;
          
  }
  
}


function draw(){
  
  background("black");
  fill("red");
  textSize(15);
  text("Life "+life,490,150);
  fill("white");
  text("Score "+score,10,150);
  
  if(keyDown("left")){
    
     basket.x=basket.x-9;
  }
  
  
  if(keyDown("right")){
    
     basket.x=basket.x+9;
  }
 
  
 
  //place info text in the center
  if (gamestate === "start") {
    
    text("Use LEFT & RIGHT arrow key to move the basket left and  right",100,200);
      text("Press SPACE to continue",170,220);   
        

  }
  if (gamestate === "start" && keyDown('space')) {
        gamestate="play";
  }
   
  if(gamestate==="play" && life >0 ){
    
    
    createEggs(); 
  if(egg_grp.collide (basket)) {
      
      score = score + 10;
      //egg.lifetime=0;
      egg.destroy();
      
    }
      if(egg_grp.collide(ground)) {
      
      life = life - 1;
      egg.destroy();
      //egg.lifetime=0;

    }  
  }
   
    if (life === 0){
      
    gamestate = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
    egg_grp.setVelocityYEach(0);
  }
  
  if (keyDown("r") && gamestate === "over") {
    
    reset();
    gamestate = "start";
    
  }
  
  
  edge = createEdgeSprites();
  basket.collide(edge);
   
  
  drawSprites();
 
}

function createEggs(){
 
  if(frameCount % 70 === 0){
    
    egg=createSprite(Math.round(random(1,500)),150,40,10);
    egg.addImage("egg",egg_img);
    egg.velocityY = 5;        
    egg.scale = 0.5;
    egg.lifetime=100;
    egg_grp.add(egg);
        
  
    basket.depth=basket.depth+1;
    egg.depth=basket.depth;
    
    }
  
} 
function reset(){
  
  life = 3;
  score = 0;
  
}