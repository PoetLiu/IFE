var input = document.getElementById('keyword-input');
var queryBtn = document.getElementById('query-btn');
var traverseBtn =document.getElementById('traverse-btn');
var tree = document.getElementById('tree');
var time = 0, interVal = 500;
var lastMatchNode;

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
       return null;
    }
    console.log(node,key);
    var text = node.children[0].innerText;
    if (text === key) {
        return node;
    }
    return null;
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
    if (lastMatchNode) {
        showNode(lastMatchNode, false);
        lastMatchNode   = null;
    }
}

function onQueryBtnClick() {
    if (input.value === '')
        return;

    clearLastData();
    multiTreeTraverse(tree, function (node) {
        if (lastMatchNode) {
            return;
        }
        lastMatchNode  = nodeMathByKey(node, input.value);
        showNodeAuto(node, lastMatchNode);
    });

    if (!lastMatchNode) {
        window.setTimeout(function () {
            alert('查询结果为空');
        }, time+=interVal);
    }
}

function onTraverseBtnClick() {
    clearLastData();
    multiTreeTraverse(tree, showNodeAuto);
}

function init() {
    queryBtn.addEventListener('click', onQueryBtnClick);
    traverseBtn.addEventListener('click', onTraverseBtnClick);
}

init();