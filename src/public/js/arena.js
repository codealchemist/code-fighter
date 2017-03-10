
export default class Arena {
  constructor () {
    // Run between -64 and 64 cycles, sine wave style.
    // This makes it easier to do stuff on the upper or lower states.
    this.cyclesHigh = 16
    this.cyclesLow = -16
    this.cycles = this.cyclesLow

    this.elements = []
  }

  init () {
    var initialTime = new Date()
    setInterval(() => {
      let finalTime = new Date()
      this.update(finalTime - initialTime)
      initialTime = finalTime
    }, 1)
    this.initP5()
  }

  initP5 () {
    new p5((p) => { // eslint-disable-line
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight)
        p.strokeWeight(0)
      }

      p.draw = () => {
        this.draw(p)
      }
      // temporal
      this.p = p
    })
  }

  draw (p) {
    p.background(0)

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i][this.elements[i].type].draw(p, this.elements[i].state)
    }
  }

  update (elapsedTime) {
    // this.updateCycles()
    for (var i = 0; i < this.elements.length; i++) {
      switch (this.elements[i].type) {
        case 'ship':
          this.updateShip(elapsedTime, this.elements[i])
          break
      }
    }
  }

  updateCycles () {
    ++this.cycles
    if (this.cycles < this.cyclesHigh) return

    this.cycles = this.cyclesLow
  }

  updateShip (elapsedTime, element) {
    element.ship.update(elapsedTime, this.getStatus(element))

    // check the output of the player
    if (Math.abs(element.ship.userProperties.aceleration) > element.ship.intrinsicProperties.maxAceleration) {
      element.ship.userProperties.aceleration = element.ship.intrinsicProperties.maxAceleration * Math.sign(element.ship.userProperties.aceleration)
    }
    if (Math.abs(element.ship.userProperties.rotate) > element.ship.intrinsicProperties.maxAngularVelocity) {
      element.ship.userProperties.rotate = element.ship.intrinsicProperties.maxAngularVelocity * Math.sign(element.ship.userProperties.rotate)
    }

    // the physics of the arena

    element.state.velocity += element.ship.intrinsicProperties.maxVelocity * element.ship.userProperties.aceleration * (elapsedTime / 1000)
    element.state.angularVelocity += element.ship.intrinsicProperties.maxAngularVelocity * element.ship.userProperties.rotate * (elapsedTime / 1000)

    if (Math.abs(element.state.angularVelocity) > element.ship.intrinsicProperties.maxAngularVelocity) {
      element.state.angularVelocity = element.ship.intrinsicProperties.maxAngularVelocity * Math.sign(element.state.angularVelocity)
    }
    if (Math.abs(element.state.velocity) > element.ship.intrinsicProperties.maxVelocity) {
      element.state.velocity = element.ship.intrinsicProperties.maxVelocity * Math.sign(element.state.velocity)
    }

    element.state.x += element.state.velocity * Math.cos(element.state.direction) * (elapsedTime / 1000)
    element.state.y += element.state.velocity * Math.sin(element.state.direction) * (elapsedTime / 1000)
    element.state.direction += element.state.angularVelocity * (elapsedTime / 10000)
  }

  addShip (ship) {
    this.elements.push({
      type: 'ship',
      ship: ship,
      state: {
        // initial values of a ship
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
        direction: 76, // from 0 to 360
        velocity: 0, // from 0 to maxVelocity
        angularVelocity: 0 // from 0 to maxAngularVelocity
      }
    })
  }
  removeShip (ship) {
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].ship === ship) {
        this.elements.splice(i, 1)
        break
      }
    }
    this.elements.splice(this.elements.indexOf(ship), 1)
  }
  getStatus (element) {
    // This method is in WIP
    var resp = {
      ships: []
    }
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].ship !== element.ship) {
        let posVector = this.p.createVector(
          this.elements[i].state.x - element.state.x,
          this.elements[i].state.y - element.state.y
        )
        let dirVector = this.p.createVector(
          Math.cos(element.state.direction + Math.PI / 2),
          Math.sin(element.state.direction + Math.PI / 2)
        )
        posVector = posVector.normalize()

        resp.ships.push({
          angule: dirVector.dot(posVector) * 180
        })
      }
    }

    return resp
  }
}
