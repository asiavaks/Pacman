'use strict';
var gPlayAgainBtn = document.querySelector('.modal button');
var gBoard;
var gFood = null;
var gCherryInterval;
var WALL = '#';
var FOOD = '.';
var POWER_FOOD = '☀️';
var CHERRY = '🍒';
var SIZE = 10;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gFood = null;
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    gCherryInterval = setInterval(createCherry, 5000);
    renderBoard(gBoard, '.board');
    gGame.isOn = true;
    gPlayAgainBtn.innerText = 'restart';
}
function playAgain() {
    gGame.score = 0
    init();
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (gFood === null) {
                gFood = 1;
            } else {
                gFood++;
                console.log(gFood);
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFood--;
            }
            if (i === 1 && j === 1 || i === SIZE - 2 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || j === SIZE - 2 && i === 1) {
                board[i][j] = POWER_FOOD;
                gFood--;
            }
        }
    }
    return board;
}

function createCherry() {
    var cheryyCurrCell;
    var i;
    var j;
    while (cheryyCurrCell !== FOOD && cheryyCurrCell !== ' ') {
        i = getRandomIntInclusive(1, 8);
        j = getRandomIntInclusive(1, 8);
        cheryyCurrCell = gBoard[i][j];
    }
    if (cheryyCurrCell === FOOD) {
        gFood--;
    }
    gBoard[i][j] = CHERRY;

    renderCell({ i: i, j: j }, CHERRY);
    // renderBoard(gBoard, '.board');
}


function updateScore(score) {
    //TODO: UPDATE GAMES SCORE
    //model
    gGame.score += score;
    //dom
    document.querySelector('h3 span').innerText = gGame.score;
}


function gameOver() {
    //TODO: GAME OVER
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    clearInterval(gCherryInterval);
    gPlayAgainBtn.innerText = 'Play Again?';
    // renderBoard(gBoard, '.board');
}
