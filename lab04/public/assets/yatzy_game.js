window.gameState = {
    rollCount: 0,
    diceValues: [1, 1, 1, 1, 1], // Initialize with a default value for each die
    keep: [false, false, false, false, false],
    currentRound: 1,
    selectedScores: {}, // Added to track confirmed scores
    roundStarted: false
};

// Roll all dice, respecting the keep state
function rollAllDice() {
    if (gameState.rollCount < 3) {
        gameState.diceValues = gameState.diceValues.map((value, index) => 
            gameState.keep[index] ? value : rollDice()
        );
        gameState.rollCount++;
        gameState.roundStarted = true; 
        updateGameDisplay();
        updateScoresAfterRoll(); // Defined in yatzy_engine.js
    }
    
    if (gameState.rollCount === 3) {
        console.log("No more rolls allowed this turn.");
        document.getElementById('roll-dice').disabled = true;
    }
}

// Toggle the keep state of a dice
function toggleKeep(index) {
    if (gameState.rollCount > 0) {
        gameState.keep[index] = !gameState.keep[index];
        updateGameDisplay();
    }
}

// Update the game display according to the current state
function updateGameDisplay() {
    const diceContainer = document.getElementById('dice-container');
    drawDice(diceContainer, gameState.diceValues);

    let diceElements = document.querySelectorAll('.dice');
    gameState.keep.forEach((kept, index) => {
        diceElements[index].classList.toggle('selected', kept);
    });

    
    if(gameEnd()) {
        document.getElementById('roll-dice').disabled = true;
    } else {
        console.log("Round", gameState.currentRound);
        console.log("Roll", gameState.rollCount, ":", gameState.diceValues, "Keep states:", gameState.keep);
    }
}

function gameEnd() {
    if(gameState.currentRound === 3) { // Game has ended
        return true;
    } 
    return false;
    
}

document.addEventListener('DOMContentLoaded', function() {
    // Define gameState globally within this file to track the game state
    

    // Attach event listeners
    document.getElementById('roll-dice').addEventListener('click', rollAllDice);

    document.getElementById('dice-container').addEventListener('click', function(event) {
        const die = event.target.closest('.dice');
        if (die) {
            const index = Array.from(die.parentNode.children).indexOf(die);
            toggleKeep(index);
        }
    });

    // Ensure updateScoresAfterRoll is called initially if needed
    updateGameDisplay();
    updateScoresAfterRoll(); // Initial score update
});
