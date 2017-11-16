const minChrInput = 4;
const maxChrInput = 16;
const highlightClassName = ' highlight ';
var nameInput = document.getElementById('name-input');
var nameCKBtn = document.getElementById('name-check-btn');
var checkResult = document.getElementById('check-result');
var resultStr = {
    init:   '必填，长度为4-16个字符',
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

function updateCKResult(type, highlight) {
    checkResult.innerHTML = resultStr[type];
    if (highlight) {
        if (checkResult.className.indexOf(highlightClassName) === -1) {
            checkResult.className += highlightClassName;
        }
    } else {
        checkResult.className   = checkResult.className.replace(highlightClassName, '');
    }
}

function init() {
    updateCKResult('init');
    nameCKBtn.addEventListener('click', onCKBtnClick);
}

init();