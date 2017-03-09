export default class PedrinGaul {
  constructor () {
    this.captured = false
  }

  update (data) {
    // if (this.captured) return
    // if (data.ship.distance(data.oponentPosition) < 120) {
    //   this.escape(data)
    // }
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
