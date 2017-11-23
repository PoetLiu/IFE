function InputManager() {
    this.events = {};

    this.listen();
}

InputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

InputManager.prototype.emit = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (cb) {
            cb(event, data);
        });
    }
};

InputManager.prototype.listen = function () {
    var self = this;
    var map = {
        'move': {
            'w': 'up',
            'MOV TOP': 'up',
            'GO': 'up',
            'd': 'right',
            'MOV RIG': 'right',
            's': 'down',
            'MOV BOT': 'down',
            'a': 'left',
            'MOV LEF': 'left'
        },
        'turn': {
            'TUN LEF': 'left',
            'TUN RIG': 'right',
            'TUN BAC': 'back'
        },
        'transfer': {
            'TRA TOP': 'up',
            'TRA BOT': 'down',
            'TRA LEF': 'left',
            'TRA RIG': 'right'
        }
    };

    function onExeBtnClick(e) {
        var cmdInput = document.getElementById('cmd-input');
        if (cmdMapAndEmit(cmdInput.value)) {
            e.preventDefault || e.preventDefault();
        }
    }

    function cmdMapAndEmit(cmd) {
        var mapped = false;
        for (var event in map) {
            var mapped = map[event][cmd];
            if (mapped !== undefined) {
                self.emit(event, mapped);
                mapped = true;
            }
        }
        return mapped;
    }

    document.getElementById('exe-btn').addEventListener('click', onExeBtnClick);
    document.addEventListener('keydown', function (event) {
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
            event.shiftKey;

        if (!modifiers) {
            if (cmdMapAndEmit(event.key)) {
                event.preventDefault();
            }
        }

        if (event.keyCode === 13) {
            onExeBtnClick(event);
        }

    });
};