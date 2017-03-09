import App from './app.js'
import Ship from './ship.js'
import GarvenDreis from './players/garven-dreis.js'
import PedrinGaul from './players/pedrin-gaul.js'

var app = new App()

const players = [
  new GarvenDreis(),
  new PedrinGaul()
]
var ships = []

for (var i = 0; i < 5; i++) {
  ships.push(new Ship({
    diameter: 40,
    color: 'blue',
    x: 520,
    y: 620,
    player: players[Math.floor(Math.random() * 2)]
  }))
  app.arena.addShip(ships[ships.length - 1])
}
