function ChessBoard(row, col, rowHeight, colWidth) {
    this.row = row;
    this.col = col;
    this.rowH = rowHeight;
    this.colW = colWidth;
}

ChessBoard.prototype.serialize = function () {
    return {
        row: this.row,
        rowH: this.rowH,
        col: this.col,
        colW: this.colW
    };
};