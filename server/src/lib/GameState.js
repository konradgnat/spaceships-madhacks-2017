export class GameState {
  constructor() {
    this.obstacles = []
    this.players = []
  }

  addObstacle(obstacle) {
    this.obstacles.push(obstacle)
  }

  addPlayer(player) {
    this.players.push(player)
  }

  getPlayers() {
    return this.players
  }

  getPlayer(id) {
    return this.players.find((person) => {
      if (person.id === id)
        return person.id
    })
  }
}