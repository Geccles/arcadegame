//zombie image provided by Irina Mir (irmirx)- http://opengameart.org/content/zombie-animations
// license: Creative Commons CC-BY 3.0
//I made the zombie smallers and flipped the zombie horizontally in photoshop

//music by la.zlor - Some Weird Loop Sound.ogg
// license: Creative Commons CC0 pubilic domain
//music link - http://opengameart.org/content/weird-sound-loop

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.zombieList = ['images/zombie1.png', 'images/zombie2.png',
    'images/zombie3.png', 'images/zombie4.png',
    'images/zombie5.png', 'images/zombie6.png',
    'images/zombie7.png', 'images/zombie8.png',
    'images/zombie9.png', 'images/zombie10.png'
  ];
  Resources.load(this.zombieList);
  this.sprite = this.zombieList[0];

  this.loopCounter = 0;
  this.spriteNumber = this.zombieList.length;
  this.loopInterval = 20;
  this.spriteCurrent = 0;


  this.x = x;
  this.y = y;
  this.speed = 40 + 40 * Math.random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + this.speed * dt;
  if (this.x > 808) {
    this.x = 0;
  }
  this.checkCollision();
};

//this is checkCollisions
Enemy.prototype.checkCollision = function() {
  var playerPos = player.place();
  var playerX = playerPos.x;
  var playerY = playerPos.y;

  if (Math.abs(this.x - playerX) < 50 && this.y == playerY) {
    player.reset(true);
  }
  this.loopCounter++;
  //make the enemy walk
  if (this.loopCounter > this.loopInterval) {
    //go to the next image
    this.spriteCurrent++;
    if (this.spriteCurrent >= this.spriteNumber) {
      //reset to beinning enemy
      this.spriteCurrent = 0;
    }
    this.loopCounter = 0;
    //make the new enemy
    this.sprite = this.zombieList[this.spriteCurrent];
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = 'images/char-princess-girl.png';
  Resources.load(this.sprite);
  this.x = x;
  this.y = y;
  this.myTimeout;
  this.myScore = 0;
  this.checkKey = true;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {};

Player.prototype.setScore = function() {
  ctx.clearRect(0, 0, 808, 555);
  ctx.font = 'italic 20pt Calibri';
  ctx.fillText("Score: ", 10, 30);
  ctx.fillText(this.myScore, 101, 30);
};

Player.prototype.handleInput = function(key) {
  if (this.checkKey) {
    if (key == 'up' && this.y >= 83) {
      this.y = this.y - 83;
    }
    if (key == 'down' && this.y < 415) {
      this.y = this.y + 83;
    }
    if (key == 'left' && this.x >= 101) {
      this.x = this.x - 101;
    }
    if (key == 'right' && this.x < 707) {
      this.x = this.x + 101;
    }
    //this is where the player wins
    if (this.y <= 0) {
      this.checkKey = false;
      this.myScore++;
      this.setScore();
      this.myTimeout = setTimeout(function() {
        player.reset(false)
      }, 350);
    }
  }
};

Player.prototype.place = function() {
  return {
    x: this.x,
    y: this.y
  }
};

Player.prototype.reset = function(collision) {
  this.x = 404;
  this.y = 415;
  clearTimeout(this.myTimeout);
  if (collision) {
    this.myScore = 0;
    this.setScore();
  }
  this.checkKey = true;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
allEnemies[0] = new Enemy(0, 83);
allEnemies[1] = new Enemy(101, 166);
allEnemies[2] = new Enemy(0, 249);

function randomRow() {
  var rn = Math.random();
  var newY;
  if (rn < 0.33) {
    newY = 83;
  } else if (rn < 0.66) {
    newY = 166;
  } else {
    newY = 249;
  }
  return newY;
}
allEnemies[3] = new Enemy(202, randomRow());
allEnemies[4] = new Enemy(303, randomRow());
allEnemies[5] = new Enemy(404, randomRow());
allEnemies[6] = new Enemy(505, randomRow());



// Place the player object in a variable called player
var player = new Player(404, 415);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
