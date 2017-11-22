function ChessBoard(dom, row, col) {
    this.dom = dom;
    this.row = row;
    this.col = col;
    this.data = [];

    this.init();
}

const UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4;

function random(min, max) {
    return Math.floor(Math.random() * max) - min;
}

ChessBoard.prototype.init = function () {
    this.dom.addEventListener('click', onChessBoardClick);
    document.addEventListener('keydown', onKeyDown);

    var board = this;

    function onKeyDown(e) {
        var k = e.key;
        switch (k) {
            case 'w':
                board.chess.move(UP);
                break;
            case 's':
                board.chess.move(DOWN);
                break;
            case 'a':
                board.chess.move(LEFT);
                break;
            case 'd':
                board.chess.move(RIGHT);
                break;
        }
    }

    function onChessBoardClick(e) {
        console.log(board.data.indexOf(e.target));
    }

};

ChessBoard.prototype.getChessId = function () {
    return random(0, this.row * this.col);
};

ChessBoard.prototype.load = function (chess) {
    for (var i = 0; i < this.row * this.col; i++) {
        this.dom.appendChild(newChessCell());
    }
    this.data = Array.from(this.dom.children);

    // add random chess.
    chess = chess || new Chess(this.getChessId(), this, UP, 0);
    this.addChess(chess);

    function newChessCell() {
        var cell = document.createElement('div');
        cell.className += 'cell';
        return cell;
    }
};

ChessBoard.prototype.getBoarder = function () {
    return {row: this.row, col: this.col};
};

ChessBoard.prototype.idWithinBorder = function (i) {
    return i >= 0 && i < this.col * this.row;
};

ChessBoard.prototype.moveChess = function (dir) {

    this.chess.move(dir);
};

ChessBoard.prototype.addChess = function (chess) {
    this.data[chess.id].appendChild(chess.dom);
    this.chess = chess;
};

ChessBoard.prototype.removeChess = function (chess) {
    chess = chess || this.chess;
    if (!chess) {
        return;
    }
    this.data[chess.id].removeChild(chess.dom);
    this.chess = null;
};