const grid = document.querySelector("#grid");

const rowNumber = 3;
const columnNumber = 3;
let flag = 0;
let winner = "";

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

        div.addEventListener('click', function() 
        { 
        if(!this.classList.contains("full"))
        {
            if(flag == 0){
                this.innerHTML = "X";
                flag = 1;
                this.classList.add("full");
                checkResults();
            }
            else{
                this.innerHTML = "O";
                flag = 0;
                this.classList.add("full");
                checkResults();
            }
        }
        
        });
  
        gridRow.append(div);
      }
      grid.append(gridRow);
    }
  }

function checkResults(){
    let resultChecker = ["E","E","E","E","E","E","E","E","E",];
    let resultONumber = [];
    let resultXNumber = [];
    let cell = [];

    for (let i = 1; i <= 9; i++) {
        cell.push(document.querySelector(`#c${i}`));
    }
    cell.forEach(element => {
        if(element.innerHTML == "O"){
            resultChecker[cell.indexOf(element)] = "O";
            resultONumber.push(cell.indexOf(element)+1);
        }
        if(element.innerHTML == "X"){
            resultChecker[cell.indexOf(element)] = "X";
            resultXNumber.push(cell.indexOf(element)+1);
        }  
    });        
    resultONumber.sort();
    resultXNumber.sort();

    console.log(resultONumber)
    console.log(resultXNumber)

    let resultO;
    let resultX;
    resultONumber.forEach(element => {
        resultO += `${element}`;
    });
    resultXNumber.forEach(element => {
        resultX += `${element}`;
    });
    console.log(resultO)
    console.log(resultX)
    
    winConditions.forEach(condition => {
        if (resultO.includes(condition)){
            callWinner("O");
        }
        if (resultX.includes(condition)){
            callWinner("X");
        }
    });


    console.log(resultChecker);
    console.log(resultO);
    console.log(resultX);
}

function callWinner(winner){
    alert(`${winner} won!`);
}

createGrid();