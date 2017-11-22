function Chess(x, y, boarder, dir, deg) {
    this.x = x;
    this.y = y;
    this.boarder = boarder;
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

Chess.prototype.willHitBorder = function (border) {
    border = border || this.boarder;
    var col = border.col, row = border.row;
    var d = this.dir;
    var x = this.x, y = this.y;
    return ((y === 0 && d === UP) ||
        (y === row - 1 && d === DOWN) ||
        (x === 0 && d === LEFT) ||
        (x === col - 1 && d === RIGHT));
};

Chess.prototype.move = function (dir, beforeMoveCB, afterMoveCB) {
    dir = dir || this.dir;

    this.changeDir(dir);
    if (this.willHitBorder()) {
        return;
    }
    beforeMoveCB && beforeMoveCB(this);
    this.updatePosition(dir);
    afterMoveCB && afterMoveCB(this);
};

Chess.prototype.rotate = function (deg) {
    deg = degRound(deg);

    this.dom.style.webkitTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.mozTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.msTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.oTransform = 'rotate(' + deg + 'deg)';
    this.dom.style.transform = 'rotate(' + deg + 'deg)';

    this.deg = deg;
    this.dir = getDirByDeg(deg);

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

Chess.prototype.changeDir = function (dir, turning) {
    if (!turning && this.dir === dir) {
        return;
    }

    // Rotate
    var deg = this.deg;
    switch (dir) {
        case UP:
            deg = 0;
            break;
        case RIGHT:
            deg = turning ? deg + 90 : 90;
            break;
        case DOWN:
            deg = turning ? deg + 180 : 180;
            break;
        case LEFT:
            deg = turning ? deg - 90 : -90;
            break;
    }

    this.rotate(deg);
};

Chess.prototype.updatePosition = function (dir) {
    switch (dir) {
        case UP:
            this.y -= 1;
            break;
        case RIGHT:
            this.x += 1;
            break;
        case DOWN:
            this.y += 1;
            break;
        case LEFT:
            this.x -= 1;
            break;
    }
};
