var userInfoForm;

var nameResStr = {
    init: '必填，长度为4~16个字符',
    empty: '姓名不能为空',
    valid: '名称格式正确',
    invalid: '名称格式错误'
};

var pwdResStr = {
    init: '必填，清输入密码，长度为8~16个字符(必须包含数字、小写大写英文字母)',
    empty: '密码不能为空',
    valid: '密码可用',
    invalid: '密码格式错误'
};

var rePwdResStr = {
    init: '必填，请重新输入密码',
    empty: '密码不能为空',
    valid: '两次输入密码一致',
    invalid: '两次输入密码不一致'
};

var emailResStr = {
    init: '必填，请输入邮箱地址',
    empty: '邮箱不能为空',
    valid: '邮箱格式正确',
    invalid: '邮箱格式错误'
};

var phoneResStr = {
    init: '必填, 请输入11位数字手机号码',
    empty: '手机号码不能为空',
    valid: '手机号码格式正确',
    invalid: '手机号码格式错误'
};

const highlightClassName = ' highlight ';
const highlightBorderClassName = ' highlight-border ';

function init() {
    var f = new Form(
        'user-info-form',
        '-check-result',
        highlightClassName,
        highlightBorderClassName);
    f.addItems(new FormItem(f, 'name-input', 'name', nameResStr));
    f.addItems(new FormItem(f, 'pwd-input', 'pwd', pwdResStr));
    f.addItems(new FormItem(f, 're-pwd-input', 're-pwd', rePwdResStr));
    f.addItems(new FormItem(f, 'email-input', 'email', emailResStr));
    f.addItems(new FormItem(f, 'phone-input', 'phone', phoneResStr));

    userInfoForm = f;

    var checkBtn = document.getElementById('check-btn');
    checkBtn.addEventListener('click', function () {
        if (!f.doCheck()) {
            alert('输入有误！');
        }
    });
}

function formCheck() {
    // return userInfoForm.doCheck();
    return false;
}

init();