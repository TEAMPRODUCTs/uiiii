var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function(){
	console.log('some_event occured');
});

setTimeout(function(){
	event.emit('some_event');
}, 1000);


event.on('someEvent' , function (arg1, arg2) {
   console.log("listener1", arg1, arg2);
});

event.on('someEvent', eventListener);

function eventListener(arg1, arg2){
    console.log('listener3', arg1, arg2);
}

event.once('someEvent', function (arg1, arg2) {
    console.log("listener2", arg1, arg2);
});

event.emit("someEvent", 'byvoid', 1991);

event.removeListener('someEvent',eventListener);

setTimeout(function(){
    event.emit("someEvent", 'byvoid', 1992);
},1000);
