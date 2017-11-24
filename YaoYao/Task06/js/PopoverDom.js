function PopoverDom(cfg) {
    this.setup(cfg);
}

PopoverDom.prototype.setup = function (cfg) {
    cfg = cfg || {};

    console.log(cfg);

    // container.
    var div = document.createElement('div');
    this.container = div;
    this.containerCfg(cfg.container);

    // cover.
    div = document.createElement('div');
    this.container.appendChild(div);
    this.cover = div;
    this.coverCfg(cfg.cover);

    // content box.
    div = document.createElement('div');
    this.container.appendChild(div);
    this.content = div;
    this.contentCfg(cfg);

};

PopoverDom.prototype.containerCfg = function (cfg) {
    cfg = cfg || {};
    var s = this.container.style;
    s.height = '100%';
    s.width = '100%';
    s.position = 'fixed';
    s.top = 0;
    s.left = 0;
};

PopoverDom.prototype.coverCfg = function (cfg) {
    cfg = cfg || {};
    var s = this.cover.style;
    s.height = '100%';
    s.width = '100%';
    s.backgroundColor = cfg.color || 'gray';
    s.opacity = cfg.opacity || 0.3;
};

PopoverDom.prototype.contentCfg = function (cfg) {
    cfg = cfg || {};
    var s = this.content.style;
    if (cfg.height) {
        s.height = cfg.height + 'px';
    }
    if (cfg.width) {
        s.width = cfg.width + 'px';
    }
    s.position = 'absolute';
    s.opacity = 1;
    s.backgroundColor = '#FFFFFF';
    s.top = '50%';
    s.left = '50%';
    s.webkitTransform = 'translate(-50%, -50%)';
    s.mozTransform = 'translate(-50%, -50%)';
    s.msTransform = 'translate(-50%, -50%)';
    s.oTransform = 'translate(-50%, -50%)';
    s.transform = 'translate(-50%, -50%)';
};

PopoverDom.prototype.show = function () {
    document.body.appendChild(this.container);
};

PopoverDom.prototype.hide = function () {
    document.body.removeChild(this.container);
};

PopoverDom.prototype.onClick = function (target) {
    if (target === this.cover) {
        this.hide();
    }
};

PopoverDom.prototype.addItem = function (item) {
    this.content.appendChild(item);
};
