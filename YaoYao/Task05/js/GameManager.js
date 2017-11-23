function GameManager(col, row, colWidth, rowHeight, Actuator, InputManager) {
    this.actuator = new Actuator;
    this.inputManager = new InputManager;
    this.chessBoard = new ChessBoard(col, row, rowHeight, colWidth);
    this.chess = new Chess(random(0, col),
        random(0, row),
        'up',
        this.chessBoard);
    this.setup();
}

function random(min, max) {
    return Math.floor(Math.random() * max) - min;
}

GameManager.prototype.setup = function () {
    this.inputManager.on('move', this.chessOperate.bind(this));
    this.inputManager.on('turn', this.chessOperate.bind(this));
    this.inputManager.on('transfer', this.chessOperate.bind(this));

    this.actuate();
};

GameManager.prototype.actuate = function () {
    this.actuator.actuate(
        this.chess,
        this.chessBoard
    );
};

GameManager.prototype.chessOperate = function (type, dir) {
    var c = this.chess;
    switch (type) {
        case 'turn':
            c.turn(dir);
            break;
        case 'move':
            c.move(dir);
            break;
        case 'transfer':
            c.move(dir, true);
            break;
    }

    this.actuate();
};
