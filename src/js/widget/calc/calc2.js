const inputValue = document.getElementById("userinput");

const calculate = document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        let LastValue = inputValue.innerText.substring(inputValue.innerText.length, inputValue.innerText.length - 1);

        if (e.target.innerText === "=") {
            if (!isNaN(LastValue)) {
                let result = eval(inputValue.innerText.replace(/%/g, '/100*'));
                inputValue.innerText = parseFloat(result.toFixed(7));
            }
        } else if (e.target.innerText === "AC") {
            inputValue.innerText = "0";
        } else if (e.target.innerText === "DEL") {
            inputValue.innerText = inputValue.innerText.substring(0, inputValue.innerText.length - 1);

            if (inputValue.innerText.length === 0) {
                inputValue.innerText = "0";
            }
        } else if (e.target.innerText === "%") {
            if (!isNaN(LastValue)) {
                inputValue.innerText += "%";
            }
        } else {
            if (!isNaN(LastValue)) {
                inputValue.innerText += e.target.innerText;
            }
        }
    });
});

const number = document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        if (inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerText.trim();
    });
});