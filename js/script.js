"use strict"
const newGame = document.querySelector("#new_game");
const diceImg = document.querySelector("#dice_image");
const rollDice = document.querySelector("#roll_dice");
const hold = document.querySelector("#hold");
const p1ScoreDisplay = document.querySelector(".player1 .score h1:nth-child(2)");
const p2ScoreDisplay = document.querySelector(".player2 .score h1:nth-child(2)");
let p1totalScore = 0;
let p2totalScore = 0;
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
let p1CurrentScore = document.querySelector(".player1 .currentScore");
let p2CurrentScore = document.querySelector(".player2 .currentScore");
let p1CurrentTotal = 0;
let p2CurrentTotal = 0;
let turns = 0;
let numOfDice = 6;
let newNumber;
let BASE_URL = "../images/";

rollDice.addEventListener("mouseup", (e) => {
    e.preventDefault;
    upEffectHandler(e.target);
    newNumber = generateNumber();
    console.log(newNumber);
    diceImg.style.background = `url(${BASE_URL}${newNumber}.svg)`;
    turns++;
    if (turns <= numOfDice) {

        currentTotalCalculator();
    }
    else if (turns >= numOfDice && turns <= numOfDice * 2) {

        currentTotalCalculator("p2CurrentTotal");

    }
    if (turns > numOfDice * 2) {
        turns = 0;

        p1totalScore += p1CurrentTotal;

        p2totalScore += p2CurrentTotal;

        p1totalScore > 100 && p1totalScore > p2totalScore && resetUserData("newGame", "player 1");
        p2totalScore > 100 && p2totalScore > p1totalScore && resetUserData("newGame", "player 2");

        resetUserData();
    }
})
rollDice.addEventListener("mousedown", (e) => {
    downEffectHandler(e.target);
})
hold.addEventListener("mouseup", (e) => {
    e.preventDefault;
    numOfDice = turns;
    upEffectHandler(e.target);

})
hold.addEventListener("mousedown", (e) => {
    downEffectHandler(e.target);
})
newGame.addEventListener("mousedown", (e) => {

    downEffectHandler(e.target);
})
newGame.addEventListener("mouseup", (e) => {
    upEffectHandler(e.target)
    resetUserData("newGame");

})


function resetUserData(newGame, winner) {
    if (newGame === "newGame") {
        p1totalScore = 0;
        p2totalScore = 0;
        diceImg.setAttribute("src", "");
    }
    if (winner) {
        alert(`winner is ${winner}`);
    }
    player1.classList.add("highlight");
    player2.classList.remove("highlight");
    p1ScoreDisplay.innerText = p1totalScore;
    p2ScoreDisplay.innerText = p2totalScore;
    p1CurrentTotal = 0;
    p2CurrentTotal = 0;
    p1CurrentScore.innerText = 0;
    p2CurrentScore.innerText = 0;
    numOfDice = 6;
}


function currentTotalCalculator(currentTotal) {
    currentTotal === "p2CurrentTotal" ? p2CurrentTotal += newNumber : p1CurrentTotal += newNumber;
    p1CurrentScore.innerText = p1CurrentTotal;
    p2CurrentScore.innerText = p2CurrentTotal;
    if (currentTotal === "p2CurrentTotal") {
        player1.classList.remove("highlight");
        player2.classList.add("highlight");
        hold.classList.add("hidden");

    } else {
        player1.classList.add("highlight");
        player2.classList.remove("highlight");
        hold.classList.remove("hidden");

    }

}

function generateNumber() {
    let randomNumber;
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    return randomNumber;
}


function upEffectHandler(btn) {
    btn.classList.remove("downEffect");
    btn.classList.add("upEffect");
}
function downEffectHandler(btn) {
    btn.classList.add("downEffect");
    btn.classList.remove("upEffect");
}