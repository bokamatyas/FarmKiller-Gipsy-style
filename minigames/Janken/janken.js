const field = document.querySelector(".field");
const result = document.querySelector(".result");
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");

let hands = [0, "rock", "paper", "scissors"]; //1 -> rock ; 2 -> paper; 3 -> scissors
let winConditions = ["rockscissors", "paperrock", "scissorspaper"];

//methods

class Winner {
  constructor(miniGameWinner) {
    this.miniGameWinner = miniGameWinner;
  }
}

let gameWinner = new Winner("none");

function botPlays(playerPick) {
  field.innerHTML = "";
  result.innerHTML = "";
  let botPick = Math.ceil(Math.random() * 3);
  let pick = hands[botPick];

  console.log("----");
  console.log(playerPick);
  console.log(pick);
  console.log("----");

  let image = document.createElement("img");
  image.src = "minigames/Janken/" + botPick + ".png";
  field.append(image);
  if (playerPick != pick) {
    checkResults(playerPick, pick);
  } else {
    result.innerHTML = "draw";
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    continueGame();
  }
}

function checkResults(PP, BP) {
  console.log(PP);
  console.log(BP);
  if (winConditions.includes(PP + BP) == true) {
    result.innerHTML = "player wins";
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    gameWinner.miniGameWinner = "player";
  }
  if (winConditions.includes(PP + BP) == false) {
    result.innerHTML = "bot wins";
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    gameWinner.miniGameWinner = "bot";
  }
}

function continueGame() {
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
  gameWinner.miniGameWinner = "none";
}

function playRock() {
  botPlays("rock");
}
function playPaper() {
  botPlays("paper");
}
function playScissors() {
  botPlays("scissors");
}

// main

rockButton.addEventListener("click", playRock);
paperButton.addEventListener("click", playPaper);
scissorsButton.addEventListener("click", playScissors);
