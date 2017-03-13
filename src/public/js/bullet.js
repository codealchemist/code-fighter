export default class Bullet {
  constructor ({x, y, team}, ownership) {
    this.intrinsicProperties = {
      maxVelocity: 100,
      maxDistance: 500,
      // these are needed to calculate the traveled distance of the bullet
      initialX: x,
      initialY: y
    }
    this.team = team
    this.ownership = ownership
  }

  update (elapsedTime, arenaStatus) {
    // *if (this.p)* is a temporal if, until resolve the issue related with the p5 reference, It is needed wait until one render cycle for the moment
    if (this.p) {
      for (let i = 0; i < arenaStatus.elements.length; i++) {
        if (this.ownership !== arenaStatus.elements[i].ship) {
          // to avoid friend fire in the team mode
          if (this.team === undefined || this.team !== arenaStatus.elements[i].team) {
            let distance = this.p.dist(arenaStatus.bullet.state.x, arenaStatus.bullet.state.y, arenaStatus.elements[i].x, arenaStatus.elements[i].y)
            if (distance < arenaStatus.elements[i].ship.diameter) {
              this.hasCollided = true
              this.hasCollidedWithShip = arenaStatus.elements[i].ship
            }
          }
        }
      }
    }
  }

  draw (p, {x, y, direction}) {
    this.p = this.p || p

    this.p.strokeWeight(1)
    this.p.stroke(255)
    this.p.line(x, y, x + 10 * Math.cos(direction), y + 10 * Math.sin(direction))
  }
}
