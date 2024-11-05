document.addEventListener('DOMContentLoaded', () => {
    const timerList = document.getElementById('timer-list');
    const setTimerButton = document.getElementById('set-timer');
    const timerHoursInput = document.getElementById('timer-hours');
    const timerMinutesInput = document.getElementById('timer-minutes');
    const timerSecondsInput = document.getElementById('timer-seconds');
    const timerTitleInput = document.getElementById('timer-title');
    let timers = [];

    setTimerButton.addEventListener('click', () => {
        const hours = parseInt(timerHoursInput.value) || 0;
        const minutes = parseInt(timerMinutesInput.value) || 0;
        const seconds = parseInt(timerSecondsInput.value) || 0;
        const timerTitle = timerTitleInput.value || 'Timer';
        const totalDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;

        if (totalDuration > 0) {
            const endTime = new Date(Date.now() + totalDuration).toISOString();
            timers.push({
                duration: totalDuration,
                initialDuration: totalDuration, // Store the initial duration
                title: timerTitle,
                endTime,
                remainingTime: totalDuration,
                active: true
            });
            renderTimers();
            saveTimers();
        }
    });

    timerList.addEventListener('click', (e) => {
        const target = e.target.closest('button, .toggle-timer');
        if (!target) return;

        const index = target.dataset.index;
        if (target.classList.contains('toggle-timer')) {
            if (timers[index].active) {
                // Pausing the timer: store the current remaining time
                timers[index].remainingTime = Math.max(0, new Date(timers[index].endTime) - new Date());
            } else {
                // Resuming the timer:
                if (timers[index].remainingTime > 0) {
                    timers[index].endTime = new Date(Date.now() + timers[index].remainingTime).toISOString();
                } else {
                    // If the timer is expired, reset it using the initial duration
                    timers[index].remainingTime = timers[index].initialDuration;
                    timers[index].endTime = new Date(Date.now() + timers[index].initialDuration).toISOString();
                }
            }
            timers[index].active = !timers[index].active;
            renderTimers();
            saveTimers();
        } else if (target.classList.contains('delete-timer')) {
            timers.splice(index, 1);
            renderTimers();
            saveTimers();
        }
    });

    function renderTimers() {
        timerList.innerHTML = timers.map((timer, index) => {
            let remainingTime;

            if (timer.active) {
                // Calculate remaining time for active timers
                remainingTime = Math.max(0, new Date(timer.endTime) - new Date());
            } else {
                // Use stored remaining time for inactive timers
                remainingTime = timer.remainingTime || timer.duration;
            }

            const hours = Math.floor(remainingTime / 3600000);
            const minutes = Math.floor((remainingTime % 3600000) / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);

            return `
            <li class="timer-item">
                <span class="timer-title">${timer.title}</span>
                ${hours}h ${minutes}m ${seconds}s
                <div class="toggle-timer ${timer.active ? 'active' : ''}" data-index="${index}"></div>
                <button class="delete-timer" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            </li>
        `;
        }).join('');
    }

    function saveTimers() {
        localStorage.setItem('timers', JSON.stringify(timers));
    }

    function loadTimers() {
        const savedTimers = localStorage.getItem('timers');
        if (savedTimers) {
            timers = JSON.parse(savedTimers);
            renderTimers();
        }
    }

    function checkTimers() {
        const now = new Date();
        timers.forEach((timer, index) => {
            if (timer.active) {
                if (new Date(timer.endTime) <= now) {
                    showNotification(timer.title, `Timer is up!`);
                    timer.active = false;
                    timer.remainingTime = 0; // Clear remaining time when the timer completes
                    renderTimers();
                    saveTimers();
                }
            }
        });

        // Only update active timers to prevent unnecessary re-rendering
        if (timers.some(timer => timer.active)) {
            renderTimers();
        }
    }

    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, { body });
                }
            });
        }
    }

    loadTimers();
    setInterval(checkTimers, 1000);
});
