function GameManager(col, row, colWidth, rowHeight, Actuator, InputManager) {
    this.inputManager = new InputManager;
    this.actuator = new Actuator;
    this.col = col;
    this.row = row;
    this.rowH = rowHeight;
    this.colW = colWidth;

    this.setup();
}

function random(min, max) {
    return Math.floor(Math.random() * max) - min;
}

GameManager.prototype.setup = function () {
    this.chessBoard = new ChessBoard(
        this.col,
        this.row,
        this.rowH,
        this.colW);

    this.chess = new Chess(
        random(0, this.col),
        random(0, this.row),
        'up', this.chessBoard);

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
