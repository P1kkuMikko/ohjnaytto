export const clock = {
    init() {
        this.clockEl = document.querySelector(".clock");

        for (let i = 1; i < 60; i++) {
            const dialLine = document.createElement("div");
            dialLine.className = "diallines";
            dialLine.style.transform = "rotate(" + 6 * i + "deg)";
            this.clockEl.appendChild(dialLine);
        }
    },
    update() {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            d = new Date(),
            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds(),
            date = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear(),
            hDeg = h * 30 + m * (360 / 720),
            mDeg = m * 6 + s * (360 / 3600),
            sDeg = s * 6,
            hEl = document.querySelector(".hour-hand"),
            mEl = document.querySelector(".minute-hand"),
            sEl = document.querySelector(".second-hand"),
            dateEl = document.querySelector(".date"),
            dayEl = document.querySelector(".day");

        const day = weekday[d.getDay()];

        if (month < 10) {
            month = "0" + month;
        }

        hEl.style.transform = "rotate(" + hDeg + "deg)";
        mEl.style.transform = "rotate(" + mDeg + "deg)";
        sEl.style.transform = "rotate(" + sDeg + "deg)";
        dateEl.innerHTML = date + "/" + month + "/" + year;
        dayEl.innerHTML = day;
    },
};

// function clock() {
//     const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//         d = new Date(),
//         h = d.getHours(),
//         m = d.getMinutes(),
//         s = d.getSeconds(),
//         date = d.getDate(),
//         month = d.getMonth() + 1,
//         year = d.getFullYear(),
//         hDeg = h * 30 + m * (360 / 720),
//         mDeg = m * 6 + s * (360 / 3600),
//         sDeg = s * 6,
//         hEl = document.querySelector(".hour-hand"),
//         mEl = document.querySelector(".minute-hand"),
//         sEl = document.querySelector(".second-hand"),
//         dateEl = document.querySelector(".date"),
//         dayEl = document.querySelector(".day");

//     const day = weekday[d.getDay()];

//     if (month < 10) {
//         month = "0" + month;
//     }

//     hEl.style.transform = "rotate(" + hDeg + "deg)";
//     mEl.style.transform = "rotate(" + mDeg + "deg)";
//     sEl.style.transform = "rotate(" + sDeg + "deg)";
//     dateEl.innerHTML = date + "/" + month + "/" + year;
//     dayEl.innerHTML = day;
// }

// setInterval(clock, 1000);
// clock(); // Initial call to set the clock immediately

// // Request notification permission
// if (Notification.permission !== "granted" && Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//             showNotification("Notifications enabled", "You will receive notifications for timer and alarm.");
//         }
//     });
// }

// function showNotification(title, body) {
//     if (Notification.permission === "granted") {
//         new Notification(title, { body });
//     }
// }

// // Timer functionality
// let timerInterval;
// const timerDisplay = document.getElementById("timer-display");
// document.getElementById("start-timer").addEventListener("click", function () {
//     const hours = parseInt(document.getElementById("timer-hours").value) || 0;
//     const minutes = parseInt(document.getElementById("timer-minutes").value) || 0;
//     const seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
//     let totalSeconds = hours * 3600 + minutes * 60 + seconds;

//     timerInterval = setInterval(function () {
//         if (totalSeconds <= 0) {
//             clearInterval(timerInterval);
//             showNotification("Timer", "Timer finished!");
//             timerDisplay.classList.add("active"); // Add active class
//         } else {
//             totalSeconds--;
//             const h = Math.floor(totalSeconds / 3600);
//             const m = Math.floor((totalSeconds % 3600) / 60);
//             const s = totalSeconds % 60;
//             timerDisplay.textContent = `${h}:${m}:${s}`;
//         }
//     }, 1000);
// });

// document.getElementById("stop-timer").addEventListener("click", function () {
//     clearInterval(timerInterval);
//     timerDisplay.classList.remove("active"); // Remove active class
// });

// // Alarm functionality
// let alarmSet = false;
// document.getElementById("set-alarm").addEventListener("click", function () {
//     const alarmTime = document.getElementById("alarm-time").value;
//     const alarmDisplay = document.getElementById("alarm-display");
//     alarmDisplay.textContent = `Alarm set for ${alarmTime}`;
//     alarmSet = true; // Set alarm as active
// });

// setInterval(function () {
//     if (alarmSet) {
//         const currentTime = new Date();
//         const currentHours = currentTime.getHours().toString().padStart(2, "0");
//         const currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
//         const currentTimeString = `${currentHours}:${currentMinutes}`;

//         const alarmTime = document.getElementById("alarm-time").value;

//         // Check if current time matches alarm time (without seconds)
//         if (currentTimeString === alarmTime) {
//             alarmSet = false; // Reset alarm status to avoid multiple notifications
//             showNotification("Alarm", "Alarm ringing!");
//             document.getElementById("alarm-display").classList.add("active"); // Add active class
//         }
//     }
// }, 1000);
