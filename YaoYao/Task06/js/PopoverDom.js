function PopoverDom(cfg) {
    this.setup(cfg);
}

PopoverDom.prototype.setup = function (cfg) {
    // container.
    var div = document.createElement('div');
    this.container = div;

    // cover.
    div = document.createElement('div');
    this.container.appendChild(div);
    this.cover = div;

    // content box.
    div = document.createElement('div');
    this.container.appendChild(div);
    this.content = div;

    this.configure(cfg, true);
};

PopoverDom.prototype.configure = function (cfg, init) {
    cfg = cfg || {};

    console.log(cfg);
    if (cfg.container || init) {
        this.containerCfg(cfg.container);
    }

    if (cfg.cover || init) {
        this.coverCfg(cfg.cover);
    }

    if (cfg.content || init) {
        this.contentCfg(cfg.content);
    }
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

    console.log(cfg);
    var s = this.content.style;
    if (cfg.height) {
        s.height = cfg.height + 'px';
    }
    if (cfg.width) {
        s.width = cfg.width + 'px';
    }
    if (cfg.border) {
        s.border = cfg.border;
    }
    s.position = 'absolute';
    s.opacity = 1;
    s.backgroundColor = '#FFFFFF';

    var contentDragMove = cfg && cfg.dragToMove;
    console.log(cfg, contentDragMove);
    if (contentDragMove) {
        s.top   = (document.body.offsetHeight-cfg.height)/2 + 'px';
        s.left  = (document.body.offsetWidth-cfg.width)/2 + 'px';
        s.webkitTransform   = 'none';
        s.mozTransform  = 'none';
        s.msTransform   = 'none';
        s.oTransform    = 'none';
        s.transform     = 'none';
    } else {
        s.top   = '50%';
        s.left  = '50%';
        s.webkitTransform = 'translate(-50%, -50%)';
        s.mozTransform = 'translate(-50%, -50%)';
        s.msTransform = 'translate(-50%, -50%)';
        s.oTransform = 'translate(-50%, -50%)';
        s.transform = 'translate(-50%, -50%)';
    }

};

PopoverDom.prototype.show = function () {
    document.body.appendChild(this.container);
};

PopoverDom.prototype.hide = function () {
    document.body.removeChild(this.container);
};

PopoverDom.prototype.onClick = function (target) {
    if (target === this.cover) {
        return true;    // is need hide or not.
    }
};

PopoverDom.prototype.onDrag = function (target, data) {
    if (target === this.content) {
        var s = this.content.style, d = this.dragData;
        s.left  = (parseInt(s.left)+data.clientX-d.startX) + 'px';
        s.top   = (parseInt(s.top)+data.clientY-d.startY) + 'px';
        console.log("Dragging!", data, s.top, s.left, d);
        this.dragData = {startX:data.clientX, startY:data.clientY};
        return true;
    }
};

PopoverDom.prototype.onDragStart = function (target, data) {
    if (target === this.content) {
        var s = this.content.style;
        this.dragData = {startX:data.clientX, startY:data.clientY};
        console.log("Drag Start!", data, s.top, s.left, this.dragData);
        return true;
    }
};

PopoverDom.prototype.onDragEnd = function (target, data) {
    if (target === this.content) {
        this.dragData   = null;
        return true;
    }
};

PopoverDom.prototype.addItem = function (item) {
    this.content.appendChild(item);
};
