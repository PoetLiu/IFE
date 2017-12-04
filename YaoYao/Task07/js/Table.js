function Table(cfg) {
    this.setup(cfg);
}

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

Table.prototype.sort = function (order, col) {
    var c = this.cfg.content;
    // Sort table body, dose not include th.
    var body = c.data.splice(1);
    body.sort(function (a, b) {
        var n1 = parseInt(a[col]), n2 = parseInt(b[col]);
        return order === 'ascend' ? n1 > n2 : n1 < n2;
    });
    c.data = c.data.concat(body);
};

Table.prototype.sortAndUpdate = function (order, col) {
    var sort = this.cfg.sort || this.sort;
    sort.call(this, order, col, this.cfg.content);
    this.setContent();
};

Table.prototype.upSortBtnClick = function (e) {
    this.sortAndUpdate('ascend', e.target.parentNode.id);
};

Table.prototype.downSortBtnClick = function (e) {
    this.sortAndUpdate('descend', e.target.parentNode.id);
};

Table.prototype.tdAddSortBtn = function (td, id) {
    var div = document.createElement('div');
    div.className += 'arrow-up';
    td.appendChild(div);
    div.addEventListener('click', this.upSortBtnClick.bind(this));

    div = document.createElement('div');
    div.className += 'arrow-down';
    td.appendChild(div);
    div.addEventListener('click', this.downSortBtnClick.bind(this));

    td.id = id;
};

Table.prototype.setContent = function (content) {
    var c = content || this.cfg.content;
    var self = this, isHead = true, i = 0;

    this.dom.innerHTML = '';
    c.data.forEach(function (t) {
        var tr = document.createElement('tr');
        t.forEach(function (t2) {
            var td = document.createElement(isHead ? 'th' : 'td');
            td.innerHTML += t2;
            if (isHead && c.sortAble[i++]) {
                self.tdAddSortBtn(td, i - 1);
            }
            tr.appendChild(td);
        });
        isHead = false;
        self.dom.appendChild(tr);
    });
};
