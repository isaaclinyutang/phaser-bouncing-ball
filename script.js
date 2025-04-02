let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 3;
let xspeed = 3;
let lives = 10; // Initialize lives
let livesText; // Text to display lives
let gameOverText; // Text to display "Game Over"

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Enable input on the ball
    ball.setInteractive();

    // Add a click event listener to the ball
    ball.on('pointerdown', () => {
        if (lives > 0) {
            // Reduce the ball size by 10%
            ballSize *= 0.9;
            ball.setDisplaySize(ballSize, ballSize);

            // Increase the speed by 10%
            xspeed *= 1.1;
            yspeed *= 1.1;

            // Increase lives by 1
            lives++;
            updateLivesText();
        }
    });

    // Display lives on-screen
    livesText = this.add.text(10, 10, `Lives: ${lives}`, { fontSize: '32px', fill: '#fff' });

    // Create "Game Over" text but make it invisible initially
    gameOverText = this.add.text(WIDTH / 2, HEIGHT / 2, 'Game Over', { fontSize: '64px', fill: '#f00' });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);
}

function update() {
    if (lives <= 0) {
        // Stop the game and display "Game Over"
        gameOverText.setVisible(true);
        return;
    }

    ball.y += yspeed;
    ball.x += xspeed;

    // Check for wall collisions
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1; // Flip direction
        reduceLives();
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1; // Flip direction
        reduceLives();
    }
}

function reduceLives() {
    if (lives > 0) {
        lives--;
        updateLivesText();
    }
}

function updateLivesText() {
    livesText.setText(`Lives: ${lives}`);
}
