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

let balls = []; // Array to hold multiple balls
let ballSize = 80;
let lives = 20; // Initialize lives
let livesText; // Text to display lives
let gameOverText; // Text to display "Game Over"

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    // Create 3 balls with different initial positions and speeds
    for (let i = 0; i < 3; i++) {
        let ball = {
            sprite: this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"),
            xspeed: 3 + i, // Different speeds for each ball
            yspeed: 3 + i
        };
        ball.sprite.setDisplaySize(ballSize, ballSize);
        ball.sprite.setInteractive();

        // Add a click event listener to each ball
        ball.sprite.on('pointerdown', () => {
            if (lives > 0) {
                // Reduce the ball size by 10%
                ballSize *= 0.9;
                ball.sprite.setDisplaySize(ballSize, ballSize);

                // Increase the speed by 10%
                ball.xspeed *= 1.1;
                ball.yspeed *= 1.1;

                // Increase lives by 1
                lives++;
                updateLivesText();
            }
        });

        balls.push(ball); // Add the ball to the array
    }

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

    // Update each ball's position and check for collisions
    balls.forEach(ball => {
        ball.sprite.y += ball.yspeed;
        ball.sprite.x += ball.xspeed;

        // Check for wall collisions
        if (ball.sprite.y >= HEIGHT - ballSize / 2 || ball.sprite.y <= ballSize / 2) {
            ball.yspeed *= -1; // Flip direction
            reduceLives();
        }

        if (ball.sprite.x >= WIDTH - ballSize / 2 || ball.sprite.x <= ballSize / 2) {
            ball.xspeed *= -1; // Flip direction
            reduceLives();
        }
    });
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
