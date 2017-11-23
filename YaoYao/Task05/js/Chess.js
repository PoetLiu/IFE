function Chess(x, y, dir, border) {
    this.x = x;
    this.y = y;
    this.dir = dir || 'up';
    this.deg = 0;
    this.border = border;
}

Chess.prototype.serialize = function () {
    return {
        x: this.x,
        y: this.y,
        dir: this.dir
    };
};

Chess.prototype.willHitBorder = function (dir, border) {
    var b = border || this.border;
    var col = b.col, row = b.row;
    var d = dir || this.dir;
    var x = this.x, y = this.y;
    // console.log(x, y, col, row, d, this);
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

    this.deg = deg;
    this.dir = degToDir(deg);

    function degRound(deg) {
        if (deg < 0) {
            deg += 360;
        } else if (deg >= 360) {
            deg -= 360;
        }
        return deg;
    }

    function degToDir(deg) {
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