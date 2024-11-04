export const logicCalc = {
  handleEvent(e, gridItem) {
    const inputValue = gridItem.querySelector(".userinput");
    if (e.target.classList.contains("numbers")) this.handleNumber(e, inputValue);
    else if (e.target.classList.contains("operations")) this.handleOperation(e, inputValue);
  },
  handleOperation(e, inputValue) {
    const lastValue = inputValue.innerText.slice(-1);

    switch (e.target.innerText) {
      case "=":
        if (!isNaN(lastValue)) {
          const result = eval(inputValue.innerText.replace(/%/g, "/100*"));
          inputValue.innerText = parseFloat(result.toFixed(7));
        }
        break;
      case "AC":
        inputValue.innerText = "0";
        break;
      case "DEL":
        this.inputValue.innerText = inputValue.innerText.slice(0, -1);
        if (this.inputValue.innerText.length === 0) {
          this.inputValue.innerText = "0";
        }
        break;
      case "%":
        if (!isNaN(lastValue)) {
          inputValue.innerText += "%";
        }
        break;
      default:
        if (!isNaN(lastValue)) {
          inputValue.innerText += e.target.innerText;
        }
        break;
    }
  },
  handleNumber(e, inputValue) {
    if (inputValue.innerText === "0") {
      inputValue.innerText = "";
    }
    inputValue.innerText += e.target.innerText.trim();
  },
};
