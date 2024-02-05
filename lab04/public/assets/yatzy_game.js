// yatzy_game.js

document.addEventListener("DOMContentLoaded", function() {
    const rollButton = document.querySelector(".roll-button");
    let rollNumber = 0; // Track the number of rolls

    function logGameState() {
        console.log(`Roll number: ${rollNumber}`);
    }

    // Modified event listener for the roll button
    rollButton.addEventListener('click', function() {
        if (rollNumber < 3) {
            rollNumber++;
            logGameState();
        } else {
            console.log('Roll limit reached. No more rolls allowed.');
            // Optionally disable the roll button to prevent further clicks
            rollButton.disabled = true;
        }
    });

    // Initial log
    logGameState();
});
