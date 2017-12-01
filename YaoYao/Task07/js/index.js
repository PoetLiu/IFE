function init() {
    var cfg = {
        'width': 850,
        'height': 200,
        'text-align': 'center',
        'border-collapse': 'collapse',
        'content': {
            'head': ['姓名', '语文', '数学', '英语', '总分'],
            'body': [
                ['小明', 80, 90, 70, 240],
                ['小红', 90, 60, 90, 240],
                ['小亮', 60, 100, 70, 230],
            ]
        },
    };

    var table = new Table(cfg);
}

init();