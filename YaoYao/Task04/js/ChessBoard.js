function ChessBoard(dom, row, col) {
    this.dom = dom;
    this.row = row;
    this.col = col;
    this.data = [];

    this.init();
}

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
                board.moveChess('up');
                break;
            case 's':
                board.moveChess('down');
                break;
            case 'a':
                board.moveChess('left');
                break;
            case 'd':
                board.moveChess('right');
                break;
        }
    }

    function onChessBoardClick(e) {
        console.log(board.data.indexOf(e.target));
    }
};

ChessBoard.prototype.load = function (chess) {
    for (var i = 0; i < this.row * this.col; i++) {
        this.dom.appendChild(newChessCell());
    }
    this.data = Array.from(this.dom.children);

    // add random chess.
    chess = chess || new Chess(random(0, this.col), random(0, this.row), this.getBoarder(), 'up', 0);
    this.addChess(chess);

    function newChessCell() {
        var cell = document.createElement('div');
        cell.className += 'cell';
        return cell;
    }
};

ChessBoard.prototype.chessCordToId = function (chess) {
    return chess.x + chess.y * this.row;
};

ChessBoard.prototype.getBoarder = function () {
    return {row: this.row, col: this.col};
};

ChessBoard.prototype.idWithinBorder = function (i) {
    return i >= 0 && i < this.col * this.row;
};

ChessBoard.prototype.turnChess = function (dir) {
    this.chess.turn(dir);
};

ChessBoard.prototype.moveChess = function (dir) {
    var board = this;
    this.chess.move(
        dir,
        function (chess) {
            board.removeChess(chess)
        },
        function (chess) {
            board.addChess(chess);
        }
    );
};

ChessBoard.prototype.addChess = function (chess) {
    var id = this.chessCordToId(chess);
    // console.log(chess);
    this.data[id].appendChild(chess.dom);
    this.chess = chess;
};

ChessBoard.prototype.removeChess = function (chess) {
    chess = chess || this.chess;
    if (!chess) {
        return;
    }
    var id = this.chessCordToId(chess);
    this.data[id].removeChild(chess.dom);
    this.chess = null;
};