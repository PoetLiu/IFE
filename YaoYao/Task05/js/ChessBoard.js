function ChessBoard(dom, row, col, rowHeight, colWidth) {
    this.dom = dom;
    this.row = row;
    this.col = col;
    this.rowH = rowHeight;
    this.colW = colWidth;
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
    var newline = false;
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.dom.appendChild(newChessCell(newline));
            if (newline) {
                newline = false;
            }
        }
        newline = true;
    }
    this.data = Array.from(this.dom.children);

    // add random chess.
    chess = chess || new Chess(random(0, this.col), random(0, this.row), this.getBoarder(), 'up', 0);
    this.addChess(chess);

    function newChessCell(newline) {
        var cell = document.createElement('div');
        cell.className += 'cell';
        if (newline) {
            cell.style.clear = 'left';
        }
        return cell;
    }
};

ChessBoard.prototype.chessCordToId = function (chess) {
    return chess.x + chess.y * this.col;
};

ChessBoard.prototype.getBoarder = function () {
    return {row: this.row, col: this.col, rowH: this.rowH, colW: this.colW};
};

ChessBoard.prototype.idWithinBorder = function (i) {
    return i >= 0 && i < this.col * this.row;
};

ChessBoard.prototype.turnChess = function (dir) {
    this.chess.turn(dir);
};

ChessBoard.prototype.moveChess = function (dir, keepDir) {
    var board = this;
    this.chess.move(dir, keepDir);
};

ChessBoard.prototype.transferChess = function (dir) {
    this.moveChess(dir, true);
};

ChessBoard.prototype.addChess = function (chess) {
    var d = this.dom;
    d.insertBefore(chess.dom, d.firstChild);
    this.chess = chess;
};

ChessBoard.prototype.removeChess = function (chess) {
    chess = chess || this.chess;
    if (!chess) {
        return;
    }
    this.dom.removeChild(chess);
    this.chess = null;
};