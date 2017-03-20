export default class PedrinGaul {
  update (elapsedTime, userProperties, arenaStatus) {
    userProperties.aceleration = 5

    // check for the closest enemy
    let minDistance = 9999999
    for (let i = 0; i < arenaStatus.enemyShips.length; i++) {
      if (arenaStatus.enemyShips[i].distance < minDistance) {
        minDistance = arenaStatus.enemyShips[i].distance
        this.toFollow = i
      }
    }
    if (this.toFollow !== undefined) {
      userProperties.rotate = arenaStatus.enemyShips[this.toFollow].angule

      if (Math.abs(arenaStatus.enemyShips[this.toFollow].angule) < 10) {
        userProperties.fire = true
      }

      if (this._lastAngule > arenaStatus.enemyShips[this.toFollow].angule && arenaStatus.myShip.velocity > 0) {
        userProperties.aceleration = -1
      }
      this._lastAngule = arenaStatus.enemyShips[this.toFollow].angule
    }
  }
}
