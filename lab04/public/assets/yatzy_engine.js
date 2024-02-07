function calculateScore(diceValues) {
    // Example: Calculate score for "Ones"
    const onesScore = diceValues.filter(value => value === 1).length * 1;
    document.getElementById('ones-value').textContent = onesScore;

    // Other score calculations will follow a similar pattern, updated dynamically based on `diceValues`
    // E.g., for "Twos": const twosScore = diceValues.filter(value => value === 2).length * 2;
}

// Example function to update scores - you'd call this whenever dice are rolled/kept or when advancing rounds
function updateScores() {
    const diceValues = gameState.diceValues; // Assuming gameState.diceValues contains current dice values
    calculateScore(diceValues);
    // Additional functions to calculate other scores here
}

// You would need to call updateScores() at appropriate times, such as after dice rolls are finalized
