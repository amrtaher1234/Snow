 
var snow = []; 
let gravity; 
let santa; 
let zOff = 0; 
var snowman ; 
var snoman2; 
var snoimage;
var snoimage2;

let spritesheet ;
let textures= []; 
function preload()
{
  spritesheet = loadImage("flakesheet.png"); 
  santa= loadSound("Santa.mp3"); 
  snoimage = loadImage("character.png"); 
  snoimage2 = loadImage("character2.png"); 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight); 
  
  for (let i =0; i<spritesheet.width; i=i+32)
  {
    for (let j=0; j<spritesheet.height; j+=32)
    {
      let img = spritesheet.get(i , j , 32 , 32); 
      textures.push(img); 
    }
  }
  gravity= createVector(0,0.03); 
  for (let i =0; i<400; i++)
  {
    let x = random(width); 
    let y = random(height); 
    let design = random(textures); 
    snow.push(new Snowflake(x  , y , design)); 

  }

  snowman = createSprite(100 , height-90);
  snowman.addImage(snoimage); 
  snowman.scale=0.29; 
  snowman.velocity.x=4; 
  snowman.friction =0.01;  
  

  snowman2 = createSprite(width-100 , height-90);
  snowman2.addImage(snoimage2); 
  snowman2.scale=0.29; 
  snowman2.velocity.x=-4; 
  snowman2.friction =0.01;  
  
  santa.play(); 
}


function draw()
{

  background(0); 
  //snow.push(new Snowflake()); 
  zOff +=0.01; 
  
  //let wind = createVector(wx , 0) ;
  for (flake of snow)
  {
  let xOff = flake.pos.x/width; 
  let yOff = flake.pos.y/height;   
  let wAngle = noise(xOff,yOff,zOff) * TWO_PI; 
  let wind =p5.Vector.fromAngle(wAngle); 
  wind.mult(0.008); 

    flake.applyForce(gravity); 
    flake.applyForce(wind);     
    flake.render(); 
    flake.update(); 
  }
  // for (let i =snow.length-1; i>=0 ; i--)
  // {
  //   if (snow[i].offScreen())
  //   {
  //     snow.splice(i,1); 
  //   }
  // }
  drawSprites(); 
}

