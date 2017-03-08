export default class GarvenDreis {
  constructor () {
    this.won = false
  }

  draw (data) {
    if (this.won) return
    this.collisionHandler(data)
    this.followOponent(data)
  }

  collisionHandler (data) {
    if (!data.ship.collision(data.oponentPosition)) return

    data.ship.color = 'yellow'
    this.won = true
    console.log('Got it!')
  }

  followOponent (data) {
    const a = data.ship.getPosition()
    const b = data.oponentPosition

    if (a.y > b.y) {
      data.ship.moveUp(1)
    }
    if (a.y < b.y) {
      data.ship.moveDown(1)
    }

    if (a.x > b.x) {
      data.ship.moveLeft(1)
    }
    if (a.x < b.x) {
      data.ship.moveRight(1)
    }
  }
}
