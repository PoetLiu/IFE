var radioInfo = {
    'undergraduate':'school',
    'graduate':'employer'
};

function blockShow(b, en) {
    b.style.display = en ? 'block' : 'none';
}

function divShowAndHideOthers(id) {
    var div = document.getElementById(radioInfo[id]);
    blockShow(div, true);

    for (var r in radioInfo) {
        console.log(r);
        if (r !== id) {
            div = document.getElementById(radioInfo[r]);
            blockShow(div, false);
        }
    }
}

function onRadioClick(e) {
    var id = e.target.id;
    divShowAndHideOthers(id);
}

function init() {
    console.log('init');
    var radioIds = Object.keys(radioInfo);
    for (var i = 0; i < radioIds.length; i++) {
       var radio = document.getElementById(radioIds[i]);
        radio.addEventListener('click', onRadioClick);
    }
    divShowAndHideOthers(radioIds[0]);
}

init();
