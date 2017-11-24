function PopoverInputManager() {
    this.events = {};
    this.listen();
}

PopoverInputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event]  = [];
    }
    this.events[event].push(callback);
};

PopoverInputManager.prototype.emit = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (cb) {
            console.log(event, data);
            cb(data);
        });
    }
};

PopoverInputManager.prototype.listen    = function () {
    var self    = this;

    document.addEventListener('click', function (event) {
       self.emit('click', event);
       event.preventDefault();
    });

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove() {
        self.emit('drag', event);
    }

    function onMouseDown() {
        self.emit('dragstart', event);
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseUp() {
        self.emit('dragend', event);
        document.removeEventListener('mousemove', onMouseMove);
    }

};