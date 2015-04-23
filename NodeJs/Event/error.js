/**
 * Created by sq_xu on 2015/4/20.
 */
var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('error', function(){
    console.log('error');
});


emitter.emit('error');