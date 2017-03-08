export default class PedrinGaul {
  constructor () {
    this.captured = false
  }

  draw (data) {
    if (this.captured) return
    this.collisionHandler(data)
    this.randomMovement(data)

    if (data.ship.distance(data.oponentPosition) < 120) {
      this.escape(data)
    }
  }

  randomMovement (data) {
    if (data.cycles === 0) data.ship.randomMovement()
    data.ship.repeatLastMovement()
  }

  collisionHandler (data) {
    if (!data.ship.collision(data.oponentPosition)) return

    data.ship.color = 'red'
    this.captured = true
    console.log('We lost!')
  }

  escape (data) {
    console.log('Escaping!')
    const a = data.ship.getPosition()
    const b = data.oponentPosition
    if (a.y > b.y) {
      data.ship.moveDown(1)
    }
    if (a.y < b.y) {
      data.ship.moveUp(1)
    }

    if (a.x > b.x) {
      data.ship.moveRight(1)
    }
    if (a.x < b.x) {
      data.ship.moveLeft(1)
    }
  }
}
