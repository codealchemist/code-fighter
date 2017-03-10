export default class Bullet {
  constructor ({x, y}) {
    this.intrinsicProperties = {
      maxVelocity: 100,
      maxDistance: 500,
      initialX: x,
      initialY: y
    }
  }

  update (elapsedTime, arenaStatus) {

  }
  draw (p, {x, y, direction}) {
    this.p = this.p || p

    this.p.strokeWeight(1)
    this.p.stroke(255)
    this.p.line(x, y, x + 10 * Math.cos(direction), y + 10 * Math.sin(direction))
  }
}
