var chessBoard = document.getElementById('chess-board');
var chessBoardData = [];
const ROW = 10, COL = 10;

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
    chessBoardData[randomChessIdx()].appendChild(newChess());
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

function init() {
    loadChessBoard();
    chessBoard.addEventListener('click', onChessBoardClick);
}

init();
