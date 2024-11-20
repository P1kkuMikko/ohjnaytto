// Initialize heads and tails count from localStorage
let heads = localStorage.getItem("heads") ? parseInt(localStorage.getItem("heads")) : 0;
let tails = localStorage.getItem("tails") ? parseInt(localStorage.getItem("tails")) : 0;
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

// Update the stats on page load
document.addEventListener("DOMContentLoaded", updateStats);

// Add event listener for the flip button
flipBtn.addEventListener("click", () => {
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = "none";
    if(i){
        setTimeout(function(){
            coin.style.animation = "spin-heads 3s forwards";
        }, 100);
        heads++;
        localStorage.setItem("heads", heads);
    }
    else{
        setTimeout(function(){
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
        tails++;
        localStorage.setItem("tails", tails);
    }
    setTimeout(updateStats, 3000);
    disableButton();
});

// Update the stats display
function updateStats(){
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

// Disable the flip button for 3 seconds
function disableButton(){
    flipBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
    },3000);
}

// Add event listener for the reset button
resetBtn.addEventListener("click",() => {
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    localStorage.setItem("heads", heads);
    localStorage.setItem("tails", tails);
    updateStats();
});