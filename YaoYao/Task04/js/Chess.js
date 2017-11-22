function Chess(idx, board, dir, deg) {
    this.id = idx;
    this.board = board;
    this.dom = this.newChessDom();
    this.dir = dir || UP;
    this.deg = deg || 0;
}

Chess.prototype.newChessDom = function () {
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

Chess.prototype.chessWillHitBorder = function (border) {
    var col = border.col, row = border.row;
    var d = this.dir;
    var i = this.id;
    var r = Math.floor(i / col);
    var c = i % col;
    return ((r === 0 && d === UP) ||
        (r === row - 1 && d === DOWN) ||
        (c === 0 && d === LEFT) ||
        (c === col - 1 && d === RIGHT));
};

Chess.prototype.move = function (dir) {
    dir = dir || this.dir;

    this.changeDir(dir);
    if (this.chessWillHitBorder(this.board.getBoarder())) {
        return;
    }
    this.board.removeChess(this);
    this.updatePosition(dir);
    this.board.addChess(this);
};

Chess.prototype.changeDir = function (dir, rotate) {
    if (!rotate && this.dir === dir) {
        return;
    }

    // Rotate
    var deg = this.deg;
    switch (dir) {
        case UP:
            deg = 0;
            break;
        case RIGHT:
            deg = rotate ? deg + 90 : 90;
            break;
        case DOWN:
            deg = rotate ? deg + 180 : 180;
            break;
        case LEFT:
            deg = rotate ? deg - 90 : -90;
            break;
    }

    deg = degRound(deg);
    dir = getDirByDeg(deg);
    this.dom.style.webkitTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.mozTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.msTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.oTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.transform = 'rotate(' + deg + 'deg)';

    this.dir = dir;
    this.deg = deg;

    // console.log(chess);

    function degRound(deg) {
        if (deg < 0) {
            deg += 360;
        } else if (deg === 360) {
            deg = 0;
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
};

Chess.prototype.updatePosition = function (dir) {
    var c = this.board.col;
    switch (dir) {
        case UP:
            this.id -= c;
            break;
        case RIGHT:
            this.id += 1;
            break;
        case DOWN:
            this.id += c;
            break;
        case LEFT:
            this.id -= 1;
            break;
    }
};

