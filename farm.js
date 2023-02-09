//DONE Megcsinalni minigameben h gomb lenyomasa utan ugorjon
//??? Jatekos valasztas elott ne lehessen dobni
//munkaban Design tervezese
//TODO Tictactoe megcsinalasa
//TODO Animacio rakasa ugraskor A jatekosokra
//TODO OLIVERT BESZOPATNI VMI LEHETETLEN DOLOGGAL MÁSODZSOR IS
//! HA ZALAN BASZAKSZIK ALLKAPOCS
//! CIGISZUNET FELTETLEN KIHAGYHATATLAN

const gridContainer = document.querySelector(".grid-container");
const containsDice = document.querySelector(".contains-dice");
const containsButtons = document.querySelector(".contains-buttons");
const diceImg = document.querySelector(".dice-img");
const diceOFF = document.querySelector(".OFF");
const btn2player = document.querySelector("#btn2player");
const btn3player = document.querySelector("#btn3player");
const btn4player = document.querySelector("#btn4player");
const charactersWrap = document.querySelector(".characters-wrap");
const winner = document.querySelector("#winner");

// minigame:Janken
const jankenGame = document.querySelector("#janken");
const buttonRock = document.querySelector("#rock-button");
const buttonPaper = document.querySelector("#paper-button");
const buttonScissors = document.querySelector("#scissors-button");
const acknowledgeJanken = document.querySelector("#ok");

//minigame:Norina
const norinaGame = document.querySelector("#norina");
const acknowledgeNorina = document.querySelector("#ok2");

//minigame:Erik
const erikGame = document.querySelector("#erik");
const acknowledgeErik = document.querySelector("#ok3");

//minigame:TicTacToe
const ticTacToeGame = document.querySelector("#tic-tac-toe");
const acknowledgeTTT = document.querySelector("#ok4");
const resultTTT = document.querySelector('#ttt_result');

const current = document.querySelector("#current");
const rassWrap = document.querySelector(".rass-wrap");

let rowNumber = 10;
let columnNumber = 12;
let currentPlayer = 1;
let amountOfPlayers;
let currentRass = 0;

let surprisePositions = ["18", "29", "46", "51"];

// palya matrixa
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

// jatekos Class
class Player {
  constructor(className, nextPosition, kepUrlBelseje, rass) {
    this.nextPosition = nextPosition;
    this.player = document.createElement("div");
    this.player.className = className;
    this.player.style.content = `url(${kepUrlBelseje})`;
    this.rass = rass;
  }
}

// jatekosok
let p1 = new Player("player1", 1, "img/feher/ember1.png", "none");
let p2 = new Player("player2", 1, "img/feher/ember2.png", "none");
let p3 = new Player("player3", 1, "img/feher/ember3.png", "none");
let p4 = new Player("player4", 1, "img/feher/ember4.png", "none");

let playerCollection = [p1, p2, p3, p4];


// palya letrehozasa
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

// jatekos mozgatasa
function movePlayer(player, skin) {
  let trackPositions = document.querySelectorAll("[data-id]");
  let position = Array.from(trackPositions).find(
    (x) => x.dataset.id == player.nextPosition
  );

  player.player.classList.remove("playerWarp");
  player.player.classList.add("playerArrive");
  position.append(player.player);
  setTimeout(function() {
    player.player.style.content = skin;
    diceImg.disabled = false;
    diceOFF.style.visibility = "hidden";
    }, 1500);
}

// eldonti ,hogy a kovetkezo mezo lepheto-e, a lepesunkkel megnyeruk-e a jatekot
// es, hogy akovetkezo mezonk minigame-e
function mehetE(step, jatekos) {
  if (jatekos.nextPosition + step <= 63) {
    jatekos.nextPosition += step; //! lehet ez miatt nem mukodott az egyesevel leptetes mert alapbol odaleptette nem tudott mar lefutni

    // Teleport animáció
    jatekos.player.classList.remove("playerArrive");
    jatekos.player.classList.add("playerWarp");    
    let skin = jatekos.player.style.content;
    jatekos.player.style.content = `url(img/wormhole.png)`;

    let pos = jatekos.nextPosition;

    switch (pos) {
      // ko papir ollo
      case 18:
        //Janken
        buttonPaper.disabled = false;
        buttonRock.disabled = false;
        buttonScissors.disabled = false;
        acknowledgeJanken.disabled = true;
        result.innerHTML = "";
        field.innerHTML = "";
        jankenGame.className = "janken";
        diceImg.disabled = true;
        diceOFF.style.visibility = "visible";
        buttonRock.addEventListener("click", MiniGameWriter);
        buttonPaper.addEventListener("click", MiniGameWriter);
        buttonScissors.addEventListener("click", MiniGameWriter);
        break;

      // norina megijeszt
      case 29:
        //Norina
        let bonusStep = 0;
        diceImg.disabled = true;
        diceOFF.style.visibility = "visible";
        norinaGame.className = "norina";    
        acknowledgeNorina.onclick = function () {
          norinaGame.className = "minigameOFF";
          diceImg.disabled = false;
          diceOFF.style.visibility = "hidden";
          if (currentPlayer - 2 < 0) {
            bonusStep = RacialDiscrimination(true);
            mehetE(-8 + bonusStep, playerCollection[amountOfPlayers - 1]);
          } else {
            bonusStep = RacialDiscrimination(false);
            mehetE(-8 + bonusStep, playerCollection[currentPlayer - 2]);
          }
        };
        break;

      // erik a rasszista orais zsiraf/ember
      case 46:
        let erikSteps = 0;
        diceImg.disabled = true;
        diceOFF.style.visibility = "visible";
        erikGame.className = "erik";
        if (playerCollection[currentPlayer - 1].rass == "fekete") {
          erikSteps = -10;
          acknowledgeErik.innerHTML = "Már megint a bőrszínem miatt vernek meg...";
        } else if (playerCollection[currentPlayer - 1].rass == "normál") {
          erikSteps = 5;
          acknowledgeErik.innerHTML = "Felülök Erik a zsiráf hátára";
        }
        acknowledgeErik.onclick = function(){
          if (currentPlayer - 2 < 0) {
            mehetE(erikSteps, playerCollection[amountOfPlayers - 1]);
          } else {
            mehetE(erikSteps, playerCollection[currentPlayer - 2]);
          }
          erikGame.className = "minigameOFF";
          diceImg.disabled = false;
          diceOFF.style.visibility = "hidden";
        }
        break;

      // tictactoe
      case 51:
        let bonusStepTTT = 0;
        acknowledgeTTT.disabled = true;
        let gaymer = ttt_gameWinner;
        diceImg.disabled = true;
        diceOFF.style.visibility = "visible";
        ticTacToeGame.className = "tictactoe";
        acknowledgeTTT.onclick = function () {
          tttGrid.innerHTML = "";
          ttt_createGrid(tttGrid);
          resultTTT.innerHTML = "";
          ttt_flag = 0;
          ticTacToeGame.className = "minigameOFF";
          diceImg.disabled = false;
          diceOFF.style.visibility = "hidden";
          if (currentPlayer - 2 < 0) {
            bonusStepTTT = RacialDiscrimination(true);
            mehetE(-8 + bonusStepTTT, playerCollection[amountOfPlayers - 1]);
          } else {
            bonusStepTTT = RacialDiscrimination(false);
            mehetE(-8 + bonusStepTTT, playerCollection[currentPlayer - 2]);
          }
        };
        break;
    }

    // itt lepteti a jatekost
    // delay az animáció miatt
    setTimeout(function() {movePlayer(jatekos, skin);}, 1000); 

    // gyozelem eseten leallitja a jatekot, nem engedi, hogy a dobokocka kifagyjon
    if (jatekos.nextPosition == 63) {
      //winner.innerHTML = `${currentPlayer}. játékos a győztes`;
      image = document.createElement("img");
      image.src = `img/Dice/winner.png`;
      winner.append(image);
      winner.className = "winner";
      containsDice.innerHTML = "";
    } else {
      if (step < -6) {
        //? miert minusz 6
        step = 1;
      }
      let background = "url(" + `img/Dice/dice${step}.png` + ")";
      if (step < 0)
        background = "url(" + `img/Dice/dice${String(step)[1]}.png` + ")";
      diceImg.style.backgroundImage = background;
    }
  }
}

// lefuttatja jankent
function MiniGameWriter() {
  let gaymer = gameWinner;
  let bonusStep = 0;
  if (gaymer.miniGameWinner == "player") {
    acknowledgeJanken.disabled = false;
    acknowledgeJanken.onclick = function () {
      if (currentPlayer - 2 < 0) {
        bonusStep = RacialDiscrimination(true);
        mehetE(5 + bonusStep, playerCollection[amountOfPlayers - 1]);
      } else {
        bonusStep = RacialDiscrimination(false);
        mehetE(5 + bonusStep, playerCollection[currentPlayer - 2]);
      }
      jankenGame.className = "minigameOFF";
      diceImg.disabled = false;
      diceOFF.style.visibility = "hidden";
    };
  }
  if (gaymer.miniGameWinner == "bot") {
    acknowledgeJanken.disabled = false;
    acknowledgeJanken.onclick = function () {
      if (currentPlayer - 2 < 0) {
        bonusStep = RacialDiscrimination(true);
        mehetE(-5 + bonusStep, playerCollection[amountOfPlayers - 1]);
      } else {
        bonusStep = RacialDiscrimination(false);
        mehetE(-5 + bonusStep, playerCollection[currentPlayer - 2]);
      }
      jankenGame.className = "minigameOFF";
      diceImg.disabled = false;
      diceOFF.style.visibility = "hidden";
    };
  }
}

// kis rasszizmus
function RacialDiscrimination(last) {
  let bonusStep = 0;
  if (last) {
    if (playerCollection[amountOfPlayers - 1].rass == "fekete") {
      bonusStep = -2;
    }
  } else {
    if (playerCollection[currentPlayer - 2].rass == "fekete") {
      bonusStep = -2;
    }
  }
  return bonusStep;
}

// letrehozza a szamot amennyivel mozogjon egy jatekos, es meghivja a mozgatast
function nextPlayer() {
  diceImg.disabled = true;
  diceOFF.style.visibility = "visible";
  let step = Math.ceil(Math.random() * 6); // 1-6
  //step = 23;
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
  if (currentPlayer > amountOfPlayers) {
    currentPlayer = 1;
  }
  current.innerHTML = `${currentPlayer}. játékos`;
}

// feher karaktereket mutatja
function mutatFeherKarakterek() {
  currentRass = 0;
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

// fekete karaktereket mutatja
function mutatFeketeKarakterek() {
  currentRass = 1;
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

// rassz valaszto gombok letrehozasa
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

// karaktereket kilehet valasztani kepukre kattintassal
function selectedPlayer() {
  let image = "url(" + `${this.src}` + ")";
  currentSkin = this.src;
  playerCollection[currentPlayer - 1].player.style.content = image;
  if (currentRass == 0) {
    playerCollection[currentPlayer - 1].rass = "normál";
  } else {
    playerCollection[currentPlayer - 1].rass = "fekete";
  }
  movePlayer(playerCollection[currentPlayer - 1], this.src);
  currentPlayer++;
  current.innerHTML = `${currentPlayer}. játékos`;
  if (currentPlayer > amountOfPlayers) {
    currentPlayer = 1;
    current.innerHTML = `${currentPlayer}. játékos`;
    charactersWrap.innerHTML = "";
    charactersWrap.style.display = "none";
    diceImg.disabled = false;
    diceOFF.style.visibility = "hidden";
    diceImg.style.backgroundColor = "none";
    rassWrap.innerHTML = "";
  }
}

// 2 jatekosmodot valasztja ki
function createPlayerSeletionFor2() {
  amountOfPlayers = 2;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
}

// 3 jatekosmodot valasztja ki
function createPlayerSeletionFor3() {
  amountOfPlayers = 3;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
  //movePlayer(p3);
}

// 4 jatekosmodot valasztja ki
function createPlayerSeletionFor4() {
  amountOfPlayers = 4;
  containsButtons.innerHTML = "";
  createButtonsToSelectRass();
  //movePlayer(p1);
  //movePlayer(p2);
  //movePlayer(p3);
  //movePlayer(p4);
}

// dobokocka
diceImg.addEventListener("click", nextPlayer);
//letrehoz
createGrid();
//jatekosmodok
btn2player.addEventListener("click", createPlayerSeletionFor2);
btn3player.addEventListener("click", createPlayerSeletionFor3);
btn4player.addEventListener("click", createPlayerSeletionFor4);
