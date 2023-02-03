const grid = document.querySelector("#grid");

const rowNumber = 3;
const columnNumber = 3;
let flag = 0;
let hasWinner = false;

const winConditions = ["123", "147", "159", "258", "369", "357", "456", "789"];

function createGrid() {
  let div;
  let gridRow;
  let idNumber = 0;
  for (let row = 0; row < rowNumber; row++) {
    gridRow = document.createElement("div");
    gridRow.className = "grid-row";
    for (let column = 0; column < columnNumber; column++) {
      idNumber++;
      div = document.createElement("div");
      div.style.width = "50px";
      div.style.height = "50px";

      div.className = "cell";
      div.id = `c${idNumber}`;
      div.innerHTML = "p";

      div.addEventListener("click", function () {
        if (!this.classList.contains("full")) {
          if (flag == 0) {
            this.innerHTML = "X";
            flag = 1;
            this.classList.add("full");
            checkResults();
            if (flag == 1){
              botPlaces();
              checkResults();
            }          
          }
        }
      });

      gridRow.append(div);
    }
    grid.append(gridRow);
  }
}

function botPlaces() {
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
    flag = 0;
    cell.classList.add("full");
    checkResults();
  } else {
    botPlaces();
    // checkResults();
  }
}

function checkResults() {
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

  console.log(resultO);
  console.log(resultX);

  winConditions.forEach((condition) => {
    console.log(condition);
    if (resultO.includes(condition[0])) {
      if (resultO.includes(condition[1])) {
        if (resultO.includes(condition[2])) {

          cellPainter(condition[0], condition[1], condition[2])
          hasWinner = true;
          callWinner("O");
        }
      }
    }
    if (resultX.includes(condition[0])) {
      if (resultX.includes(condition[1])) {
        if (resultX.includes(condition[2])) {

          cellPainter(condition[0], condition[1], condition[2])
          hasWinner = true;
          callWinner("X");
        }
      }
    }
  });
  let overloadChecker = document.querySelectorAll(".full");
  if (overloadChecker.length == 9 && !hasWinner) {
    alert("draw");
  }
  return null;
}

function callWinner(winner) {
  flag = 2;
  alert(`${winner} won!`);
}

function cellPainter(c1,c2,c3){
  let cell1 = document.querySelector(`#c${c1}`)
          cell1.style.backgroundColor = "yellow";
          let cell2 = document.querySelector(`#c${c2}`)
          cell2.style.backgroundColor = "yellow";
          let cell3 = document.querySelector(`#c${c3}`)
          cell3.style.backgroundColor = "yellow";
}

createGrid();
