function parseCommand (arguments) {
    var command = {
        command: arguments[0]
    }
}
$('#terminal').terminal({
    help: function(arg1) {
        this.echo('help menu ' + arg1);
    },
    ping: function(ip) {

    }
}, {
    prompt: '> ',
    greetings: '193u4.194u234lk login successful',
    name: 'main-window',
    history: true,
    height: 500,
    width: 400,
    checkArity: false
});