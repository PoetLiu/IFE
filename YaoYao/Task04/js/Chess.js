function Chess(x, y, boarder, dir, deg) {
    this.x = x;
    this.y = y;
    this.boarder = boarder;
    this.dom = this.newChessDom();
    this.dir = dir || 'up';
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
    return ((y === 0 && d === 'up') ||
        (y === row - 1 && d === 'down') ||
        (x === 0 && d === 'left') ||
        (x === col - 1 && d === 'right'));
};

Chess.prototype.move = function (dir, beforeMoveCB, afterMoveCB) {
    dir = dir || this.dir;

    this.changeDirTo(dir);
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
        } else {
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
};
