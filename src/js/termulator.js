function processCommand(string, fn) {
    var args = string.replace(/^\s+|\s+$/g, '').split(/(\s+)/);
    var rest = string.replace(/^[^\s]+\s*/, '');
    return {
        name: args[0],
        args: fn(rest),
        rest: rest
    };
}
var command_re = /('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])+\/[gimy]*|(\\ |[^ ])+|[\w-]+)/g;
function parseArguments(string) {
    return $.map(string.match(command_re) || [], function(arg) {
        if (arg[0] === "'" && arg[arg.length-1] === "'") {
            return arg.replace(/^'|'$/g, '');
        } else if (arg[0] === '"' && arg[arg.length-1] === '"') {
            arg = arg.replace(/^"|"$/g, '').replace(/\\([" ])/g, '$1');
            return arg.replace(/\\\\|\\t|\\n/g, function(string) {
                if (string[1] === 't') {
                    return '\t';
                } else if (string[1] === 'n') {
                    return '\n';
                } else {
                    return '\\';
                }
            }).replace(/\\x([0-9a-f]+)/gi, function(_, hex) {
                return String.fromCharCode(parseInt(hex, 16));
            }).replace(/\\0([0-7]+)/g, function(_, oct) {
                return String.fromCharCode(parseInt(oct, 8));
            });
        } else if (arg.match(/^\/(\\\/|[^\/])+\/[gimy]*$/)) {
            var m = arg.match(/^\/([^\/]+)\/([^\/]*)$/);
            return new RegExp(m[1], m[2]);
        } else if (arg.match(/^-?[0-9]+$/)) {
            return parseInt(arg, 10);
        } else if (arg.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
            return parseFloat(arg);
        } else {
            return arg.replace(/\\ /g, ' ');
        }
    });
}
// -----------------------------------------------------------------------
// :: Split arguments: it only strips single and double quotes and escapes
// :: spaces
// -----------------------------------------------------------------------
function splitArguments (string) {
    return $.map(string.match(command_re) || [], function(arg) {
        if (arg[0] === "'" && arg[arg.length-1] === "'") {
            return arg.replace(/^'|'$/g, '');
        } else if (arg[0] === '"' && arg[arg.length-1] === '"') {
            return arg.replace(/^"|"$/g, '').replace(/\\([" ])/g, '$1');
        } else if (arg[0] === '/' && arg[arg.length-1] == '/') {
            return arg;
        } else {
            return arg.replace(/\\ /g, ' ');
        }
    });
}
// -----------------------------------------------------------------------
// :: Function that returns an object {name,args}. Arguments are parsed
// :: using the function parseArguments
// -----------------------------------------------------------------------
function parseCommand (string) {
    return processCommand(string, $.terminal.parseArguments);
}
// -----------------------------------------------------------------------
// :: Same as parseCommand but arguments are parsed using splitArguments
// -----------------------------------------------------------------------
function splitCommand (string) {
    return processCommand(string, $.terminal.splitArguments);
}

var commandList = {
    help: function(name, args, flags, term) {
        term.echo(helpMenu[name]);
    }
}
function processFlags(command) {
    var flags = command.args
}
var helpMenu = {
    help: "terminal commands: \n help        show this menu \n ping        connect with another computer via IP address",
    ping: "Connect with another device via IP address"
}
function runCommand (commandName, args, flags, term) {
    commandList[commandName](commandName, args, flags, term);
}

$('#terminal').terminal( function(args, term){
    var command = processCommand(args, parseArguments);
    runCommand(command.name, command.args, command.rest, term);
}, {
    prompt: '> ',
    greetings: '193u4.194u234lk login successful',
    name: 'main-window',
    history: true,
    height: 500,
    width: 400,
    checkArity: false
});