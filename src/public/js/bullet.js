export default function bulletRenderer (element, p) {
  const {x, y, direction} = element.state
  p.strokeWeight(1)
  p.stroke(255)
  p.line(x, y, x + 10 * Math.cos(direction), y + 10 * Math.sin(direction))
}
