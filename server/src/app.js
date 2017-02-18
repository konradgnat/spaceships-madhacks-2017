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


server.listen(3000)
console.log('listening on port 3000')

