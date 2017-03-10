export default class PedrinGaul {
  constructor () {
    this.captured = false
    this.toFollow = Math.floor(Math.random() * 2)
    this.acumTime = 0
  }

  update (elapsedTime, userProperties, arenaStatus) {
    userProperties.aceleration = 5
    userProperties.rotate = arenaStatus.ships[this.toFollow].angule

    this.acumTime += elapsedTime

    if (Math.abs(arenaStatus.ships[this.toFollow].angule) < 10) {
      userProperties.fire = true
    }

    if (this._lastAngule > arenaStatus.ships[this.toFollow].angule && arenaStatus.myShip.velocity > 0) {
      userProperties.aceleration = -1
    }
    this._lastAngule = arenaStatus.ships[this.toFollow].angule
  }
  randomMovement () {
    const direction = this.p.random(this.movements)
    const amount = this.p.random([1, 2, 3])
    this[direction](amount)
  }
  collisionHandler (data) {
    if (!data.ship.collision(data.oponentPosition)) return

    data.ship.color = 'red'
    this.captured = true
    console.log('We lost!')
  }

  distance (targetPosition) {
    const {x, y} = this.coordinates
    const d = this.p.dist(x, y, targetPosition.x, targetPosition.y)
    return this.p.int(d)
  }

  collision (targetPosition) {
    return (this.distance(targetPosition) <= this.diameter)
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
