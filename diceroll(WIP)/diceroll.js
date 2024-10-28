function createDice(number) {
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

function updateDice(dice, number) {
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

  dice.innerHTML = '';
  for (const dotPosition of dotPositionMatrix[number]) {
    const dot = document.createElement("div");
    dot.classList.add("dice-dot");
    dot.style.setProperty("--top", dotPosition[0] + "%");
    dot.style.setProperty("--left", dotPosition[1] + "%");
    dice.appendChild(dot);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const rollButton = document.querySelector('.btn-roll-dice');
  rollButton.addEventListener('click', function () {
    const numberOfDiceInput = document.getElementById('number-of-dice');
    const numberOfDice = parseInt(numberOfDiceInput.value, 10);
    const maxDice = parseInt(numberOfDiceInput.max, 10);

    if (isNaN(numberOfDice) || numberOfDice < 1 || numberOfDice > maxDice) {
      alert(`Please enter a valid number of dice (1-${maxDice}).`);
      return;
    }

    // Clear the dice container
    const diceContainer = document.querySelector('.dice-container');
    diceContainer.innerHTML = '';

    // Create initial dice elements
    const diceElements = [];
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

    setTimeout(() => clearInterval(interval), 1000);

    setTimeout(() => {
      diceElements.forEach(dice => {
        updateDice(dice, Math.floor(Math.random() * 6) + 1);
      });
    }, 1000);
  });
});