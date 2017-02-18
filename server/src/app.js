import SocketIO from 'socket.io'
import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'

let app = express();


let server = http.createServer(app)

let io = new SocketIO(server)

app.use(morgan('combined'))
app.use(cors());


server.listen(3000)
console.log('listening on port 3000')

