function Form(id, resultIdPostFix, highlight, highlightBorder) {
    this.id = id;
    this.resIdPostFix = resultIdPostFix;
    this.items = [];
    this.highlight = highlight;
    this.highlightBorder = highlightBorder;
}

Form.prototype.addItems = function (item) {
    item.dom.addEventListener('focus', function () {
        item.updateResult('init', true);
    });
    item.dom.addEventListener('blur', function () {
        item.checkAndUpdateResult();
    });
    this.items.push(item)
};

Form.prototype.doCheck = function () {
    var ret = true;
    var ckRes;
    this.items.forEach(function (item) {
        ckRes = item.checkAndUpdateResult();
        if (ret && !ckRes) {
            ret = false;
        }
    });
    return ret;
};

Form.prototype.getItemByType = function (type) {
    var ret = null;
    this.items.forEach(function (item) {
        // console.log(item, type);
        if (!ret && item.type === type) {
            ret = item;
        }
    });
    return ret;
};

