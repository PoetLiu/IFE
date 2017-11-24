function PopoverDom(cfg) {
   this.setup(cfg);
}

PopoverDom.prototype.setup  = function (cfg) {
   var container = document.createElement('div');
   var s = container.style;
   cfg  = cfg || {};

   console.log(cfg);
   // container.
   s.height = '100%';
   s.width  = '100%';
   s.position   = 'fixed';
   s.top    = 0;
   s.left   = 0;

   // cover.
    var cover   = document.createElement('div');
    s   = cover.style;
    s.height = '100%';
    s.width  = '100%';
    s.backgroundColor   = cfg.color || 'gray';
    s.opacity   = cfg.opacity || 0.3;
    container.appendChild(cover);

    // content box.
    var content = document.createElement('div');
    s   = content.style;
    if (cfg.height) {
        s.height = cfg.height+'px';
    }
    if (cfg.width) {
        s.width = cfg.width+'px';
    }
    s.position  = 'absolute';
    s.opacity   = 1;
    s.backgroundColor   = '#FFFFFF';
    s.top   = '50%';
    s.left  = '50%';
    s.webkitTransform = 'translate(-50%, -50%)';
    s.mozTransform    = 'translate(-50%, -50%)';
    s.msTransform     = 'translate(-50%, -50%)';
    s.oTransform      = 'translate(-50%, -50%)';
    s.transform       = 'translate(-50%, -50%)';
    container.appendChild(content);

    this.container  = container;
    this.cover      = cover;
    this.content    = content;
};

PopoverDom.prototype.show   = function () {
    document.body.appendChild(this.container);
};

PopoverDom.prototype.hide   = function () {
    document.body.removeChild(this.container);
};

PopoverDom.prototype.onClick = function (target) {
    if (target === this.cover) {
        this.hide();
    }
};

PopoverDom.prototype.addItem  = function (item) {
    this.content.appendChild(item);
};
