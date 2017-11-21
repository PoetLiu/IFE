var chessBoard = document.getElementById('chess-board');
var chessBoardData = [];
const ROW = 10, COL = 10;

function onChessBoardClick(e) {
    console.log(e.target);
}

function loadChessBoard() {
   for (var i = 0; i < ROW*COL; i++) {
       var cell = document.createElement('div');
        cell.className  += 'cell';
        chessBoardData.push({dom:cell, row:i%COL, col:i%ROW});
        chessBoard.appendChild(cell);
   }
}

function init() {
    loadChessBoard();
   chessBoard.addEventListener('click', onChessBoardClick);
}

init();
