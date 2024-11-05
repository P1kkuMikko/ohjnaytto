document.addEventListener('DOMContentLoaded', () => {
    const alarmList = document.getElementById('alarm-list');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmTimeInput = document.getElementById('alarm-time');
    let alarms = [];

    setAlarmButton.addEventListener('click', () => {
        const alarmTime = alarmTimeInput.value;
        if (alarmTime) {
            alarms.push({ time: alarmTime, active: true });
            renderAlarms();
            saveAlarms();
        }
    });

    alarmList.addEventListener('click', (e) => {
        const target = e.target.closest('button, .toggle-alarm');
        if (!target) return;

        const index = target.dataset.index;
        if (target.classList.contains('toggle-alarm')) {
            alarms[index].active = !alarms[index].active;
            renderAlarms();
            saveAlarms();
        } else if (target.classList.contains('delete-alarm')) {
            alarms.splice(index, 1);
            renderAlarms();
            saveAlarms();
        }
    });

    function renderAlarms() {
        alarmList.innerHTML = alarms.map((alarm, index) => `
            <li class="alarm-item">
                ${alarm.time} 
                <div class="toggle-alarm ${alarm.active ? 'active' : ''}" data-index="${index}"></div>
                <button class="delete-alarm" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            </li>
        `).join('');
    }

    function saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }

    function loadAlarms() {
        const savedAlarms = localStorage.getItem('alarms');
        if (savedAlarms) {
            alarms = JSON.parse(savedAlarms);
            renderAlarms();
        }
    }

    function checkAlarms() {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        alarms.forEach(alarm => {
            if (alarm.active && alarm.time === currentTime) {
                showNotification('Alarm', `It's ${alarm.time}!`);
                alarm.active = false; // Disable the alarm after it goes off
                renderAlarms();
                saveAlarms();
            }
        });
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

    loadAlarms();
    setInterval(checkAlarms, 60000); // Check alarms every minute
});