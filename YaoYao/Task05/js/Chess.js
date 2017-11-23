function Chess(x, y, board, dir, deg) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.dir = dir || 'up';
    this.deg = deg || 0;
    this.dom;

    this.init();
}

Chess.prototype.init = function () {
    this.dom = this.newChessDom();
    this.updateDomPosition();
};

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

Chess.prototype.willHitBorder = function (dir) {
    var b = this.board;
    var col = b.col, row = b.row;
    var d = dir || this.dir;
    var x = this.x, y = this.y;
    console.log(x, y, col, row, d, this);
    return ((y === 0 && d === 'up') ||
        (y === row - 1 && d === 'down') ||
        (x === 0 && d === 'left') ||
        (x === col - 1 && d === 'right'));
};

Chess.prototype.move = function (dir, keepDir) {
    dir = dir || this.dir;

    keepDir || this.changeDirTo(dir);
    if (this.willHitBorder(dir)) {
        return;
    }
    this.updatePosition(dir);
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
        } else if (deg >= 360) {
            deg -= 360;
        }
        return deg;
    }

    function getDirByDeg(deg) {
        var dir = 0;
        switch (deg) {
            case 0:
                dir = 'up';
                break;
            case 90:
                dir = 'right';
                break;
            case 180:
                dir = 'down';
                break;
            case 270:
                dir = 'left';
                break;
        }
        return dir;
    }
};

Chess.prototype.changeDirTo = function (dir) {
    if (this.dir === dir) {
        return;
    }

    // Rotate
    var deg = this.deg;
    switch (dir) {
        case 'up':
            deg = 0;
            break;
        case 'right':
            deg = 90;
            break;
        case 'down':
            deg = 180;
            break;
        case 'left':
            deg = -90;
            break;
    }

    this.rotate(deg);
};

Chess.prototype.turn = function (dir) {
    // Rotate
    var deg = this.deg;
    switch (dir) {
        case 'right':
            deg += 90;
            break;
        case 'back':
            deg += 180;
            break;
        case 'left':
            deg -= 90;
            break;
    }

    this.rotate(deg);
};

Chess.prototype.updateDomPosition = function () {
    var b = this.board;
    var top = this.y * b.rowH, left = this.x * b.colW;
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    console.log(top, left, this);
};

Chess.prototype.updatePosition = function (dir) {
    switch (dir) {
        case 'up':
            this.y -= 1;
            break;
        case 'right':
            this.x += 1;
            break;
        case 'down':
            this.y += 1;
            break;
        case 'left':
            this.x -= 1;
            break;
    }
    this.updateDomPosition();
};