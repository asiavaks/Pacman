'use strict';

const PACMAN = '🤣'; //:)
var gPacman;
var gEatnGhosts = [];
function createPacman(board) {
    //TODO: CREATE PACMAN
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        countFood: 0
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
    gFood--;
}

function movePacman(ev) {
    //TODO: MOVE PACMAN
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev);

    if (!nextLocation) return;
    if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;
    if (gBoard[nextLocation.i][nextLocation.j] === FOOD) {
        updateScore(1);
        gFood--;
        if (gFood === 0){
            gameOver();
        }
    }
    if (gBoard[nextLocation.i][nextLocation.j] === CHERRY) {
        updateScore(10);
    }

    if (gBoard[nextLocation.i][nextLocation.j] === POWER_FOOD) {
        if (gPacman.isSuper) {
            return;
        } else {
            gPacman.isSuper = true;
            colorGhost();
            
            setTimeout(function () {
                gPacman.isSuper = false;
                gGhosts = gGhosts.concat(gEatnGhosts);
                gEatnGhosts = [];
                colorGhost();
                // renderBoard(gBoard, '.board')
            }, 5000);
        }
    }
    if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        }

        
        for (var i = 0; i < gGhosts.length; i++) {
            if ((nextLocation.j === gGhosts[i].location.j)
                && (nextLocation.i === gGhosts[i].location.i)) {
                gGhosts[i].currCellContent = ' ';
                gEatnGhosts.push(gGhosts[i]);
                gGhosts.splice(i, 1);
            }
        }


    }

    //model
    gBoard[gPacman.location.i][gPacman.location.j] = ' ';
    //DOM (HTML ELEMNTS)
    renderCell(gPacman.location, ' ');

    gPacman.location = nextLocation;

    //MODEL (js vars)
    gBoard[nextLocation.i][nextLocation.j] = PACMAN;

    //DOM (HTML ELEMNTS)
    renderCell(gPacman.location, PACMAN);



}


function getNextLocation(eventKeyboard) {
    //TODO: GET NEXT LOCATION FROM KEYBOARD
    var nextLoc = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.key) {
        case 'ArrowRight':
            nextLoc.j++
            break;
        case 'ArrowLeft':
            nextLoc.j--
            break;

        case 'ArrowUp':
            nextLoc.i--;
            break;

        case 'ArrowDown':
            nextLoc.i++;
            break;

        default:
            nextLoc = null;
            break;
    }

    return nextLoc;

}



