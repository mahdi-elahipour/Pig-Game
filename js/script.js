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
let BASE_URL="./../images/";
const dice = [
    "dice-six-faces-one.svg",
    "dice-six-faces-two.svg",
    "dice-six-faces-three.svg",
    "dice-six-faces-four.svg",
    "dice-six-faces-five.svg",
    "dice-six-faces-six.svg"
]
rollDice.addEventListener("mouseup", (e) => {
    e.preventDefault;
    upEffectHandler(e.target);
    newNumber = generateNumber()
    diceImg.setAttribute("src", `${BASE_URL}${dice[newNumber]}`);
    diceImg.setAttribute("alt", `face_${newNumber+1}`);
    turns++;
    if (turns <= numOfDice) {

        currentTotalCalculator();
    }
    else if (turns >= numOfDice && turns <= numOfDice * 2) {

        currentTotalCalculator("p2CurrentTotal");

    }
    if (turns > numOfDice * 2) {
        turns = 0;
        if (p1CurrentTotal !== p2CurrentTotal) {
            if (p1CurrentTotal > p2CurrentTotal) {
                p1totalScore++;
            }
            else {
                p2totalScore++;
            }
        }
        resetUserData();
    }
})
rollDice.addEventListener("mousedown",(e)=>{
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
newGame.addEventListener("mouseup", (e)=>{
    upEffectHandler(e.target)
    resetUserData("newGame");

})


function resetUserData(newGame) {
    if (newGame === "newGame") {
        p1totalScore = 0;
        p2totalScore = 0;
        diceImg.setAttribute("src", "");
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
    currentTotal === "p2CurrentTotal" ? p2CurrentTotal += newNumber + 1 : p1CurrentTotal += newNumber + 1;
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
    randomNumber = Math.floor(Math.random() * 6);
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