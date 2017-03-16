import App from './app.js'
// import GarvenDreis from './players/garven-dreis.js'
import PedrinGaul from './players/pedrin-gaul.js'
// import MarioBaracus from './players/mario-baracus-teamplayer.js'

var app = new App()

// for (var i = 0; i < 3; i++) {
//   app.arena.addPlayer(new PedrinGaul())
//   // MarioBaracus is for play in team mode
//   // app.arena.addPlayer(new MarioBaracus())
// }


var frames = []

var socket = io('http://10.2.1.147:3000');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.on('connect', function(){
  console.log('connect')

});

socket.on('update_finish', function(data) {
	//frames.length = 0
	frames = frames.concat(JSON.parse(data))
});
socket.on('event', function(data) {
  console.log('event')

});
socket.on('disconnect', function() {
  console.log('disconnect')

});

setInterval(function() {
	if(frames.length > 0) {
		const frame = frames.shift()
		app.arena.setElements(frame);
		console.log(frames.length)
	}
},16)