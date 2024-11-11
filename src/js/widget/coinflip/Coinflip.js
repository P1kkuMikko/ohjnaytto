export class CoinFlip {
  constructor(el) {
    this.el = el;
    this.heads = localStorage.getItem("heads") ? parseInt(localStorage.getItem("heads")) : 0;
    this.tails = localStorage.getItem("tails") ? parseInt(localStorage.getItem("tails")) : 0;
    this.coin = this.el.querySelector(".coin");
    this.flipBtn = this.el.querySelector(".flip-button");
    this.resetBtn = this.el.querySelector(".reset-button");

    this.updateStats = this.updateStats.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.flipCoin = this.flipCoin.bind(this);
    this.resetStats = this.resetStats.bind(this);

    document.addEventListener("DOMContentLoaded", this.updateStats);
  }

  handleEvent(e) {
    const classList = e.target.classList;
    if (!classList) return;

    switch (true) {
      case classList.contains("flip-button"):
        this.flipCoin();
        break;
      case classList.contains("reset-button"):
        this.resetStats();
        break;
    }
  }

  updateStats() {
    this.el.querySelector(".heads-count").textContent = `Heads: ${this.heads}`;
    this.el.querySelector(".tails-count").textContent = `Tails: ${this.tails}`;
  }

  disableButton() {
    this.flipBtn.disabled = true;
    setTimeout(() => {
      this.flipBtn.disabled = false;
    }, 3000);
  }

  flipCoin() {
    let i = Math.floor(Math.random() * 2);
    this.coin.style.animation = "none";
    if (i) {
      setTimeout(() => {
        this.coin.style.animation = "spin-heads 3s forwards";
      }, 100);
      this.heads++;
      localStorage.setItem("heads", this.heads);
    } else {
      setTimeout(() => {
        this.coin.style.animation = "spin-tails 3s forwards";
      }, 100);
      this.tails++;
      localStorage.setItem("tails", this.tails);
    }
    setTimeout(this.updateStats, 3000);
    this.disableButton();
  }

  resetStats() {
    this.coin.style.animation = "none";
    this.heads = 0;
    this.tails = 0;
    localStorage.setItem("heads", this.heads);
    localStorage.setItem("tails", this.tails);
    this.updateStats();
  }
}
