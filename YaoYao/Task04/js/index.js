var chessBoard = document.getElementById('chess-board');
var chessBoardData = [];
var chess;
const ROW = 10, COL = 10, UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

function onChessBoardClick(e) {
    console.log(chessBoardData.indexOf(e.target));
}

function newChessCell() {
    var cell = document.createElement('div');
    cell.className += 'cell';
    return cell;
}

function random(min, max) {
    return Math.floor(Math.random() * max) - min;
}

function randomChessIdx() {
    return random(0, ROW * COL);
}

function loadChessBoard() {
    for (var i = 0; i < ROW * COL; i++) {
        chessBoard.appendChild(newChessCell());
    }
    chessBoardData = Array.from(chessBoard.children);

    // add random chess.
    chess = {id: randomChessIdx(), dom: newChess(), dir:UP};
    chessBoardData[chess.id].appendChild(chess.dom);
}

function newChess() {
    var chess = document.createElement('div');
    chess.className += 'chess';

    var div = document.createElement('div');
    div.className += 'chess-head';
    chess.appendChild(div);

    div = document.createElement('div');
    div.className += 'chess-body';
    chess.appendChild(div);
    return chess;
}

function onKeyDown(e) {
    var k = e.key;
    switch (k) {
        case 'w':
            moveChessToDirection(UP);
            break;
        case 's':
            moveChessToDirection(DOWN);
            break;
        case 'a':
            moveChessToDirection(LEFT);
            break;
        case 'd':
            moveChessToDirection(RIGHT);
            break;
    }
}

function chessWillHitBorder(i, dir) {
    var r = Math.floor(i / COL);
    var c = i % COL;
    return ((r === 0 && dir === UP) ||
        (r === ROW - 1 && dir === DOWN) ||
        (c === 0 && dir === LEFT) ||
        (c === COL - 1 && dir === RIGHT));
}

function chessWithinBorder(i) {
    return i >= 0 && i < COL * ROW;
}

function getDirClassName(dir) {
   switch (dir) {
       case UP:
           return '';
       case RIGHT:
           return ' right';
       case DOWN:
           return ' down';
       case LEFT:
           return ' left';
   }
}

function chessChangeDir(chess, dir) {
    if (chess.dir === dir) {
        return;
    }

    // Revert to init state.
    chess.dom.className = chess.dom.className.replace(getDirClassName(chess.dir), '');
    chess.dom.className += getDirClassName(dir);
    chess.dir   = dir;
}

function moveChessToDirection(dir) {
    var idx = chess.id;

    chessChangeDir(chess, dir);
    if (chessWillHitBorder(idx, dir)) {
        return;
    }

    switch (dir) {
        case UP:
            idx = chess.id - (COL);
            break;
        case RIGHT:
            idx = chess.id + 1;
            break;
        case DOWN:
            idx = chess.id + (COL);
            break;
        case LEFT:
            idx = chess.id - 1;
            break;
    }

    chessBoardData[chess.id].removeChild(chess.dom);
    chess.id = idx;
    chessBoardData[chess.id].appendChild(chess.dom);
}

function init() {
    loadChessBoard();
    chessBoard.addEventListener('click', onChessBoardClick);
    document.addEventListener('keydown', onKeyDown);
}

init();
