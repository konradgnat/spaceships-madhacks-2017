'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _GameState = require('./lib/GameState');

var _Player = require('./lib/Player');

var _Obstacle = require('./lib/Obstacle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();

let p1 = new _Player.Player(1, 2, 3, 4, 5, 6, 7);
let o1 = new _Obstacle.Obstacle(1, 2);
let gameState = new _GameState.GameState();

let server = _http2.default.createServer(app);

let io = new _socket2.default(server);

app.use((0, _morgan2.default)('combined'));
app.use((0, _cors2.default)());

let port = 3001;
server.listen(port);
console.log('listening on port ' + port);

let idCount = 0;

let playerSockets = [];

io.on('connection', socket => {
  socket.emit('send game state', gameState);
  socket.on('create player', data => {
    let id = idCount++;
    playerSockets[id] = socket;
    let color = '';
    let orientation = 0;
    let posX = 50;
    let posY = 50;
    let velX = 0;
    let velY = 0;
    let newPlayer = new _Player.Player(id, color, orientation, posX, posY, velX, velY);
    socket.emit('player created', newPlayer);
  });
  socket.on('send player state', data => {
    playerSocket = playerSockets[data.id];
    if (playerSocket !== socket) playerSocket.emit('error', { message: 'invalid player' });
    let player = gameState.getPlayer(data.id);
    player.posX = data.posX;
    player.posY = data.posY;
    player.velX = data.velX;
    player.velY = data.velY;
  });
});

setInterval(() => {
  playerSockets.forEach(playerSockets => {
    playerSockets.emit('send game state', gameState);
  });
}, 10);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJwMSIsIm8xIiwiZ2FtZVN0YXRlIiwic2VydmVyIiwiY3JlYXRlU2VydmVyIiwiaW8iLCJ1c2UiLCJwb3J0IiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsImlkQ291bnQiLCJwbGF5ZXJTb2NrZXRzIiwib24iLCJzb2NrZXQiLCJlbWl0IiwiZGF0YSIsImlkIiwiY29sb3IiLCJvcmllbnRhdGlvbiIsInBvc1giLCJwb3NZIiwidmVsWCIsInZlbFkiLCJuZXdQbGF5ZXIiLCJwbGF5ZXJTb2NrZXQiLCJtZXNzYWdlIiwicGxheWVyIiwiZ2V0UGxheWVyIiwic2V0SW50ZXJ2YWwiLCJmb3JFYWNoIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLE1BQU0sd0JBQVY7O0FBRUEsSUFBSUMsS0FBSyxtQkFBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixDQUFUO0FBQ0EsSUFBSUMsS0FBSyx1QkFBYSxDQUFiLEVBQWdCLENBQWhCLENBQVQ7QUFDQSxJQUFJQyxZQUFZLDBCQUFoQjs7QUFFQSxJQUFJQyxTQUFTLGVBQUtDLFlBQUwsQ0FBa0JMLEdBQWxCLENBQWI7O0FBRUEsSUFBSU0sS0FBSyxxQkFBYUYsTUFBYixDQUFUOztBQUVBSixJQUFJTyxHQUFKLENBQVEsc0JBQU8sVUFBUCxDQUFSO0FBQ0FQLElBQUlPLEdBQUosQ0FBUSxxQkFBUjs7QUFFQSxJQUFJQyxPQUFPLElBQVg7QUFDQUosT0FBT0ssTUFBUCxDQUFjRCxJQUFkO0FBQ0FFLFFBQVFDLEdBQVIsQ0FBWSx1QkFBdUJILElBQW5DOztBQUVBLElBQUlJLFVBQVUsQ0FBZDs7QUFFQSxJQUFJQyxnQkFBZ0IsRUFBcEI7O0FBRUFQLEdBQUdRLEVBQUgsQ0FBTSxZQUFOLEVBQXFCQyxNQUFELElBQVk7QUFDOUJBLFNBQU9DLElBQVAsQ0FBWSxpQkFBWixFQUErQmIsU0FBL0I7QUFDQVksU0FBT0QsRUFBUCxDQUFVLGVBQVYsRUFBNEJHLElBQUQsSUFBVTtBQUNuQyxRQUFJQyxLQUFLTixTQUFUO0FBQ0FDLGtCQUFjSyxFQUFkLElBQW9CSCxNQUFwQjtBQUNBLFFBQUlJLFFBQVEsRUFBWjtBQUNBLFFBQUlDLGNBQWMsQ0FBbEI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxZQUFZLG1CQUFXUCxFQUFYLEVBQWVDLEtBQWYsRUFBc0JDLFdBQXRCLEVBQW1DQyxJQUFuQyxFQUF5Q0MsSUFBekMsRUFBK0NDLElBQS9DLEVBQXFEQyxJQUFyRCxDQUFoQjtBQUNBVCxXQUFPQyxJQUFQLENBQVksZ0JBQVosRUFBOEJTLFNBQTlCO0FBQ0QsR0FYRDtBQVlBVixTQUFPRCxFQUFQLENBQVUsbUJBQVYsRUFBZ0NHLElBQUQsSUFBVTtBQUN2Q1MsbUJBQWViLGNBQWNJLEtBQUtDLEVBQW5CLENBQWY7QUFDQSxRQUFJUSxpQkFBaUJYLE1BQXJCLEVBQ0VXLGFBQWFWLElBQWIsQ0FBa0IsT0FBbEIsRUFBMkIsRUFBRVcsU0FBUyxnQkFBWCxFQUEzQjtBQUNGLFFBQUlDLFNBQVN6QixVQUFVMEIsU0FBVixDQUFvQlosS0FBS0MsRUFBekIsQ0FBYjtBQUNBVSxXQUFPUCxJQUFQLEdBQWNKLEtBQUtJLElBQW5CO0FBQ0FPLFdBQU9OLElBQVAsR0FBY0wsS0FBS0ssSUFBbkI7QUFDQU0sV0FBT0wsSUFBUCxHQUFjTixLQUFLTSxJQUFuQjtBQUNBSyxXQUFPSixJQUFQLEdBQWNQLEtBQUtPLElBQW5CO0FBQ0QsR0FURDtBQVVELENBeEJEOztBQTBCQU0sWUFBWSxNQUFNO0FBQ2hCakIsZ0JBQWNrQixPQUFkLENBQXVCbEIsYUFBRCxJQUFtQjtBQUN2Q0Esa0JBQWNHLElBQWQsQ0FBbUIsaUJBQW5CLEVBQXNDYixTQUF0QztBQUNELEdBRkQ7QUFHRCxDQUpELEVBSUcsRUFKSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL2xpYi9HYW1lU3RhdGUnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2xpYi9QbGF5ZXInXG5pbXBvcnQgeyBPYnN0YWNsZSB9IGZyb20gJy4vbGliL09ic3RhY2xlJ1xuXG5sZXQgYXBwID0gZXhwcmVzcygpO1xuXG5sZXQgcDEgPSBuZXcgUGxheWVyKDEsIDIsIDMsIDQsIDUsIDYsIDcpXG5sZXQgbzEgPSBuZXcgT2JzdGFjbGUoMSwgMilcbmxldCBnYW1lU3RhdGUgPSBuZXcgR2FtZVN0YXRlKClcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcClcblxubGV0IGlvID0gbmV3IFNvY2tldElPKHNlcnZlcilcblxuYXBwLnVzZShtb3JnYW4oJ2NvbWJpbmVkJykpXG5hcHAudXNlKGNvcnMoKSk7XG5cbmxldCBwb3J0ID0gMzAwMVxuc2VydmVyLmxpc3Rlbihwb3J0KVxuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcgKyBwb3J0KVxuXG5sZXQgaWRDb3VudCA9IDBcblxubGV0IHBsYXllclNvY2tldHMgPSBbXVxuXG5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgc29ja2V0LmVtaXQoJ3NlbmQgZ2FtZSBzdGF0ZScsIGdhbWVTdGF0ZSlcbiAgc29ja2V0Lm9uKCdjcmVhdGUgcGxheWVyJywgKGRhdGEpID0+IHtcbiAgICBsZXQgaWQgPSBpZENvdW50KytcbiAgICBwbGF5ZXJTb2NrZXRzW2lkXSA9IHNvY2tldFxuICAgIGxldCBjb2xvciA9ICcnXG4gICAgbGV0IG9yaWVudGF0aW9uID0gMFxuICAgIGxldCBwb3NYID0gNTBcbiAgICBsZXQgcG9zWSA9IDUwXG4gICAgbGV0IHZlbFggPSAwXG4gICAgbGV0IHZlbFkgPSAwXG4gICAgbGV0IG5ld1BsYXllciA9IG5ldyBQbGF5ZXIoaWQsIGNvbG9yLCBvcmllbnRhdGlvbiwgcG9zWCwgcG9zWSwgdmVsWCwgdmVsWSlcbiAgICBzb2NrZXQuZW1pdCgncGxheWVyIGNyZWF0ZWQnLCBuZXdQbGF5ZXIpXG4gIH0pXG4gIHNvY2tldC5vbignc2VuZCBwbGF5ZXIgc3RhdGUnLCAoZGF0YSkgPT4ge1xuICAgIHBsYXllclNvY2tldCA9IHBsYXllclNvY2tldHNbZGF0YS5pZF1cbiAgICBpZiAocGxheWVyU29ja2V0ICE9PSBzb2NrZXQpXG4gICAgICBwbGF5ZXJTb2NrZXQuZW1pdCgnZXJyb3InLCB7IG1lc3NhZ2U6ICdpbnZhbGlkIHBsYXllcid9KVxuICAgIGxldCBwbGF5ZXIgPSBnYW1lU3RhdGUuZ2V0UGxheWVyKGRhdGEuaWQpXG4gICAgcGxheWVyLnBvc1ggPSBkYXRhLnBvc1hcbiAgICBwbGF5ZXIucG9zWSA9IGRhdGEucG9zWVxuICAgIHBsYXllci52ZWxYID0gZGF0YS52ZWxYXG4gICAgcGxheWVyLnZlbFkgPSBkYXRhLnZlbFlcbiAgfSlcbn0pXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgcGxheWVyU29ja2V0cy5mb3JFYWNoKChwbGF5ZXJTb2NrZXRzKSA9PiB7XG4gICAgcGxheWVyU29ja2V0cy5lbWl0KCdzZW5kIGdhbWUgc3RhdGUnLCBnYW1lU3RhdGUpXG4gIH0pXG59LCAxMClcbiJdfQ==