import SocketIO from 'socket.io'
import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import { GameState } from './lib/GameState'
import { Player } from './lib/Player'
import { Obstacle } from './lib/Obstacle'

let app = express();

let p1 = new Player(1, 2, 3, 4, 5, 6, 7)
let o1 = new Obstacle(1, 2)
let gameState = new GameState()

let server = http.createServer(app)

let io = new SocketIO(server)

app.use(morgan('combined'))
app.use(cors());

let port = 3002
server.listen(port)
console.log('listening on port ' + port)

let idCount = 0

let playerSockets = []

io.on('connection', (socket) => {
  socket.emit('send game state', gameState)
  socket.on('create player', (data) => {
    let id = idCount++
    playerSockets[id] = socket
    let color = ''
    let orientation = 0
    let posX = 50
    let posY = 50
    let velX = 0
    let velY = 0
    let newPlayer = new Player(id, color, orientation, posX, posY, velX, velY)
    socket.emit('player created', newPlayer)
  })
  socket.on('send player state', (data) => {
    playerSocket = playerSockets[data.id]
    if (playerSocket !== socket)
      playerSocket.emit('error', { message: 'invalid player'})
    let player = gameState.getPlayer(data.id)
    player.posX = data.posX
    player.posY = data.posY
    player.velX = data.velX
    player.velY = data.velY
  })
})

setInterval(() => {
  playerSockets.forEach((playerSockets) => {
    playerSockets.emit('send game state', gameState)
  })
}, 10)
