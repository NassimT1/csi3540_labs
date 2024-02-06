document.addEventListener('DOMContentLoaded', function() {
    let gameState = {
        rollCount: 0,
        diceValues: [1, 1, 1, 1, 1], // Initialize with a default value for each die
        keep: [false, false, false, false, false]
    };

    function rollAllDice() {
        if(gameState.rollCount < 3) {
            for(let i = 0; i < gameState.diceValues.length; i++) {
                if(!gameState.keep[i]) {
                    gameState.diceValues[i] = rollDice();
                }
            }
            gameState.rollCount++;
            updateGameDisplay();
        } 
        
        if(gameState.rollCount == 3) {
            console.log("No more rolls allowed this turn.");
            document.getElementById('roll-dice').disabled = true;
        }
    }


    function toggleKeep(index) {
        if(gameState.rollCount > 0) {
            gameState.keep[index] = !gameState.keep[index];
            updateGameDisplay(); // Reflect changes in keep state visually, if needed
        }
        
    }

    function updateGameDisplay() {
        const diceContainer = document.getElementById('dice-container');
        drawDice(diceContainer, gameState.diceValues);
        // Optionally, update the display to show roll count, keep states, etc.
        console.log("Roll ", gameState.rollCount, gameState.diceValues, "Keep States:", gameState.keep);
        let diceElements = document.querySelectorAll('.dice');
        gameState.keep.forEach(function(isKept, index) {
            if (isKept) {
                diceElements[index].classList.add('selected');
            } else {
                diceElements[index].classList.remove('selected');
            }
    });

    }

    document.getElementById('dice-container').addEventListener('click', function(event) {
        const die = event.target.closest('.dice');
        if(die && gameState.rollCount > 0) {
            const index = Array.from(die.parentNode.children).indexOf(die);
            toggleKeep(index);
        }
    });

    document.getElementById('roll-dice').addEventListener('click', rollAllDice);

    updateGameDisplay(); // Initial display
    
});
