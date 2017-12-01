function Table(cfg) {
   this.cfg = cfg;
   this.setup();
}

Table.prototype.setup = function (cfg) {
   cfg = cfg || this.cfg;

   var tb   = document.createElement('table');
   var s    = tb.style;
   if (cfg.width) {
       s.width  = cfg.width + 'px';
   }
    if (cfg.height) {
        s.height    = cfg.height + 'px';
    }

    if (cfg.border) {
        s.border    = cfg.border;
    }

    if (cfg.textAlign) {
       s.textAlign  = cfg.textAlign;
    }
};
