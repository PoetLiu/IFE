function HtmlActuator() {
    this.chessBoardContainer = document.getElementById('chess-board');
    this.firstAct = true;
}

HtmlActuator.prototype.actuate = function (chess, board) {
    if (this.firstAct) {
        this.loadChessBoard(board);
        this.addChess();
        this.firstAct = false;
    }

    this.updateChessPosition(
        chess,
        board);
    this.updateChessRotate(chess.deg);
};

HtmlActuator.prototype.loadChessBoard = function (board) {
    var newline = false;
    var b = this.chessBoardContainer;
    var row = board.row, col = board.col;

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            b.appendChild(newChessCell(newline));
            if (newline) {
                newline = false;
            }
        }
        newline = true;
    }

    function newChessCell(newline) {
        var cell = document.createElement('div');
        cell.className += 'cell';
        if (newline) {
            cell.style.clear = 'left';
        }
        return cell;
    }
};

HtmlActuator.prototype.newChess = function () {
    var chess = document.createElement('div');
    chess.className += 'chess';

    var div = document.createElement('div');
    div.className += 'chess-head';
    chess.appendChild(div);

    div = document.createElement('div');
    div.className += 'chess-body';
    chess.appendChild(div);
    return chess;
};

HtmlActuator.prototype.updateChessPosition = function (position, board) {
    var b = board, x = position.x, y = position.y;
    var top = y * b.rowH, left = x * b.colW;
    var c = this.chess;

    c.style.top = top + 'px';
    c.style.left = left + 'px';
    // console.log(top, left, this);
};

HtmlActuator.prototype.updateChessRotate = function (deg) {
    var c = this.chess;

    c.style.webkitTransform = 'rotate(' + deg + 'deg)';
    c.style.mozTransform = 'rotate(' + deg + 'deg)';
    c.style.msTransform = 'rotate(' + deg + 'deg)';
    c.style.oTransform = 'rotate(' + deg + 'deg)';
    c.style.transform = 'rotate(' + deg + 'deg)';
};

HtmlActuator.prototype.addChess = function (chess) {
    var b = this.chessBoardContainer;
    chess = chess || this.newChess();

    this.chess = chess;
    b.insertBefore(chess, b.firstChild);
};

HtmlActuator.prototype.removeChess = function (chess) {
    chess = chess || this.chess;
    if (!chess) {
        return;
    }
    this.chessBoardContainer.removeChild(chess);
    this.chess = null;
};