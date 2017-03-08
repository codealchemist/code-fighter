import Ship from './ship.js'

export default class Arena {
  constructor (players) {
    this.shipADefaults = {
      diameter: 40,
      color: 'green',
      x: 50,
      y: 20
    }
    this.shipBDefaults = {
      diameter: 40,
      color: 'blue',
      x: 520,
      y: 520
    }

    // Run between -64 and 64 cycles, sine wave style.
    // This makes it easier to do stuff on the upper or lower states.
    this.cyclesHigh = 16
    this.cyclesLow = -16
    this.cycles = this.cyclesLow

    this.playerA = players[0]
    this.playerB = players[1]
  }

  init () {
    this.p = new p5((p) => { // eslint-disable-line
      this.initP5(p)

      this.shipA = new Ship(p, this.shipADefaults)
      this.shipB = new Ship(p, this.shipBDefaults)
    })
  }

  initP5 (p) {
    this.p = p
    p.setup = () => {
      this.setup(p)
    }

    p.draw = () => {
      this.draw(p)
    }
  }

  setup (p) {
    p.createCanvas(p.displayWidth, window.innerHeight)
    p.strokeWeight(0)
  }

  draw (p) {
    p.background(0)
    this.drawPlayers(p)
    this.updateCycles()
  }

  updateCycles () {
    ++this.cycles
    if (this.cycles < this.cyclesHigh) return

    this.cycles = this.cyclesLow
  }

  drawPlayers (p) {
    this.shipA.draw(p)
    this.shipB.draw(p)

    this.playerA.draw({
      ship: this.shipA,
      oponentPosition: this.shipB.getPosition(),
      cycles: this.cycles
    })

    this.playerB.draw({
      ship: this.shipB,
      oponentPosition: this.shipA.getPosition(),
      cycles: this.cycles
    })
  }
}
