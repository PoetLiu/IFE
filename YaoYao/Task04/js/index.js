var chessBoard = document.getElementById('chess-board');
var cmdInput = document.getElementById('cmd-input');
var exeBtn  = document.getElementById('exe-btn');
var chessBoardData = [];
var chess;
const ROW = 10, COL = 10, UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4;

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
    chess = {id: randomChessIdx(), dom: newChess(), dir:UP, deg:0};
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
            moveChess(UP);
            break;
        case 's':
            moveChess(DOWN);
            break;
        case 'a':
            moveChess(LEFT);
            break;
        case 'd':
            moveChess(RIGHT);
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

function degRound(deg) {
   if (deg < 0) {
       deg += 360;
   } else if (deg === 360) {
      deg   = 0;
   }

   return deg;
}

function getDirByDeg(deg) {
    var dir = 0;
    switch (deg) {
        case 0:
            dir = UP;
            break;
        case 90:
            dir = RIGHT;
            break;
        case 180:
            dir = DOWN;
            break;
        case 270:
            dir = LEFT;
            break;
    }
    return dir;
}

function chessChangeDir(dir, continueRotate) {
    if (!continueRotate && chess.dir === dir) {
        return;
    }

    // Rotate
    var deg = chess.deg;
    switch (dir) {
        case UP:
            deg = 0;
            break;
        case RIGHT:
            deg = continueRotate ? deg+90 : 90;
            break;
        case DOWN:
            deg = continueRotate ? deg+180 : 180;
            break;
        case LEFT:
            deg = continueRotate ? deg-90 : -90;
            break;
    }

    deg = degRound(deg);
    dir = getDirByDeg(deg);
    chess.dom.style.webkitTransform = 'rotate('+deg+'deg)';
    chess.dom.style.mozTransform    = 'rotate('+deg+'deg)';
    chess.dom.style.msTransform     = 'rotate('+deg+'deg)';
    chess.dom.style.oTransform      = 'rotate('+deg+'deg)';
    chess.dom.style.transform       = 'rotate('+deg+'deg)';

    chess.dir   = dir;
    chess.deg   = deg;
    // console.log(chess);
}

function moveChess(dir) {
    var idx = chess.id;
    dir = dir || chess.dir;

    chessChangeDir(dir);
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

function onExeBtnClick() {
    var cmd = cmdInput.value;
    switch (cmd) {
        case 'GO':
            moveChess();
            break;
        case 'TUN LEF':
            chessChangeDir(LEFT, true);
            break;
        case 'TUN RIG':
            chessChangeDir(RIGHT, true);
            break;
        case 'TUN BAC':
            chessChangeDir(DOWN, true);
            break;
    }
}


function init() {
    loadChessBoard();
    chessBoard.addEventListener('click', onChessBoardClick);
    document.addEventListener('keydown', onKeyDown);
    exeBtn.addEventListener('click', onExeBtnClick);
}

init();
