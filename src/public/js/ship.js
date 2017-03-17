export default function shipRenderer(element, p) {
    const {x, y, direction} = element.state

    p.strokeWeight(0)
    p.fill(p.color(element.ship.color))
    p.ellipse(x, y, element.ship.diameter)

    // Draw center.
    p.fill(p.color(element.ship.color))
    p.ellipse(x, y, element.ship.diameter / 2, element.ship.diameter / 2)

    p.fill(p.color(element.ship.centerColor))
    p.ellipse(x, y, element.ship.diameter / 4)

    // Draw direction
    p.fill(204)
    p.triangle(
      x + element.ship.diameter / 2 * Math.cos(direction + 45), y + element.ship.diameter / 2 * Math.sin(direction + 45),
      x + element.ship.diameter / 2 * Math.cos(direction - 45), y + element.ship.diameter / 2 * Math.sin(direction - 45),
      x + element.ship.diameter / 2 * Math.cos(direction), y + element.ship.diameter / 2 * Math.sin(direction))
}
