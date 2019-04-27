// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.star = 'images/Star.png';
    this.x = 200;
    this.y = 400;

}

// This will render player character in canvas 
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Player.prototype.update = function () {
    this.checkCollisions();

}
Player.prototype.checkCollisions = function () {
    //check collision with enemies
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            gamebord.minLive();
            this.rest();
        }
    }
    //check collision with water
    if (this.y <= 30) {
        gamebord.plusScore();
        this.rest();
    }
}


// Rest Position of player
Player.prototype.rest = function () {
    this.x = 200;
    this.y = 400;
}

// This will handle movement player
Player.prototype.handleInput = function (key) {

    if (key === 'left' && this.x > 0) {
        this.x -= 104;
    } else if (key === 'right' && this.x < 395) {
        this.x += 104;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 90;
    } else if (key === 'down' && this.y < 400) {
        this.y += 90;
    }
}

//This is game bord statics containts number of life for the player  and his score and increase the score and decrease life
var Gamebord = function () {
    this.score = 0;
    this.live = 3;
}

Gamebord.prototype.plusScore = function () {
    this.score++
}
Gamebord.prototype.getScore = function () {
    return this.score;
}

Gamebord.prototype.minLive = function () {
    if (this.live >= 1) {
        this.live--;
    } else {
        this.live = 3;
    }

}
Gamebord.prototype.getLive = function () {
    return this.live;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var enemy1 = new Enemy(120 * (Math.floor(Math.random() * 4)), 45, 150);
var enemy2 = new Enemy(120 * (Math.floor(Math.random() * 4)), 110, 300);
var enemy3 = new Enemy(120 * (Math.floor(Math.random() * 4)), 175, 450);
var enemy4 = new Enemy(120 * (Math.floor(Math.random() * 4)), 240, 500);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var gamebord = new Gamebord();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (gamebord.getLive() > 0) {
        player.handleInput(allowedKeys[e.keyCode]);

    } else {
        var r = confirm("You lose your game ...! Do you want Restart the game ?");
        if (r == true) {
            gamebord.live = 3;
            gamebord.score = 0;
        }


    }

});
