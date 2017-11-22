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
                board.moveChess();
                break;
            case 'TUN LEF':
                board.turnChess(LEFT, true);
                break;
            case 'TUN RIG':
                board.turnChess(RIGHT, true);
                break;
            case 'TUN BAC':
                board.turnChess(DOWN, true);
                break;
        }
    }
}

init();
