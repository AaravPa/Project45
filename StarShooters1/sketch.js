var playerShip, bullet, playerShipIMG, backGroundIMG, bulletIMG;
var enemy, enemyGroup, bulletGroup, enemy1IMG, enemy2IMG, enemy3IMG;

function preload() {
  playerShipIMG = loadImage("images/playerShip.png");	
  enemyIMG1 = loadImage("images/enemy_1.png");	
  enemyIMG2 = loadImage("images/enemy_2.png");	
  enemyIMG3 = loadImage("images/enemy3.png");	
  backGroundIMG = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png");
  bulletIMG = loadImage("images/laser3.png");
}

function setup() {
  createCanvas(500, 700);

  bg = createSprite(200,350,500,1400);
  bg.addAnimation("background", backGroundIMG);
  bg.scale = 0.5;
  bg.velocityY = 2;
  bg.y = bg.height/2;

  playerShip = createSprite(250,600,50,50);
  playerShip.debug = true;
  playerShip.addImage("spaceship", playerShipIMG);

  enemyGroup = new Group();
}


function draw() {
  
  background(0);
  if(bg.y > 350) {
    bg.y = bg.height/2;
  }

  if(keyWentDown("space")) {
    bullet = createSprite(playerShip.x, playerShip.y, 50, 50);
    bullet.debug = true;
    bullet.setCollider("rectangle", 0, 0, 120, 340);
    bullet.addImage(bulletIMG);
    bullet.scale = 0.15;
    bullet.velocityY = -7;
  }

  playerShip.x = mouseX;
  playerShip.y = mouseY;

  if(enemyGroup.isTouching(bullet)) {
    enemyGroup.destroyEach();
    bullet.destroy();
  }

  drawSprites();
 
  spawnEnemies();
}

function spawnEnemies() {
  if(frameCount % 100 == 0) {
    enemy = createSprite(random(0, 500), 10, 50, 50);
    enemy.debug = true;
    enemy.velocityY = 5;
    var rand = Math.round(random(1,3));
    switch(rand) {
     case 1 : enemy.addImage(enemyIMG1); 
       break;
     case 2 : enemy.addImage(enemyIMG2);
       break;
     case 3 : enemy.addImage(enemyIMG3);
       break;
     default : break;
    }
    enemyGroup.add(enemy);
    enemy.lifetime = 140;
  }
}




