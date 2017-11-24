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
            cb(data);
        });
    }
};

PopoverInputManager.prototype.listen    = function () {
    var self    = this;
    document.addEventListener('click', function (event) {
       self.emit('click', event.target);
       event.preventDefault();
    });
};