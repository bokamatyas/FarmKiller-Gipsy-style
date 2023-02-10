const tttGrid = document.querySelector('#ttt_wrapper');
const tttResult = document.querySelector('#ttt_result');

const ttt_rowNumber = 3;
const ttt_columnNumber = 3;
let ttt_flag = 0;
let ttt_hasWinner = false;

const ttt_winConditions = ["123", "147", "159", "258", "369", "357", "456", "789"];

class WinnerTTT {
  constructor(miniGameWinner) {
    this.miniGameWinner = miniGameWinner;
  }
}

let ttt_gameWinner = new WinnerTTT("none");

function ttt_createGrid(grid) {
  let div;
  let gridRow;
  let idNumber = 0;
  for (let row = 0; row < ttt_rowNumber; row++) {
    gridRow = document.createElement("div");
    gridRow.className = "ttt_grid-row";
    for (let column = 0; column < ttt_columnNumber; column++) {
      idNumber++;
      div = document.createElement("div");
      div.style.width = "150px";
      div.style.height = "150px";

      div.className = "ttt_cell";
      div.id = `c${idNumber}`;
      div.innerHTML = "";

      div.addEventListener("click", function () {
        if (!this.classList.contains("full")) {
          if (ttt_flag == 0) {
            this.innerHTML = "X";
            ttt_flag = 1;
            this.classList.add("full");
            ttt_checkResults();
            if (ttt_flag == 1){
              ttt_botPlaces();
              ttt_checkResults();
            }          
          }
        }
      });

      gridRow.append(div);
    }
    grid.append(gridRow);
  }
}

function ttt_botPlaces() {
  let cells = [];
  let place = Math.ceil(Math.random() * 9);

  for (let i = 1; i <= 9; i++) {
    cells.push(document.querySelector(`#c${i}`));
  }

  let cell;

  cells.forEach((element) => {
    if (element.id == `c${place}`) {
      cell = element;
    }
  });

  if (cell.classList.contains("full") == false) {
    cell.innerHTML = "O";
    ttt_flag = 0;
    cell.classList.add("full");
    ttt_checkResults();
  } else {
    ttt_botPlaces();
    // checkResults();
  }
}

function ttt_checkResults() {
  let resultChecker = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
  let resultONumber = [];
  let resultXNumber = [];
  let cells = [];

  for (let i = 1; i <= 9; i++) {
    cells.push(document.querySelector(`#c${i}`));
  }
  cells.forEach((element) => {
    if (element.innerHTML == "O") {
      resultChecker[cells.indexOf(element)] = "O";
      resultONumber.push(cells.indexOf(element) + 1);
    }
    if (element.innerHTML == "X") {
      resultChecker[cells.indexOf(element)] = "X";
      resultXNumber.push(cells.indexOf(element) + 1);
    }
  });

  resultONumber.sort();
  resultXNumber.sort();

  let resultO = "_";
  let resultX = "_";

  resultONumber.forEach((element) => {
    resultO += `${element}`;
  });
  resultXNumber.forEach((element) => {
    resultX += `${element}`;
  });


  ttt_winConditions.forEach((condition) => {
    if (resultO.includes(condition[0])) {
      if (resultO.includes(condition[1])) {
        if (resultO.includes(condition[2])) {

          ttt_cellPainter(condition[0], condition[1], condition[2])
          ttt_hasWinner = true;
          ttt_callWinner("O");
        }
      }
    }
    if (resultX.includes(condition[0])) {
      if (resultX.includes(condition[1])) {
        if (resultX.includes(condition[2])) {

          ttt_cellPainter(condition[0], condition[1], condition[2])
          ttt_hasWinner = true;
          ttt_callWinner("X");
        }
      }
    }
  });
  let overloadChecker = document.querySelectorAll(".full");
  if (overloadChecker.length == 9 && !ttt_hasWinner) {
    ttt_callWinner("draw");
  }
  return null;
}

function ttt_callWinner(winner) {
  console.log(winner);
  ttt_flag = 2;
  ttt_gameWinner.miniGameWinner = winner;
  if(winner == "draw"){
    tttResult.innerHTML = `Döntetlen!`;
  }
  else{
    tttResult.innerHTML = `${winner} nyert!`;
  }
  acknowledgeTTT.disabled = false;
}

function ttt_cellPainter(c1,c2,c3){
  let cell1 = document.querySelector(`#c${c1}`)
          cell1.style.backgroundColor = "yellow";
          let cell2 = document.querySelector(`#c${c2}`)
          cell2.style.backgroundColor = "yellow";
          let cell3 = document.querySelector(`#c${c3}`)
          cell3.style.backgroundColor = "yellow";
}

ttt_createGrid(tttGrid);
