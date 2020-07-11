// Defining horizontal and vertial steps (= dimensions of blocks)
const hzStep = 101;
const vtStep = 83;

// ENEMY object and methods
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 68;

    // setting max speed of 600 (450 + 150) & min speed of 150
    this.speed = Math.random() * 450 + 150;
};

// update each enemy with new random x position on the canvas and new random speed
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > hzStep*5) {
        this.x = -(Math.random() * 300);
        this.speed = Math.random() * 450 + 150;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// creating a list of enemies with x & y positions relevant to the stone blocks' rows
const bug1 = new Enemy(-hzStep*.9, vtStep*0.7);
const bug2 = new Enemy(-hzStep*.9, vtStep*1.7);
const bug3 = new Enemy(-hzStep*.9, vtStep*2.7);

const allEnemies = [bug1, bug2, bug3];

// PLAYER object and methods
var Player = function(x, y) {
    this.characters = ['images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'];
    this.charNumber = 0;
    this.sprite = this.characters[this.charNumber];
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 78;
};

Player.prototype.update = function() {
    // once a character reaches the water side, another character comes in
    if (this.y < vtStep - 10 && this.charNumber < this.characters.length - 1) {
        this.sprite = this.characters[this.charNumber + 1];
        this.x = hzStep * 2;
        this.y = vtStep * 5 - 10;
        this.charNumber++;
    }
    // check when all characters have crossed the stone blocks to the water safe side
    else if (this.y < vtStep - 10 && this.charNumber === this.characters.length - 1) {
        const toDoPara = document.getElementById('to-do');
        toDoPara.style.cssText = 'background-color: grey; color: gold; font-size: 1.7em;';
        toDoPara.textContent = 'Awesome! The Princess and her friends are now safe.';
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput makes the charatcer move across the canvas using arrows
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if (this.x >= hzStep)
                this.x -= hzStep;
            break;
        case 'right':
            if (this.x < hzStep*4)
                this.x += hzStep;
            break;
        case 'up':
            if (this.y >= vtStep - 10)
                this.y -= vtStep;
            break;
        case 'down':
            if (this.y < vtStep*4)
                this.y += vtStep;
            break;
    }
};

// the 10 px subtracted from vtStep below and and in different locations above,
// to adjust the sprite's position within the block it's standing on
const player = new Player(hzStep * 2, vtStep * 5 - 10);

// to check when player is colliding with one of the enemies
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        /*
            The numbers in the conditions correspond for
            the transparent spaces, horizontally & vertically,
            before each character and enemy in their pngs,
            thus negelecting them in the collisions
        */
        /*
        conditions inspired form
        https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
        */
        if (player.x + 17 < enemy.x + enemy.width &&
            player.x + 17 + player.width > enemy.x &&
            player.y + 62 < enemy.y + 77 + enemy.height &&
            player.y + 62 + player.height > enemy.y + 77) {
        player.x = hzStep * 2;
        player.y = vtStep * 5 - 10;
        }
    })
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
