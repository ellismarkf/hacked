var commandList = {
    help: function(name, args, flags, term) {
        if (args.length !== 0) {
            term.echo(helpMenu[args]);
        } else {
            term.echo(helpMenu[name]);
        }
    }
}
function processFlags(commandArgs) {
    var flags = command.args
}
var helpMenu = {
    help: "terminal commands: \n help     show this menu \n ping     connect with another computer via IP address on the network",
    ping: "Connect with another device via IP address"
}
$('#terminal').terminal( function(args, term){
    var command = $.terminal.parseCommand(args, $.terminal.parseArguments);
    commandList[command.name](command.name, command.args, command.rest, term);
}, {
    prompt: '> ',
    greetings: '193u4.194u234lk login successful',
    name: 'main-window',
    history: true,
    height: 500,
    width: 800,
    checkArity: false
});