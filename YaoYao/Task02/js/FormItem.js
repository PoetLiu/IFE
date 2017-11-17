function FormItem(f, id, type, resultString) {
    this.f  = f;
    this.id = id;
    this.dom = document.getElementById(id);
    this.type = type;
    this.resultStrings = resultString;
    this.checker = getCheckerByType(type);
    this.resultDom  = document.getElementById(type+f.resIdPostFix);
}

FormItem.prototype.getResultStr = function (type) {
    return this.resultStrings[type];
};

FormItem.prototype.updateResult = function (retType, highlight) {
    this.resultDom.innerHTML = this.getResultStr(retType);
    this.highlightSelf(retType !== 'valid' && highlight);
    this.highlightResult(highlight);
};

FormItem.prototype.checkAndUpdateResult = function () {
    this.updateResult(this.checker(), true);
};

FormItem.prototype.highlightSelf = function (en) {
    highlightElement(this.dom, this.f.highlightBorder, en);
};

FormItem.prototype.highlightResult = function (en) {
    highlightElement(this.resultDom, this.f.highlight, en);
};

function highlightElement(e, className, highlight) {
    if (highlight) {
        if (e.className.indexOf(className) === -1) {
            e.className += className;
        }
    } else {
        e.className = e.className.replace(className, '');
    }
}

function getCheckerByType(type) {
    switch (type) {
        case 'name':
            return nameValidCK;
        case 'pwd':
            return pwdValidCK;
        case 're-pwd':
            return rePwdValidCK;
        case 'email':
            return emailValidCK;
        case 'phone':
            return phoneValidCK;
        default:
            return null;
    }
}

const minNameInput = 4;
const maxNameInput = 16;
function nameValidCK() {
    var name = this.dom.value;
    var charNumCnt = 0;

    if (name === '') {
        return 'empty';
    }

    for (var i = 0; i < name.length; i++) {
        if (name.charAt(i).match(/[\u0000-\u00ff]/)) {
            charNumCnt++;
        } else {
            charNumCnt += 2;
        }
    }
    return (charNumCnt >= minNameInput && charNumCnt <= maxNameInput) ? 'valid' : 'invalid';
}

function pwdValidCK() {
    var pwd = this.dom.value;
    if (pwd === '') {
        return 'empty';
    }

}

function rePwdValidCK() {
    var pwd = this.f.getItemByType('pwd').dom.value;
    var rePwd = this.dom.value;

    if (rePwd === '') {
        return 'empty';
    }

    return pwd === rePwd ? 'valid' : 'invalid';
}

function emailValidCK() {
    var email = this.dom.value;
    if (email === '') {
        return 'empty';
    }
}

function phoneValidCK() {
    var phone = this.dom.value;
    if (phone === '') {
        return 'empty';
    }
}