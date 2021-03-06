function init() {
    var container = document.getElementById('container');

    var cfg = {
        'width': 850,
        'height': 200,
        'text-align': 'center',
        'border-collapse': 'collapse',
        'border': 'solid 1px gray',
        'content': {
            sortAble: [0, 1, 1, 1, 1],
            data: [
                ['姓名', '语文', '数学', '英语', '总分'],
                ['小明', 80, 90, 70, 240],
                ['小红', 90, 60, 90, 240],
                ['小亮', 60, 100, 70, 230],
            ]
        },
        'addTable': function (tb) {
            container.appendChild(tb);
        },
        'sort': function (order, col, content) {
            console.log("Call outer sort func.");
            var d = content.data;
            var body = d.splice(1);
            body.sort( function (a, b) {
                var n1 = parseInt(a[col]), n2 = parseInt(b[col]);
                return order === 'ascend'? n1 > n2 : n1 < n2;
            });
            content.data   = d.concat(body);
        },
    };

    var table = new Table(cfg);
}

init();