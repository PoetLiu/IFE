function Table(cfg) {
    this.setup(cfg);
};

Table.prototype.setup = function (cfg) {
    cfg = cfg || this.cfg;

    var tb = document.createElement('table');
    var s = tb.style;

    if (!cfg.addTable) {
        console.log("addTable callback required!");
        return -1;
    }

    if (cfg.width) {
        s.width = cfg.width + 'px';
    }
    if (cfg.height) {
        s.height = cfg.height + 'px';
    }

    if (cfg.border) {
        s.border = cfg.border;
    }

    if (cfg.textAlign) {
        s.textAlign = cfg.textAlign;
    }

    this.dom = tb;
    this.cfg = cfg;
    this.setContent(cfg.content);
    cfg.addTable(tb);
};

Table.prototype.setContent = function (content) {
    var c = content || this.cfg.content;
    var self = this, isHead = true;

    c.data.forEach(function (t) {
        var tr = document.createElement('tr');
        t.forEach(function (t2) {
            var td = document.createElement(isHead?'th':'td');
            td.innerHTML = t2;
            tr.appendChild(td);
        });
        isHead  = false;
        self.dom.appendChild(tr);
    });
};
