const gridContainer = document.querySelector('.grid-container');
const containsDice = document.querySelector('.contains-dice');
const containsButtons = document.querySelector('.contains-buttons');
const diceImg = document.querySelector('.dice-img');
const btn2player = document.querySelector('#btn2player');
const btn3player = document.querySelector('#btn3player');
const btn4player = document.querySelector('#btn4player');
const charactersWrap = document.querySelector('.characters-wrap');
const winner = document.querySelector('.winner');


let rowNumber = 10;
let columnNumber = 12;
currentPlayer = 1;


let track = [
    [     0,     0,     0,      63,    62,      61,    60,     0,     0,     0,       0,     1],
    [     0,     0,     0,       0,     0,       0,    59,     0,     5,     4,       3,     2],
    [     0,     0,     0,       0,    56,      57,    58,     0,     6,     0,       0,     0],
    [[51, 4],   52,    53,      54,    55,       0,     0,     0,     7,     8,       9,    10],
    [     50,    0,     0,       0,     0,       0,     0,     0,     0,     0,       0,    11],
    [     49,   48,    47, [46, 3],     0, [18, 1],    17,    16,    15,    14,      13,    12],
    [      0,    0,     0,      45,     0,      19,     0,     0,     0,     0,       0,     0],
    [     41,   42,    43,      44,     0,      20,    21,    22,    23,    24,      25,    26],
    [     40,    0,     0,       0,     0,       0,     0,     0,     0,     0,       0,    27],
    [     39,   38,    37,      36,    35,      34,    33,    32,    31,    30, [29, 2],    28],
];  


class Player {
    constructor(className,nextPosition, kepUrlBelseje){
        this.nextPosition = nextPosition;
        this.player = document.createElement('div');
        this.player.className = className;
        this.player.style.content = `url(${kepUrlBelseje})`
    }
}

let p1 = new Player('player1',1, 'img/feher/ember1.png');
let p2 = new Player('player2',1, 'img/feher/ember2.png');
let p3 = new Player('player3',1, 'img/feher/ember3.png');
let p4 = new Player('player4',1, 'img/feher/ember4.png');


function createGrid() {
    let div;
    let gridRow;
    for (let row = 0; row < rowNumber; row++) {
        gridRow = document.createElement('div');
        gridRow.className = 'grid-row';
        for (let column = 0; column < columnNumber; column++) {
            div = document.createElement('div');
            div.style.width = '100px';
            div.style.height = '100px';
            
            if (track[row][column] == 0) {
                div.className = 'wall';
            } else {
                div.className = 'cell';
                div.dataset.id = track[row][column]; // data-id=""
            }

            gridRow.append(div);
        }
        gridContainer.append(gridRow);
    }
}


function movePlayer(player){
    let trackPositions = document.querySelectorAll('[data-id]');
    let position = Array.from(trackPositions).find(x => x.dataset.id == player.nextPosition )
    position.append(player.player);
}

function mehetE(step, jatekos){
    if (jatekos.nextPosition + step <= 63) {
        jatekos.nextPosition += step;
        movePlayer(jatekos);
        if (jatekos.nextPosition == 63){
            winner.innerHTML = `${currentPlayer}. játékos a győztes`;
            image = document.createElement('img');
            image.src=`img/Dice/winner.jpg`;
            winner.append(image);
            containsDice.innerHTML = '';
        }
        else{
            diceImg.src = `img/Dice/dice${step}.png`;
        }
    }
}

function nextPlayer(){
    let step = Math.ceil(Math.random()*6); // 1-6
    if (currentPlayer == 1){
        mehetE(step, p1);
    }
    if (currentPlayer == 2){
        mehetE(step, p2);
    }    
    if (currentPlayer == 3){
        mehetE(step, p3);
    }
    if (currentPlayer == 4){
        mehetE(step, p4);
    }
    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;
    btnChangePlayer.innerHTML = `${currentPlayer}. játékos`;
}

function mutatFeherKarakterek(){
    charactersWrap.innerHTML = '';
    for (let index = 1; index <= 4; index++){
        image = document.createElement('img');
        image.src = `img/feher/ember${index}.png`;
        image.className = 'characterImage';
        charactersWrap.append(image);
    }
}


function mutatFeketeKarakterek(){
    charactersWrap.innerHTML = '';
    for (let index = 1; index <= 4; index++){
        image = document.createElement('img');
        image.src = `img/cigany/blackguy${index}.png`;
        image.className = 'characterImage';
        charactersWrap.append(image);
    }
}

function createButtonsToSelectRass(){
    charactersWrap.innerHTML = '';
    let btnFeher = document.createElement('button');
    btnFeher.className = 'feherekGomb';
    btnFeher.innerHTML = 'Feher karakterek';
    let btnFekete = document.createElement('button');
    btnFekete.className = 'feketekGomb';
    btnFekete.innerHTML = 'Cigány karakterek'
    charactersWrap.append(btnFeher);
    charactersWrap.append(btnFekete);
    btnFeher.addEventListener('click', mutatFeherKarakterek);
    btnFekete.addEventListener('click', mutatFeketeKarakterek);
}

function createPlayerSeletionFor2(){
    containsButtons.innerHTML = '';
    createButtonsToSelectRass();
    movePlayer(p1);
    movePlayer(p2);
}

function createPlayerSeletionFor3(){
    containsButtons.innerHTML = '';
    createButtonsToSelectRass();
    movePlayer(p1);
    movePlayer(p2);
    movePlayer(p3)
}

function createPlayerSeletionFor4(){
    containsButtons.innerHTML = '';
    createButtonsToSelectRass();
    movePlayer(p1);
    movePlayer(p2);
    movePlayer(p3);
    movePlayer(p4);

}


diceImg.addEventListener('click', nextPlayer);
createGrid();
btn2player.addEventListener('click', createPlayerSeletionFor2);
btn3player.addEventListener('click', createPlayerSeletionFor3);
btn4player.addEventListener('click', createPlayerSeletionFor4);