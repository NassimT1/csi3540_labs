let game = [];
let pacmanPosition = 0;
let fruitPosition = 0;
let enemyPosition = 0;
let score = 0;


function createGame(n) {
    if(n < 3) {
        console.log("Game cannot be smaller than 3")
    } else {
        game = new Array(n).fill('.');
        pacmanPosition = Math.floor(Math.random() * n); // Generate random position for pacman
        game[pacmanPosition] = 'C';

        do { // Do while to add position of fruit without overlaping with pacman
            fruitPosition = Math.floor(Math.random() * n);
        } while (fruitPosition === pacmanPosition);
        game[fruitPosition] = '@';

        do { // Do while to add position of ghost without overlaping with pacman or fruit
            enemyPosition = Math.floor(Math.random() * n);
        } while (enemyPosition === pacmanPosition || enemyPosition === fruitPosition);
        game[enemyPosition] = '^';

        console.log(game); // Display the game
    }
}

function moveLeft() {
    if (game[pacmanPosition - 1] === '^' || (pacmanPosition === 0) && (enemyPosition === game.length - 1)) { // If pacman hits the left border or ghost, end game
        console.log("Game Over");
        console.log(`Score: ${score}`);
        return;
    } 
    else if (pacmanPosition === 0) {
        if (fruitPosition === game.length - 1) {
            score += 50;
        } else {
            score += 10;
        }
        game[pacmanPosition] = '.';
        pacmanPosition = game.length - 1;
        game[pacmanPosition] = 'C';
        console.log(game);
    }
    else { // Otherwise update pacman's position and score
        if (game[pacmanPosition - 1] === '@') {
            score += 50;
        } else {
            score += 10;
        }
        game[pacmanPosition] = '.';
        pacmanPosition--;
        game[pacmanPosition] = 'C';
        console.log(game);
    }
    console.log(`Score: ${score}`);
    enemyMove()
}

function moveRight() {
    if (game[pacmanPosition + 1] === '^' || (pacmanPosition === game.length - 1) && (enemyPosition === 0)) { // If pacman hits the right border or ghost, end game
        console.log("Game Over");
        console.log(`Final score: ${score}`);
        return;
    }
    else if (pacmanPosition === game.length - 1) {
        game[pacmanPosition] = '.'; // Clear the current position
        pacmanPosition = 0; // Move pacman to the leftmost position
        if (game[pacmanPosition] === '@') { // Check if there's a fruit at the new position
            score += 50;
        } else {
            score += 10;
        }
        game[pacmanPosition] = 'C'; // Place pacman at the new position
    } else { // Otherwise update pacman's position
        if (game[pacmanPosition + 1] === '@') {
            score += 50;
        } else {
            score += 10;
        }
        game[pacmanPosition] = '.';
        pacmanPosition++;
        game[pacmanPosition] = 'C';
        
    }
    console.log(game);
    console.log(`Score: ${score}`);
    enemyMove()
}

function enemyMove() {
    game[enemyPosition] = '.'; // Clear the current position of the enemy
    let direction = Math.round(Math.random()) * 2 - 1; // Generate 0 or 1. If 0, enemy moves left (-1), if 1, enemy moves right (+1)
    let newPosition = (enemyPosition + direction + game.length) % game.length; // Calculate the new position of the enemy
    // Check if the new position is occupied by a fruit or the player
    while (game[newPosition] === '@' || game[newPosition] === 'C') {
        if (game[newPosition] === 'C') { // If the enemy collides with the player, end the game
            console.log("Game Over");
            console.log(`Final score: ${score}`);
            return;
        }
        direction = Math.round(Math.random()) * 2 - 1; // If the new position is occupied by a fruit, generate a new direction
        newPosition = (enemyPosition + direction + game.length) % game.length; // And calculate a new position
    }
    enemyPosition = newPosition;
    game[enemyPosition] = '^'; // Place the enemy at the new position
    console.log(game);
}


