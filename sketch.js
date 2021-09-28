const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var crew = []
var balls = []
var a = 0;
var score = 0;
var gamestate = "play";


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(160, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  if(gamestate == "play"){
             createBoats();
             displayBoats();
             displayBalls();
             cannon.display();  
  }

  if(gamestate == "end"){
             fill('red')
             textSize(40)
             text("GAME OVER", 500, 300)
  }

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  
  fill('red')
  textSize(40)
  text("score:" + score, 700, 30)


}



function displayBalls(){
  for(x = 0 ;x < balls.length ;x++ ){
    if(balls[x]!= undefined && crew[x]!= undefined){
      balls[x].display();
      destroyBoats(x);
    }
  }
}

function displayBoats(){
  for(x = 0 ;x < crew.length ;x++ ){
    if(crew[x]!= undefined){
      crew[x].display();
      if(crew[x].body.position.x < 230){
        gamestate = "end"
      }
    }
  }
}

function keyPressed(){
  if (keyCode==DOWN_ARROW){
      cannonBall = new CannonBall(cannon.x, cannon.y);
      Matter.Body.setAngle(cannonBall.body, cannon.angle);
      balls.push(cannonBall)
  }
}

function keyReleased(){
  if (keyCode==DOWN_ARROW){
    balls[balls.length - 1].shoot() 
  }
}


function createBoats(){
  if (crew.length < 5){
    boat = new Boat(random(800,1600), 500, 100, 100);
    crew.push(boat)
  }
}

function destroyBoats(index){

  for( var x = 0; x < 5; x = x + 1){
    if(balls[index]!= undefined && crew[x]!= undefined){
      var collision = Matter.SAT.collides(balls[index].body, crew[x].body);
      if (collision.collided){
        score = score + 5
        console.log(x)
        World.remove(world, crew[x].body);
        World.remove(world, balls[index].body);
        delete balls[index]  
        delete crew[x]
      }
    }
  }
}

