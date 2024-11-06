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
    clock: `<div class="clock">
                <div>
                    <div class="info date"></div>
                    <div class="info day"></div>
                </div>
                <div class="dot"></div>
                <div>
                    <div class="hour-hand"></div>
                    <div class="minute-hand"></div>
                    <div class="second-hand"></div>
                </div>
                <div>
                    <span class="hour3">3</span>
                    <span class="hour6">6</span>
                    <span class="hour9">9</span>
                    <span class="hour12">12</span>
                </div>
                <div class="diallines"></div>`,
    countdown: `
            <div class="timer">
                <input type="number" id="timer-hours" placeholder="Hours">
                <input type="number" id="timer-minutes" placeholder="Minutes">
                <input type="number" id="timer-seconds" placeholder="Seconds">
                <button id="start-timer">Start Timer</button>
                <button id="stop-timer">Stop Timer</button>
                <div id="timer-display"></div>
            </div>`,
    alarm: `<div class="alarm">
                <input type="time" id="alarm-time">
                <button id="set-alarm">Set Alarm</button>
                <div id="alarm-display"></div>
            </div>`,
};
