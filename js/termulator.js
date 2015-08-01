;(function(Termulator) {
    function Termulator(options) {
        var self = this;

        if (!(this instanceof Termulator)) {
            return new Termulator(arguments[0], arguments[1], arguments[2]);
        }

        if (typeof options === 'number') {
            options = {
                cols: arguments[0],
                rows: arguments[1],
                container: arguments[2]
            };
        }

        options = options || {};

        this.cols = options.cols || Termulator.defaults.cols;
        this.rows = options.rows || Termulator.defaults.cols;
        this.commands = options.commands || Termulator.defaults.commands;

    }

    Termulator.defaults = {
        cols: 80,
        rows: 50,
        commands: ['help']

    }

    Termulator.prototype.handlers = function(commands) {
        var i;
        for (i = 0; i < commands.length; i++) {
            console.log(commands[i]);
        }
    };

    Termulator.prototype.draw = function(container) {
        container = window.document.getElementById(container);
        container.classList.add('terminalWindow');
        container.style.width = this.cols + 'px';
        debugger;
    };
    this.Termulator = Termulator;

}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());