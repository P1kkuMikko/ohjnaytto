document.addEventListener('DOMContentLoaded', () => {
    const alarmList = document.getElementById('alarm-list');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmTitleInput = document.getElementById('alarm-title');
    let alarms = [];

    // Request notification permission if not already granted
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert('Please enable notifications to use the alarm feature.');
            }
        });
    }

    // Add event listener to set alarm button
    setAlarmButton.addEventListener('click', () => {
        const alarmTime = alarmTimeInput.value;
        const alarmTitle = alarmTitleInput.value || 'Alarm';
        if (alarmTime) {
            alarms.push({ time: alarmTime, title: alarmTitle, active: true });
            renderAlarms();
            saveAlarms();
        }
    });

    // Add event listener to alarm list for toggling and deleting alarms
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

    // Render the list of alarms
    function renderAlarms() {
        alarmList.innerHTML = alarms.map((alarm, index) => `
            <li class="alarm-item">
                <span class="alarm-title">${alarm.title}</span>
                ${alarm.time} 
                <div class="toggle-alarm ${alarm.active ? 'active' : ''}" data-index="${index}"></div>
                <button class="delete-alarm" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            </li>
        `).join('');
    }

    // Save alarms to localStorage
    function saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }

    // Load alarms from localStorage
    function loadAlarms() {
        const savedAlarms = localStorage.getItem('alarms');
        if (savedAlarms) {
            alarms = JSON.parse(savedAlarms);
            renderAlarms();
        }
    }

    // Check if any alarm should be triggered
    function checkAlarms() {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        console.log(`Current time: ${currentTime}`);
        alarms.forEach(alarm => {
            console.log(`Checking alarm: ${alarm.title} at ${alarm.time}, active: ${alarm.active}`);
            if (alarm.active && alarm.time === currentTime) {
                console.log(`Triggering alarm: ${alarm.title}`);
                showNotification(alarm.title, `It's ${alarm.time}!`);
                alarm.active = false;
                renderAlarms();
                saveAlarms();
            }
        });
    }

    // Show notification for the alarm
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
    setInterval(checkAlarms, 1000);
});