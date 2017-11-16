var input = document.getElementById('keyword-input');
var queryBtn = document.getElementById('query-btn');
var traverseBtn =document.getElementById('traverse-btn');
var nodeInput = document.getElementById('node-input');
var addNodeBtn = document.getElementById('add-node-btn');
var delNodeBtn = document.getElementById('del-node-btn');

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

function delTreeNode(t) {
    var p = t.parentNode;
    p.removeChild(t);
}

function findNodeContainDiv(t) {
    while (t && t.localName !== 'div') {
        t   = t.parentNode;
    }
    return t;
}

function onTreeNodeClick(e) {
    clearLastData();

    var t = findNodeContainDiv(e.target);
    lastHighlightNode   = t;
    showNode(t, true);
}

function onDelNodeBtnClick() {
    if (!lastHighlightNode) {
        alert('请先选择需要删除的结点');
       return;
    }
    delTreeNode(lastHighlightNode);
    clearLastData();
}

function onAddNodeBtnClick() {
    if (!lastHighlightNode) {
        alert('请先选择需要插入结点的位置');
       return;
    }

    if (nodeInput.value === '') {
        alert('请先输入新节点的内容');
        return;
    }

    var content = nodeInput.value;
    var p = lastHighlightNode;
    var node = document.createElement('div');
    node.innerHTML= '<span>'+content+'</span>';
    p.appendChild(node);
}

function init() {
    queryBtn.addEventListener('click', onQueryBtnClick);
    traverseBtn.addEventListener('click', onTraverseBtnClick);
    delNodeBtn.addEventListener('click', onDelNodeBtnClick);
    addNodeBtn.addEventListener('click', onAddNodeBtnClick);

    tree.addEventListener('click', onTreeNodeClick);
}

init();