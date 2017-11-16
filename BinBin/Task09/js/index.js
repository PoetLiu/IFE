var input = document.getElementById('keyword-input');
var queryBtn = document.getElementById('query-btn');
var traverseBtn =document.getElementById('traverse-btn');
var tree = document.getElementById('tree');
var time = 0;
const interVal = 500;
var lastHighlightNode;

function showNode(node, en) {
    en ? node.className  += ' highlight' :
    node.className  = node.className.replace(' highlight', '');
}

function showNodeAuto(node, autoHideDisable) {
    if (node.localName !== 'div')
        return;

    window.setTimeout(function () {
        showNode(node, true);
    }, time);

    autoHideDisable || window.setTimeout(function () {
        showNode(node, false);
    }, time += interVal);
}

function nodeMathByKey(node, key) {
    if (!node.children || !node.children[0]) {
       return false;
    }
    console.log(node,key);
    var text = node.children[0].innerText;
    return text === key;

}

function multiTreeTraverse(t, visitNodeCB) {
    if (!t) {
       return;
    }
    visitNodeCB && visitNodeCB(t);
    for (var i = 0; i < t.children.length; i++) {
        var c = t.children[i];
        multiTreeTraverse(c, visitNodeCB);
    }
}

function clearLastData() {
    time    = 0;
    if (lastHighlightNode) {
        showNode(lastHighlightNode, false);
        lastHighlightNode   = null;
    }
}

function onQueryBtnClick() {
    if (input.value === '')
        return;

    clearLastData();
    multiTreeTraverse(tree, function (node) {
        if (lastHighlightNode) {
            return;
        }
        if (nodeMathByKey(node, input.value)) {
            lastHighlightNode   = node;
        }
        showNodeAuto(node, !!lastHighlightNode);
    });

    if (!lastHighlightNode) {
        window.setTimeout(function () {
            alert('查询结果为空');
        }, time+=interVal);
    }
}

function onTraverseBtnClick() {
    clearLastData();
    multiTreeTraverse(tree, showNodeAuto);
}

function onTreeNodeClick(e) {
    var t = e.target, p;
    while (t && t.localName !== 'div') {
        t   = t.parentNode;
    }
    p   = t.parentNode;
    p.removeChild(t);
}

function init() {
    queryBtn.addEventListener('click', onQueryBtnClick);
    traverseBtn.addEventListener('click', onTraverseBtnClick);
    tree.addEventListener('click', onTreeNodeClick);
}

init();