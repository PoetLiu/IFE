function FormItem(f, id, type) {
    this.f  = f;
    this.id = id;
    this.dom = document.getElementById(id);
    this.type = type;
    this.resultStrings = f.getResultStrByType(type);
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
    var ckRes = this.checker();
    this.updateResult(ckRes, true);
    return ckRes === 'valid';
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

function numInInterVal(n, min, max) {
   return  (n >= min && n <= max);
}

const minNameLen = 4;
const maxNameLen = 16;
function nameValidCK(name) {
    name = name || this.dom.value;
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
    return numInInterVal(name.length, minNameLen, maxNameLen)?
        'valid' : 'invalid';
}

const minPWDLen = 8;
const maxPWDLen = 16;
function pwdValidCK(pwd) {
    pwd = pwd || this.dom.value;
    if (pwd === '') {
        return 'empty';
    }
    return numInInterVal(pwd.length, minPWDLen, maxPWDLen) &&
        pwd.match(/\d+[a-z]+[A-Z]+/) ? 'valid' : 'invalid';
}

function rePwdValidCK(pwd, rePwd) {
    pwd = pwd || this.f.getItemByType('pwd').dom.value;
    rePwd = rePwd || this.dom.value;

    if (rePwd === '') {
        return 'empty';
    }

    return pwd === rePwd ? 'valid' : 'invalid';
}

function emailValidCK(email) {
    email = email || this.dom.value;
    if (email === '') {
        return 'empty';
    }

    return email.match(/\w+@\w+\.com$/) ? 'valid' : 'invalid';
}

var phoneNumberBits = 11;
function phoneValidCK(phone) {
    phone = phone || this.dom.value;
    if (phone === '') {
        return 'empty';
    }

    var regExp = '^\\d{'+phoneNumberBits+'}$';
    // console.log(regExp);
    var reObj = new RegExp(regExp, '');
    return phone.match(reObj) ? 'valid' : 'invalid';
}