
export default class Arena {
  constructor () {
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

    this.elements = []
  }

  init () {
    setInterval(() => { this.update() }, 1)
    this.initP5()
  }

  initP5 () {
    new p5((p) => { // eslint-disable-line
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight)
        p.strokeWeight(0)
      }

      p.draw = () => {
        p.fill(p.color('red'))
        p.ellipse(10, 10, 40)

        this.draw(p)
      }
    })
  }

  draw (p) {
    p.background(0)

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].draw(p)
    }
  }

  update () {
    // this.updateCycles()
    if (this.elements) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update(this.getStatus(this.elements[i]))
      }
    }
  }

  updateCycles () {
    ++this.cycles
    if (this.cycles < this.cyclesHigh) return

    this.cycles = this.cyclesLow
  }

  addShip (ship) {
    this.elements.push(ship)
  }
  removeShip (ship) {
    this.elements.splice(this.elements.indexOf(ship), 1)
  }
  getStatus (ship) {
    var resp = {

      cycles: this.cycles
    }
    if (this.elements.indexOf(ship)) {
      resp.ship = this.elements[0]
      resp.oponentPosition = this.elements[1].getPosition()
    } else {
      resp.ship = this.elements[1]
      resp.oponentPosition = this.elements[0].getPosition()
    }
    return resp
  }
}
