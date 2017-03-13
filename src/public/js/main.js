import App from './app.js'
// import GarvenDreis from './players/garven-dreis.js'
import PedrinGaul from './players/pedrin-gaul.js'
// import MarioBaracus from './players/mario-baracus-teamplayer.js'

var app = new App()

for (var i = 0; i < 3; i++) {
  app.arena.addPlayer(new PedrinGaul())
  // MarioBaracus is for play in team mode
  // app.arena.addPlayer(new MarioBaracus())
}
