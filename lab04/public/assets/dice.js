// Reference: 

document.addEventListener("DOMContentLoaded", function() {
    function createDice(number) {
        const dotPositionMatrix = { // Get position of dots for each dice face
            1: [
                [50, 50]
            ],
            2: [
                [20, 20],
                [80, 80]
            ],
            3: [
                [20, 20],
                [50, 50],
                [80, 80]
            ],
            4: [
                [20, 20],
                [20, 80],
                [80, 20],
                [80, 80]
            ],
            5: [
                [20, 20],
                [20, 80],
                [50, 50],
                [80, 20],
                [80, 80]
            ],
            6: [
                [20, 20],
                [20, 80],
                [50, 20],
                [50, 80],
                [80, 20],
                [80, 80]
            ]
        };

        const dice = document.createElement("div");
        dice.classList.add("dice");

        for (const dotPosition of dotPositionMatrix[number]) {
            const dot = document.createElement("div");
            dot.classList.add("dice-dot");
            dot.style.setProperty("--top", dotPosition[0] + "%");
            dot.style.setProperty("--left", dotPosition[1] + "%");
            dice.appendChild(dot);
        }

        return dice;
    }

    function initializeDie(diceContainer, numberOfDice) { // Initialize the n dices to 1
        diceContainer.innerHTML = "";
        for(let i=0; i < numberOfDice; i++) {
            const dice = createDice(1);
            diceContainer.appendChild(dice);
        }
    }
    
    function randomDie(diceContainer, numberOfDice) { // Generate n random dice faces 
        diceContainer.innerHTML = "";
        for(let i=0; i < numberOfDice; i++) {
            const rand = Math.floor((Math.random()*6) + 1);
            const dice = createDice(rand);
            diceContainer.appendChild(dice);
        }
    }

    const NUMBER_OF_DICE = 5;
    const diceContainer = document.querySelector(".dice-container");
    const rollButton = document.querySelector(".roll-button");

    initializeDie(diceContainer,NUMBER_OF_DICE);

    rollButton.addEventListener('click', function(event) { // Randomize all die after button click
        event.preventDefault();
        randomDie(diceContainer,NUMBER_OF_DICE);
    });
});