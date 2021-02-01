'use strict';

// var GHOST = '👻';
var GHOST = '&#9781;';
var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    //TODO: GHOST OBJ
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    //TODO: CREATE GHOSTS
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 3000);
}

function moveGhosts() {
    //TODO: MOVE GHOSTS
    for (var i = 0; i < gGhosts.length; i++) {
        // debugger;
        var ghost = gGhosts[i];
        var moveDiff = getMoveDiff();

        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }

        if (gBoard[nextLocation.i][nextLocation.j] === WALL) continue;
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) continue;
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if (!gPacman.isSuper) {
                gameOver();
                return;
            }
        }

        //model
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        //dom
        renderCell(ghost.location, ghost.currCellContent);

        ghost.location = nextLocation;
        ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];

        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, getGhostHTML());

    }
    colorGhost();

}

function getGhostHTML() {

    return `<span class="ghost">${GHOST}</span>`;
}

function colorGhost(){
if (gPacman.isSuper) {
    var elGhosts = document.querySelectorAll('.ghost');
    for (var i = 0; i < elGhosts.length; i++) {
        elGhosts[i].style.color = 'blue';
    }
} else {
    var elGhosts = document.querySelectorAll('.ghost');
    for (var i = 0; i < elGhosts.length; i++) {
        elGhosts[i].style.color = gGhosts[i].color;
    }
}
}

function getMoveDiff() {
    //TODO: RANDOM GHOST MOVEMENT
    var rndNum = getRandomIntInclusive(0, 100);

    if (rndNum < 25) {
        return { i: -1, j: 0 }
    } else if (rndNum < 50) {
        return { i: 1, j: 0 }
    } else if (rndNum < 75) {
        return { i: 0, j: 1 }
    } else return { i: 0, j: -1 }
}

