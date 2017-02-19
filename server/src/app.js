import SocketIO from 'socket.io'
import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import { GameState } from './lib/GameState'
import { Player } from './lib/Player'
import { Obstacle } from './lib/Obstacle'

let app = express();

let gameState = new GameState()

let server = http.createServer(app)

let io = new SocketIO(server)

app.use(morgan('combined'))
app.use(cors());

let port = 3002
server.listen(port)
console.log('listening on port ' + port)

let idCount = 0

var playerSockets = []

io.on('connection', (socket) => {
  socket.emit('send-game-state', gameState)
  socket.on('create-player', (data) => {
    console.log('player connected')
    let id = idCount++
    playerSockets.push({id: id, socket: socket})
    let color = ''
    let orientation = 0
    let posX = 50
    let posY = 50
    let velX = 0
    let velY = 0
    let newPlayer = new Player(id, color, orientation, posX, posY, velX, velY)
    gameState.players.push(newPlayer)
    socket.emit('player-created', newPlayer)
  })
  socket.on('send-player-state', (data) => {
    /*let playerSocket = playerSockets.find((player) => {
      return player.id === data.id
    })
    if (playerSocket === null) {
      throw new Error()
    }*/
    //if (playerSocket !== socket)
      //playerSocket.emit('error', { message: 'invalid player'})
    let player = gameState.getPlayer(data.id)
    if (player === undefined)
      return
    player.posX = data.posX
    player.posY = data.posY
    player.velX = data.velX
    player.velY = data.velY
  })
})

setInterval(() => {
  playerSockets.forEach((playerSocket) => {
    playerSocket.socket.emit('send-game-state', gameState)
  })
}, 100)
