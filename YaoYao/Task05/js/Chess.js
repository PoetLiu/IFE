function Chess(x, y, dir, border) {
    this.x = x;
    this.y = y;
    this.dir = dir || 'up';
    this.deg = 0;
    this.border = border;
    this.dirDegMap = {
        'up': {
            deg: 0,
            pos: {
                x: 0,
                y: -1
            }
        },
        'right': {
            deg: 90,
            pos: {
                x: 1,
                y: 0
            }
        },
        'down': {
            deg: 180,
            pos: {
                x: 0,
                y: 1
            }
        },
        'left': {
            deg: 270,
            pos: {
                x: -1,
                y: 0
            }
        }
    };
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

Chess.prototype.degToDir = function (deg) {
    var m = this.dirDegMap;
    var d1 = deg % 360, d2 = d1 > 0 ? d1 - 360 : 360 + d1;
    // console.log('deg To dir', deg, d1, d2);
    for (var key in m) {
        if (m[key]['deg'] === d1 || m[key]['deg'] === d2) {
            return key;
        }
    }
    return null;
};

Chess.prototype.dirToDeg = function (dir) {
    return this.dirDegMap[dir]['deg'];
};

Chess.prototype.dirToPositionChange = function (dir) {
    return this.dirDegMap[dir]['pos'];
};

Chess.prototype.rotate = function (deg) {
    this.deg = deg;
    this.dir = this.degToDir(deg);
    // console.log(deg, this.dir);
};

Chess.prototype.changeDirTo = function (dir) {
    if (this.dir === dir) {
        return;
    }

    var deg = this.deg % 360;
    var d1 = this.dirToDeg(dir) || (deg < 0 ? -360 : 0), d2 = d1 > 0 ? d1 - 360 : 360 + d1;
    var dd1 = d1 - deg, dd2 = d2 - deg;

    console.log("ChangeDir:" + dir, "now deg:" + this.deg, "deg:" + deg, "d1:" + d1, "d2:" + d2, dd1, dd2);
    if (Math.abs(dd1) < Math.abs(dd2)) {
        deg = dd1;
    } else {
        deg = dd2;
    }
    // Rotate
    this.rotate(this.deg + deg);
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
    var pc = this.dirToPositionChange(dir);
    this.x += pc.x;
    this.y += pc.y;
};