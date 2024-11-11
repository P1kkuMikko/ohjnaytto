export const widgetElements = {
  calc: `<div class="calc-input">
            <p name="user-input" class="userinput">0</p>
        </div>

        <div class="calc-keys">
            <button type="button" class="otherKeys operations">AC</button>
            <button type="button" class="otherKeys operations">DEL</button>
            <button type="button" class="otherKeys operations">%</button>
            <button type="button" class="operations">/</button>
            <button type="button" class="numbers">7</button>
            <button type="button" class="numbers">8</button>
            <button type="button" class="numbers">9</button>
            <button type="button" class="operations">*</button>
            <button type="button" class="numbers">4</button>
            <button type="button" class="numbers">5</button>
            <button type="button" class="numbers">6</button>
            <button type="button" class="operations">-</button>
            <button type="button" class="numbers">1</button>
            <button type="button" class="numbers">2</button>
            <button type="button" class="numbers">3</button>
            <button type="button" class="operations">+</button>
            <button type="button" class="key-zero numbers">0</button>
            <button type="button" class="numbers">.</button>
            <button type="button" class="operations">=</button>
        </div>`,
  clock: `<div class="clock"></div>
            <select class="timezone-selector">
            </select>`,
  weather: `<h1>Sää</h1>
        <input type="text" id="cityInput" placeholder="Syötä kaupungin nimi" />
        <button class="get-weather">Hae sää</button>
        <div id="weatherResult" class="weather-result"></div>`,
  notes: `<h1>Notes</h1>
      <div class="input-container">
        <input type="text" name="note-input" class="note-input" placeholder="Enter your note here" />
        <button class="add-note-button">Add Note</button>
      </div>
      <div class="formatting-buttons">
        <button class="bold-button"><b>B</b></button>
        <button class="italic-button"><i>I</i></button>
        <button class="underline-button"><u>U</u></button>
      </div>
      <div class="free-text-area" contenteditable="true" placeholder="Type freely here..."></div>
      <ul class="notes-list"></ul>`,
  coinflip: `<div class="stats">
            <div class="counter-container">
                <img src="images/coinflip/heads.png" alt="Heads Icon">
                <p class="heads-count">Heads: 0</p>
            </div>
            <div class="counter-container">
                <img src="images/coinflip/tails.png" alt="Tails Icon">
                <p class="tails-count">Tails: 0</p>
            </div>
        </div>
        <div class="coin">
            <div class="heads">
                <img src="images/coinflip/heads.png" alt="Heads">
            </div>
            <div class="tails">
                <img src="images/coinflip/tails.png" alt="Tails">
            </div>
        </div>
        <div class="buttons">
            <button class="flip-button">
                Flip Coin
            </button>
            <button class="reset-button">
                Reset
            </button>
        </div>`,
};
