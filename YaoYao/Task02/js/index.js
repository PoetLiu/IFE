const minChrInput = 4;
const maxChrInput = 16;
const highlightClassName = ' highlight ';
const highlightBorderClassName = ' highlight-border ';
var nameInput = document.getElementById('name-input');
var nameCheckResult = document.getElementById('name-check-result');
var checkBtn = document.getElementById('check-btn');

var resultStr = {
    init:   '必填，长度为4~16个字符',
    empty:  '姓名不能为空',
    valid:  '名称格式正确',
    invalid:'名称格式错误'
};

function nameValidCK(name) {
    var charNumCnt = 0;

    console.log(name);
    for(var i = 0; i < name.length; i++) {
        if (name.charAt(i).match(/[\u0000-\u00ff]/)) {
            charNumCnt++;
        } else {
            charNumCnt  += 2;
        }
    }
    return (charNumCnt >= minChrInput && charNumCnt <= maxChrInput);
}

function onCKBtnClick() {
    var name = nameInput.value;
    if (name === '') {
        updateCKResult('empty', true);
        return;
    }

    var result =  nameValidCK(name);
    updateCKResult(result?'valid':'invalid', true);
}

function highlightElement(e, className, highlight) {
     if (highlight) {
        if (e.className.indexOf(className) === -1) {
            e.className += className;
        }
    } else {
        e.className   = e.className.replace(className, '');
    }
}

function updateCKResult(type, highlight) {
    checkResult.innerHTML = resultStr[type];
    highlightElement(checkResult, highlightClassName, highlight);
    highlightElement(nameInput, highlightBorderClassName, type!=='valid' && highlight);
}

function init() {
    // updateCKResult('init');
    // checkBtn.addEventListener('click', onCKBtnClick);
}

init();