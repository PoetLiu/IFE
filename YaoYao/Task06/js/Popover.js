function Popover(cfg) {
   this.setup(cfg);
}

Popover.prototype.setup = function (cfg) {
    this.dom    = new PopoverDom(cfg);
    this.inputManager   = new PopoverInputManager();

    this.inputManager.on('click', this.onClick.bind(this));
};

Popover.prototype.cfg   = function (cfg) {
    this.dom.cfg(cfg);
};

Popover.prototype.onClick = function (target) {
    this.dom.onClick(target);
};

Popover.prototype.show  = function () {
    this.dom.show();
};

Popover.prototype.hide  = function () {
    this.dom.hide();
};

Popover.prototype.addItem  = function (item) {
    this.dom.addItem(item);
};
