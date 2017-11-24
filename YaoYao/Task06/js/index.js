function init() {
    var pop = new Popover({width: 610, height:305});
    var content = document.createElement('div');
    content.innerHTML   = 'Hello, World';
    content.style.padding   = '10px';
    pop.addItem(content);

    var showBtn = document.getElementById('showPopBtn');
    showBtn.addEventListener('click', function () {
        // console.log(pop);
        pop.show();
    });
}

init();