// Define the positions of dots for each dice face
const dotPositionMatrix = {
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

// Create a dice element with dots based on the number
function createDice(number) {
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

// Update the dice element with new dots based on the number
function updateDice(dice, number) {
  dice.innerHTML = '';
  for (const dotPosition of dotPositionMatrix[number]) {
    const dot = document.createElement("div");
    dot.classList.add("dice-dot");
    dot.style.setProperty("--top", dotPosition[0] + "%");
    dot.style.setProperty("--left", dotPosition[1] + "%");
    dice.appendChild(dot);
  }
}

// Initialize the dice elements and add event listener for rolling dice
document.addEventListener('DOMContentLoaded', function () {
  const diceContainer = document.querySelector('.dice-container');

  // Create initial dice elements
  for (let i = 1; i <= 6; i++) {
    const dice = createDice(i);
    diceContainer.appendChild(dice);
  }

  const rollButton = document.querySelector('.btn-roll-dice');
  rollButton.addEventListener('click', function () {
    const numberOfDiceInput = document.getElementById('number-of-dice');
    const numberOfDice = parseInt(numberOfDiceInput.value, 10);
    const maxDice = parseInt(numberOfDiceInput.max, 10);

    // Validate the number of dice input
    if (isNaN(numberOfDice) || numberOfDice < 1 || numberOfDice > maxDice) {
      alert(`Please enter a valid number of dice (1-${maxDice}).`);
      return;
    }

    diceContainer.innerHTML = '';

    const diceElements = [];
    // Create new dice elements based on the input number
    for (let i = 0; i < numberOfDice; i++) {
      const dice = createDice(Math.floor(Math.random() * 6) + 1);
      diceContainer.appendChild(dice);
      diceElements.push(dice);
    }

    // Animate the dice roll
    const interval = setInterval(() => {
      diceElements.forEach(dice => {
        updateDice(dice, Math.floor(Math.random() * 6) + 1);
      });
    }, 50);

    // Stop the animation after 1 second
    setTimeout(() => clearInterval(interval), 1000);

    // Update the dice to final values after the animation
    setTimeout(() => {
      diceElements.forEach(dice => {
        updateDice(dice, Math.floor(Math.random() * 6) + 1);
      });
    }, 1000);
  });
});