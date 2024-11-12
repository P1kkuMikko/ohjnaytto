export class Timer {
  constructor(el) {
    this.el = el;
    this.timerList = this.el.querySelector(".timer-list");
    this.setTimerButton = this.el.querySelector(".set-timer");
    this.timerHoursInput = this.el.querySelector(".timer-hours");
    this.timerMinutesInput = this.el.querySelector(".timer-minutes");
    this.timerSecondsInput = this.el.querySelector(".timer-seconds");
    this.timerTitleInput = this.el.querySelector(".timer-title");
    this.timers = [];

    this.init();

    this.handleTimerListClick = this.handleTimerListClick.bind(this);
  }

  init() {
    this.loadTimers();
    setInterval(this.checkTimers.bind(this), 1000);
  }

  setTimer() {
    const hours = parseInt(this.timerHoursInput.value) || 0;
    const minutes = parseInt(this.timerMinutesInput.value) || 0;
    const seconds = parseInt(this.timerSecondsInput.value) || 0;
    const timerTitle = this.timerTitleInput.value || "Timer";
    const totalDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalDuration > 0) {
      const endTime = new Date(Date.now() + totalDuration).toISOString();
      this.timers.push({
        duration: totalDuration,
        initialDuration: totalDuration,
        title: timerTitle,
        endTime,
        remainingTime: totalDuration,
        active: true,
      });
      this.renderTimers();
      this.saveTimers();
    }
  }

  handleEvent(e) {
    const classList = e.target.classList;
    if (!classList) return;

    if (classList.contains("set-timer")) this.setTimer();
    else this.handleTimerListClick(e);
  }

  handleTimerListClick(e) {
    const target = e.target.closest("button, .toggle-timer");
    if (!target) return;

    const index = target.dataset.index;
    if (target.classList.contains("toggle-timer")) {
      this.toggleTimer(index);
    } else if (target.classList.contains("delete-timer")) {
      this.deleteTimer(index);
    }
  }

  toggleTimer(index) {
    if (this.timers[index].active) {
      this.timers[index].remainingTime = Math.max(0, new Date(this.timers[index].endTime) - new Date());
    } else {
      if (this.timers[index].remainingTime > 0) {
        this.timers[index].endTime = new Date(Date.now() + this.timers[index].remainingTime).toISOString();
      } else {
        this.timers[index].remainingTime = this.timers[index].initialDuration;
        this.timers[index].endTime = new Date(Date.now() + this.timers[index].initialDuration).toISOString();
      }
    }
    this.timers[index].active = !this.timers[index].active;
    this.renderTimers();
    this.saveTimers();
  }

  deleteTimer(index) {
    this.timers.splice(index, 1);
    this.renderTimers();
    this.saveTimers();
  }

  renderTimers() {
    this.timerList.innerHTML = this.timers
      .map((timer, index) => {
        let remainingTime;

        if (timer.active) {
          remainingTime = Math.max(0, new Date(timer.endTime) - new Date());
        } else {
          remainingTime = timer.remainingTime || timer.duration;
        }

        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        return `
            <li class="timer-item">
              <span class="timer-title">${timer.title}</span>
              ${hours}h ${minutes}m ${seconds}s
              <div class="toggle-timer ${timer.active ? "active" : ""}" data-index="${index}"></div>
              <button class="delete-timer" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            </li>
          `;
      })
      .join("");
  }

  saveTimers() {
    localStorage.setItem("timers", JSON.stringify(this.timers));
  }

  loadTimers() {
    const savedTimers = localStorage.getItem("timers");
    if (savedTimers) {
      this.timers = JSON.parse(savedTimers);
      this.renderTimers();
    }
  }

  checkTimers() {
    const now = new Date();
    this.timers.forEach((timer, index) => {
      if (timer.active) {
        if (new Date(timer.endTime) <= now) {
          this.showNotification(timer.title, `Timer is up!`);
          timer.active = false;
          timer.remainingTime = 0;
          this.renderTimers();
          this.saveTimers();
        }
      }
    });

    if (this.timers.some((timer) => timer.active)) {
      this.renderTimers();
    }
  }

  showNotification(title, body) {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  }
}
