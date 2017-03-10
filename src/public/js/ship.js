export default class Ship {
  constructor ({x, y, diameter, color, name, energy, player}) {
    this.name = name
    this.energy = energy
    this.color = color
    this.diameter = diameter

    // the user can not change this
    this.intrinsicProperties = {
      maxAceleration: 10,
      weight: 10,
      maxVelocity: 100,
      maxAngularVelocity: 100,
      maxEnergy: 5,
      reloadingTime: 1000 // in ms
    }

    this.userProperties = {
      aceleration: 0,
      rotate: 0,
      fire: false
    }

    this.player = player
  }

  draw (p, {x, y, direction}) {
    this.p = this.p || p
    this.p.strokeWeight(0)
    this.p.fill(this.p.color(this.color))
    this.p.ellipse(x, y, this.diameter)

    // Draw center.
    this.p.fill(this.p.color('white'))
    this.p.ellipse(x, y, this.diameter / 4)

    this.p.fill(this.p.color('red'))
    this.p.ellipse(x, y, 10, 10)

    // Draw direction
    this.p.fill(204)
    this.p.triangle(
      x + this.diameter / 2 * Math.cos(direction + 45), y + this.diameter / 2 * Math.sin(direction + 45),
      x + this.diameter / 2 * Math.cos(direction - 45), y + this.diameter / 2 * Math.sin(direction - 45),
      x + this.diameter / 2 * Math.cos(direction), y + this.diameter / 2 * Math.sin(direction))
  }

  update (elapsedTime, arenaStatus) {
    this.player.update(elapsedTime, this.userProperties, arenaStatus)
    // todo, here fire the ship events
  }
}
