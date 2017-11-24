function init() {
    var pop = new Popover();
    pop.cfg(
        {
            cover: {
                color: 'gray',
                opacity: 0.5
            },
            content: {
                width: 610,
                height: 305,
                border: 'solid 1px black'
            }
        });

    var content = document.createElement('div');
    content.innerHTML = '<h1>Hello, World!</h1>';
    content.style.padding = '10px';
    pop.addItem(content);

    var showBtn = document.getElementById('showPopBtn');
    showBtn.addEventListener('click', function () {
        // console.log(pop);
        pop.show();
    });
}

init();