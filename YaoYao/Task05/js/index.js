var chessBoard = document.getElementById('chess-board');
var cmdInput = document.getElementById('cmd-input');
var exeBtn = document.getElementById('exe-btn');

function init() {
    var board = new ChessBoard(chessBoard, 10, 10, 45, 45);
    board.load();
    exeBtn.addEventListener('click', onExeBtnClick);
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            onExeBtnClick();
        }
    });

    function onExeBtnClick() {
        var cmd = cmdInput.value;
        switch (cmd) {
            case 'GO':
                board.moveChess();
                break;
            case 'TUN LEF':
                board.turnChess('left');
                break;
            case 'TUN RIG':
                board.turnChess('right');
                break;
            case 'TUN BAC':
                board.turnChess('back');
                break;
            case 'TRA LEF':
                board.transferChess('left');
                break;
            case 'TRA TOP':
                board.transferChess('up');
                break;
            case 'TRA RIG':
                board.transferChess('right');
                break;
            case 'TRA BOT':
                board.transferChess('down');
                break;
            case 'MOV LEF':
                board.moveChess('left');
                break;
            case 'MOV TOP':
                board.moveChess('up');
                break;
            case 'MOV RIG':
                board.moveChess('right');
                break;
            case 'MOV BOT':
                board.moveChess('down');
                break;
        }
    }
}

init();
