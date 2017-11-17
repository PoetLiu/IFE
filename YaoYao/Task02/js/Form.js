
function Form(id, resultIdPostFix, highlight, highlightBorder) {
   this.id  = id;
   this.resIdPostFix = resultIdPostFix;
   this.items = [];
   this.highlight   = highlight;
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
   this.items.forEach(function (item) {
        item.checkAndUpdateResult();
   });
};