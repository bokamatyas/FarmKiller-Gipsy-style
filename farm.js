const gridContainer = document.querySelector(".grid-container");
const containsDice = document.querySelector(".contains-dice");
const containsButtons = document.querySelector(".contains-buttons");
const diceImg = document.querySelector(".dice-img");
const btn2player = document.querySelector("#btn2player");
const btn3player = document.querySelector("#btn3player");
const btn4player = document.querySelector("#btn4player");
const charactersWrap = document.querySelector(".characters-wrap");
const winner = document.querySelector(".winner");

// minigame:Janken
const jankenGame = document.querySelector("#janken");
const buttonRock = document.querySelector("#rock-button");
const buttonPaper = document.querySelector("#paper-button");
const buttonScissors = document.querySelector("#scissors-button");
const acknowledgeJanken = document.querySelector("#ok");

//minigame:Norina
const norinaGame = document.querySelector("#norina");
const acknowledgeNorina = document.querySelector("#ok2");

const current = document.querySelector("#current");
const rassWrap = document.querySelector(".rass-wrap");

let rowNumber = 10;
let columnNumber = 12;
let currentPlayer = 1;
let amountOfPlayers;

let minigamePlayer = 0;

let surprisePositions = ["18", "29", "46", "51"];
let track = [
  [0, 0, 0, 63, 62, 61, 60, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 59, 0, 5, 4, 3, 2],
  [0, 0, 0, 0, 56, 57, 58, 0, 6, 0, 0, 0],
  [51, 52, 53, 54, 55, 0, 0, 0, 7, 8, 9, 10],
  [50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
  [49, 48, 47, 46, 0, 18, 17, 16, 15, 14, 13, 12],
  [0, 0, 0, 45, 0, 19, 0, 0, 0, 0, 0, 0],
  [41, 42, 43, 44, 0, 20, 21, 22, 23, 24, 25, 26],
  [40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27],
  [39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28],
];

class Player {
  constructor(className, nextPosition, kepUrlBelseje) {
    this.nextPosition = nextPosition;
    this.player = document.createElement("div");
    this.player.className = className;
    this.player.style.content = `url(${kepUrlBelseje})`;
  }
}

let p1 = new Player("player1", 1, "img/feher/ember1.png");
let p2 = new Player("player2", 1, "img/feher/ember2.png");
let p3 = new Player("player3", 1, "img/feher/ember3.png");
let p4 = new Player("player4", 1, "img/feher/ember4.png");

let playerCollection = [p1, p2, p3, p4];

function createGrid() {
  let div;
  let gridRow;
  for (let row = 0; row < rowNumber; row++) {
    gridRow = document.createElement("div");
    gridRow.className = "grid-row";
    for (let column = 0; column < columnNumber; column++) {
      div = document.createElement("div");
      div.style.width = "100px";
      div.style.height = "100px";

      //   console.log(track[row][column]);

      if (track[row][column] == 0) {
        div.className = "wall";
      }

      if (surprisePositions.includes(String(track[row][column]))) {
        div.className = "surprise";
        div.dataset.id = track[row][column];
      } else {
        div.className = "cell";
        div.dataset.id = track[row][column]; // data-id=""
      }

      gridRow.append(div);
    }
    gridContainer.append(gridRow);
  }
}

function movePlayer(player) {
  let trackPositions = document.querySelectorAll("[data-id]");
  let position = Array.from(trackPositions).find(
    (x) => x.dataset.id == player.nextPosition
  );
  position.append(player.player);
}

function mehetE(step, jatekos) {
  if (jatekos.nextPosition + step <= 63) {
    // jatekos.nextPosition += step;
    // teszthez
    jatekos.nextPosition += 14;

    let pos = jatekos.nextPosition;

    switch (pos) {
      case 18:
        //Janken
        acknowledgeJanken.disabled = true;
        jankenGame.className = "minigame";
        diceImg.disabled = true;
        buttonRock.addEventListener("click", MiniGameWriter);
        buttonPaper.addEventListener("click", MiniGameWriter);
        buttonScissors.addEventListener("click", MiniGameWriter);
        break;
      case 29:
        //Norina
        diceImg.disabled = true;
        norinaGame.className = "norina";
        mehetE(-8, playerCollection[currentPlayer - 1]);
        acknowledgeNorina.addEventListener("click", AcknowledgeNorina);
        break;
    }

    movePlayer(jatekos);
    if (jatekos.nextPosition == 63) {
      winner.innerHTML = `${currentPlayer}. játékos a győztes`;
      image = document.createElement("img");
      image.src = `img/Dice/winner.jpg`;
      winner.append(image);
      containsDice.innerHTML = "";
    } else {
      let background = "url(" + `img/Dice/dice${step}.png` + ")";
      if (step < 0)
        background = "url(" + `img/Dice/dice${String(step)[1]}.png` + ")";
      diceImg.style.backgroundImage = background;
    }
  }
}

function MiniGameWriter() {
  let gaymer = gameWinner;
  console.log(currentPlayer);
  if (gaymer.miniGameWinner == "player") {
    acknowledgeJanken.disabled = false;
    if (currentPlayer - 2 < 0) {
      mehetE(-5, playerCollection[amountOfPlayers - 1]);
    } else {
      mehetE(-5, playerCollection[currentPlayer - 2]);
    }
    acknowledgeJanken.addEventListener("click", AcknowledgeJanken);
    acknowledgeJanken.addEventListener("click", continueGame);
  }
  if (gaymer.miniGameWinner == "bot") {
    acknowledgeJanken.disabled = false;
    if (currentPlayer - 2 < 0) {
      mehetE(-5, playerCollection[amountOfPlayers - 1]);
    } else {
      mehetE(-5, playerCollection[currentPlayer - 2]);
    }
    acknowledgeJanken.addEventListener("click", AcknowledgeJanken);
    acknowledgeJanken.addEventListener("click", continueGame);
  }
}

function AcknowledgeJanken() {
  jankenGame.className = "minigameOFF";
  diceImg.disabled = false;
}

function AcknowledgeNorina() {
  norinaGame.className = "minigameOFF";
  diceImg.disabled = false;
}

function nextPlayer() {
  let step = Math.ceil(Math.random() * 6); // 1-6
  current.innerHTML = `${currentPlayer}. játékos`;
  if (currentPlayer == 1) {
    mehetE(step, p1);
  }
  if (currentPlayer == 2) {
    mehetE(step, p2);
  }
  if (currentPlayer == 3) {
    mehetE(step, p3);
  }
  if (currentPlayer == 4) {
    mehetE(step, p4);
  }
  currentPlayer++;
  minigamePlayer++;
  if (currentPlayer > amountOfPlayers) {
    currentPlayer = 1;
  }
  current.innerHTML = `${currentPlayer}. játékos`;
}

function mutatFeherKarakterek() {
  charactersWrap.innerHTML = "";
  charactersWrap.style.marginBottom = "300px";
  for (let index = 1; index <= 4; index++) {
    image = document.createElement("img");
    image.src = `img/feher/ember${index}.png`;
    image.className = "characterImage";
    image.addEventListener("click", selectedPlayer);
    charactersWrap.append(image);
  }
}

function mutatFeketeKarakterek() {
  charactersWrap.innerHTML = "";
  charactersWrap.style.marginBottom = "300px";
  for (let index = 1; index <= 4; index++) {
    image = document.createElement("img");
    image.src = `img/cigany/blackguy${index}.png`;
    image.className = "characterImage";
    image.addEventListener("click", selectedPlayer);
    charactersWrap.append(image);
  }
}

function createButtonsToSelectRass() {
  charactersWrap.innerHTML = "";
  charactersWrap.style.display = "block";
  let btnFeher = document.createElement("button");
  btnFeher.className = "feherekGomb";
  btnFeher.innerHTML = "Feher karakterek";
  let btnFekete = document.createElement("button");
  btnFekete.className = "feketekGomb";
  btnFekete.innerHTML = "Cigány karakterek";
  rassWrap.append(btnFeher);
  rassWrap.append(btnFekete);
  btnFeher.addEventListener("click", mutatFeherKarakterek);
  btnFekete.addEventListener("click", mutatFeketeKarakterek);
}

function selectedPlayer() {
  let image = "url(" + `${this.src}` + ")";
  playerCollection[currentPlayer - 1].player.style.content = image;
  movePlayer(playerCollection[currentPlayer - 1]);
  currentPlayer++;
  current.innerHTML = `${currentPlayer}. játékos`;
  if (currentPlayer > amountOfPlayers) {
    currentPlayer = 1;
    current.innerHTML = `${currentPlayer}. játékos`;
    charactersWrap.innerHTML = "";
    charactersWrap.style.display = "none";
    diceImg.disabled = false;
    diceImg.style.backgroundColor = "none";
    rassWrap.innerHTML = "";
  }
}

function createPlayerSeletionFor2() {
  amountOfPlayers = 2;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
}

function createPlayerSeletionFor3() {
  amountOfPlayers = 3;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
  //movePlayer(p3);
}

function createPlayerSeletionFor4() {
  amountOfPlayers = 4;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
  //movePlayer(p3);
  //movePlayer(p4);
}

diceImg.addEventListener("click", nextPlayer);
createGrid();
btn2player.addEventListener("click", createPlayerSeletionFor2);
btn3player.addEventListener("click", createPlayerSeletionFor3);
btn4player.addEventListener("click", createPlayerSeletionFor4);
