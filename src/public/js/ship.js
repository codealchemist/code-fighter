export default class Ship {
  constructor ({x, y, diameter, color, name, energy, player}) {
    this.name = name
    this.energy = energy
    this.color = color
    this.diameter = diameter
    this.coordinates = {x, y}
    this.movements = [
      'moveUp', 'moveDown', 'moveLeft', 'moveRight'
    ]
    this.lastMovement
    this.lastMovementAmount
    this.player = player
  }

  getPosition () {
    // Return a copy of player's coordinates.
    return JSON.parse(JSON.stringify(this.coordinates))
  }

  setPosition (coordinates) {
    this.coordinates = coordinates
    return this
  }

  moveUp (y) {
    if (this.coordinates.y < -this.diameter) {
      this.coordinates.y = window.innerHeight
    }
    this.coordinates.y -= y
    this.lastMovement = 'moveUp'
    this.lastMovementAmount = y
    return this
  }

  moveDown (y) {
    if (this.coordinates.y > window.innerHeight) {
      this.coordinates.y = 0
    }
    this.coordinates.y += y
    this.lastMovement = 'moveDown'
    this.lastMovementAmount = y
    return this
  }

  moveLeft (x) {
    if (this.coordinates.x < -this.diameter) {
      this.coordinates.x = window.innerWidth
    }
    this.coordinates.x -= x
    this.lastMovement = 'moveLeft'
    this.lastMovementAmount = x
    return this
  }

  moveRight (x) {
    if (this.coordinates.x > window.innerWidth + this.diameter) {
      this.coordinates.x = 0
    }
    this.coordinates.x += x
    this.lastMovement = 'moveRight'
    this.lastMovementAmount = x
    return this
  }

  move (x, y) {
    this.coordinates = {x, y}
    this.draw()
    return this
  }

  draw (p) {
    this.p = this.p || p
    const x = this.coordinates.x
    const y = this.coordinates.y
    this.p.fill(this.p.color(this.color))
    this.p.ellipse(x, y, this.diameter)

    // Draw center.
    this.p.fill(this.p.color('white'))
    this.p.ellipse(x, y, this.diameter / 4)
  }

  update (arenaStatus) {
    this.player.update()

    this.collisionHandler(arenaStatus)
    this.randomMovement(arenaStatus)
  }

  collisionHandler (data) {
    if (!data.ship.collision(data.oponentPosition)) return

    data.ship.color = 'red'
    this.captured = true
    console.log('We lost!')
  }

  repeatLastMovement () {
    if (!this.lastMovement) {
      this.randomMovement()
      return
    }

    this[this.lastMovement](this.lastMovementAmount)
  }

  randomMovement () {
    const direction = this.p.random(this.movements)
    const amount = this.p.random([1, 2, 3])
    this[direction](amount)
  }

  distance (targetPosition) {
    const {x, y} = this.coordinates
    const d = this.p.dist(x, y, targetPosition.x, targetPosition.y)
    return this.p.int(d)
  }

  collision (targetPosition) {
    return (this.distance(targetPosition) <= this.diameter)
  }
}
