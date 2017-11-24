function Popover(config) {
   this.setup(config);
}

Popover.prototype.setup = function (config) {
    this.dom    = new PopoverDom(config);
    this.inputManager   = new PopoverInputManager();

    this.inputManager.on('click', this.onClick.bind(this));
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
