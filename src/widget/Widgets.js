export class Calculator {
  constructor() {
    this.inputValue = document.getElementById("userinput");
    this.operationListeners = [];
    this.numberListeners = [];
    this.initialize();
  }

  initialize() {
    this.addOperationListeners();
    this.addNumberListeners();
  }

  addOperationListeners() {
    document.querySelectorAll(".operations").forEach((item) => {
      const listener = (e) => this.handleOperation(e);
      item.addEventListener("click", listener);
      this.operationListeners.push({ item, listener });
    });
  }

  addNumberListeners() {
    document.querySelectorAll(".numbers").forEach((item) => {
      const listener = (e) => this.handleNumber(e);
      item.addEventListener("click", listener);
      this.numberListeners.push({ item, listener });
    });
  }

  handleOperation(e) {
    const lastValue = this.inputValue.innerText.slice(-1);

    switch (e.target.innerText) {
      case "=":
        if (!isNaN(lastValue)) {
          const result = eval(this.inputValue.innerText.replace(/%/g, "/100*"));
          this.inputValue.innerText = parseFloat(result.toFixed(7));
        }
        break;
      case "AC":
        this.inputValue.innerText = "0";
        break;
      case "DEL":
        this.inputValue.innerText = this.inputValue.innerText.slice(0, -1);
        if (this.inputValue.innerText.length === 0) {
          this.inputValue.innerText = "0";
        }
        break;
      case "%":
        if (!isNaN(lastValue)) {
          this.inputValue.innerText += "%";
        }
        break;
      default:
        if (!isNaN(lastValue)) {
          this.inputValue.innerText += e.target.innerText;
        }
        break;
    }
  }

  handleNumber(e) {
    if (this.inputValue.innerText === "0") {
      this.inputValue.innerText = "";
    }
    this.inputValue.innerText += e.target.innerText.trim();
  }

  destroy() {
    this.operationListeners.forEach(({ item, listener }) => {
      item.removeEventListener("click", listener);
    });
    this.numberListeners.forEach(({ item, listener }) => {
      item.removeEventListener("click", listener);
    });
  }
}

// Initialize the calculator
const calculator = new Calculator();

// calculator.destroy();
