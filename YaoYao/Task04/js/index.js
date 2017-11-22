var chessBoard = document.getElementById('chess-board');
var cmdInput = document.getElementById('cmd-input');
var exeBtn = document.getElementById('exe-btn');


function init() {
    var board = new ChessBoard(chessBoard, 10, 10);
    board.load();
    exeBtn.addEventListener('click', onExeBtnClick);

    function onExeBtnClick() {
        var cmd = cmdInput.value;
        switch (cmd) {
            case 'GO':
                board.chess.move();
                break;
            case 'TUN LEF':
                board.chess.changeDir(LEFT, true);
                break;
            case 'TUN RIG':
                board.chess.changeDir(RIGHT, true);
                break;
            case 'TUN BAC':
                board.chess.changeDir(DOWN, true);
                break;
        }
    }
}

init();
