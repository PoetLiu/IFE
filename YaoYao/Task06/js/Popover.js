function Popover(cfg) {
   this.setup(cfg);
}

Popover.prototype.setup = function (cfg) {
    this.dom    = new PopoverDom(cfg);
    this.inputManager   = new PopoverInputManager();

    this.inputManager.on('click', this.onClick.bind(this));
    this.configure(cfg);
};

Popover.prototype.configure = function (cfg) {
    this.cfg    = cfg;
    this.dom.configure(cfg);
};

Popover.prototype.onClick = function (event) {
    if (this.dom.onClick(event.target)) {
        event.preventDefault();
    }
};

Popover.prototype.onDrag = function (event) {
    if (this.dom.onDrag(event.target, event)) {
        event.preventDefault();
    }
};

Popover.prototype.onDragStart = function (event) {
    if (this.dom.onDragStart(event.target, event)) {
        event.preventDefault();
    }
};
Popover.prototype.onDragEnd = function (event) {
    if (this.dom.onDragEnd(event.target, event)) {
        event.preventDefault();
    }
};
Popover.prototype.show  = function () {
    var c   = this.cfg;
    var contentDragMoveEn = c && c.content && c.content.dragToMove;
    if (contentDragMoveEn) {
        this.inputManager.on('dragstart', this.onDragStart.bind(this));
        this.inputManager.on('drag', this.onDrag.bind(this));
        this.inputManager.on('dragend', this.onDragEnd.bind(this));
    }
    this.dom.show();
};

Popover.prototype.hide  = function () {
    this.dom.hide();
};

Popover.prototype.addItem  = function (item) {
    this.dom.addItem(item);
};
