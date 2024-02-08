function countDice(diceValues) {
    return diceValues.reduce(function(acc, value) {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
}

function scoreOfAKind(diceValues, kind) {
    var counts = countDice(diceValues);
    var keys = Object.keys(counts).filter(function(key) {
        return counts[key] >= kind;
    });
    if (keys.length > 0) {
        return diceValues.reduce(function(acc, cur) {
            return acc + cur;
        }, 0); // Sum all dice for 3/4 of a kind
    }
    return 0;
}

function scoreFullHouse(diceValues) {
    var counts = countDice(diceValues);
    var values = Object.values(counts);
    if (values.includes(3) && values.includes(2)) {
        return 25; // Standard score for a full house
    }
    return 0;
}

function scoreSmallStraight(diceValues) {
    var uniqueValues = [...new Set(diceValues)].sort(function(a, b) { return a - b; });
    var straights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
    for (var i = 0; i < straights.length; i++) {
        var straight = straights[i];
        var matches = straight.every(function(num) {
            return uniqueValues.includes(num);
        });
        if (matches) {
            return 30; // Score for a small straight
        }
    }
    return 0;
}

function scoreLargeStraight(diceValues) {
    var uniqueValues = [...new Set(diceValues)].sort().join('');
    if (uniqueValues === '12345' || uniqueValues === '23456') {
        return 40; // Score for a large straight
    }
    return 0;
}

function scoreChance(diceValues) {
    return diceValues.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
}

function scoreYatzy(diceValues) {
    if (new Set(diceValues).size === 1) {
        return 50; // Score for Yatzy
    }
    return 0;
}

function scoreUpperSection(diceValues, number) {
    return diceValues.filter(value => value === number).length * number;
}


function updateScoresAfterRoll() {
    const diceValues = gameState.diceValues;
    document.getElementById('ones-value').textContent = scoreUpperSection(diceValues, 1);
    document.getElementById('twos-value').textContent = scoreUpperSection(diceValues, 2);
    document.getElementById('threes-value').textContent = scoreUpperSection(diceValues, 3);
    document.getElementById('fours-value').textContent = scoreUpperSection(diceValues, 4);
    document.getElementById('fives-value').textContent = scoreUpperSection(diceValues, 5);
    document.getElementById('sixes-value').textContent = scoreUpperSection(diceValues, 6);
    // Continue for all upper section scores
    
    // Lower section scores
    document.getElementById('three-kind-value').textContent = scoreOfAKind(diceValues, 3);
    document.getElementById('four-kind-value').textContent = scoreOfAKind(diceValues, 4);
    document.getElementById('full-house-value').textContent = scoreFullHouse(diceValues);
    document.getElementById('small-straight-value').textContent = scoreSmallStraight(diceValues);
    document.getElementById('large-straight-value').textContent = scoreLargeStraight(diceValues);
    document.getElementById('chance-value').textContent = scoreChance(diceValues);
    document.getElementById('yatzy-value').textContent = scoreYatzy(diceValues);
    
    // Highlight potential scores
    document.querySelectorAll('.grid div[id$="-value"]').forEach(function(element) {
        if (element.textContent !== "0") {
            element.classList.add('score-possible');
        }
    });
}

function setupScoreSelection() {
    document.querySelectorAll('.grid div[id$="-value"]').forEach(function(element) {
        element.addEventListener('click', function() {
            var scoreId = this.id; // Use the full ID, including "-value"
            confirmScore(scoreId, parseInt(this.textContent, 10));
        });
    });
}


function confirmScore(scoreId, scoreValue) {
    // If using full IDs as keys in gameState.selectedScores or related logic
    if (scoreValue > 0 && gameState.selectedScores[scoreId] === undefined) {
        gameState.selectedScores[scoreId] = scoreValue; // Use the full ID as the key
        
        var scoreElement = document.getElementById(scoreId);
        scoreElement.classList.remove('score-possible');
        scoreElement.classList.add('score-confirmed');

        // Additional logic as needed, e.g., clearing other potential scores
        clearPotentialScores();
        nextRound(); // Proceed to the next round
    }
}

function updateConfirmedScores() {
    Object.keys(gameState.selectedScores).forEach(function(scoreType) {
        var scoreValue = gameState.selectedScores[scoreType];
        var elementId = scoreType + "-value"; // Construct the element ID, e.g., "ones-value"
        var scoreElement = document.getElementById(elementId);
        if (scoreElement) {
            scoreElement.textContent = scoreValue; // Update the score display
            scoreElement.classList.remove('score-possible');
            scoreElement.classList.add('score-confirmed');
        }
    });

    // Clear potential scores after a selection is made
    clearPotentialScores();
}

function clearPotentialScores() {
    document.querySelectorAll('.score-possible').forEach(function(element) {
        if (!element.classList.contains('score-confirmed')) {
            element.textContent = ''; // Clear non-confirmed scores
            element.classList.remove('score-possible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupScoreSelection();
});

