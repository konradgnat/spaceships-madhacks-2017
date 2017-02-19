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

let port = 3002;
server.listen(port);
console.log('listening on port ' + port);

let idCount = 0;

var playerSockets = [];

io.on('connection', socket => {
  socket.emit('send-game-state', gameState);
  socket.on('create-player', data => {
    let id = idCount++;
    playerSockets.push(socket);
    let color = '';
    let orientation = 0;
    let posX = 50;
    let posY = 50;
    let velX = 0;
    let velY = 0;
    let newPlayer = new _Player.Player(id, color, orientation, posX, posY, velX, velY);
    socket.emit('player-created', newPlayer);
  });
  socket.on('send-player-state', data => {
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
  playerSockets.forEach(playerSocket => {
    playerSocket.emit('send-game-state', gameState);
  });
}, 1);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJwMSIsIm8xIiwiZ2FtZVN0YXRlIiwic2VydmVyIiwiY3JlYXRlU2VydmVyIiwiaW8iLCJ1c2UiLCJwb3J0IiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsImlkQ291bnQiLCJwbGF5ZXJTb2NrZXRzIiwib24iLCJzb2NrZXQiLCJlbWl0IiwiZGF0YSIsImlkIiwicHVzaCIsImNvbG9yIiwib3JpZW50YXRpb24iLCJwb3NYIiwicG9zWSIsInZlbFgiLCJ2ZWxZIiwibmV3UGxheWVyIiwicGxheWVyU29ja2V0IiwibWVzc2FnZSIsInBsYXllciIsImdldFBsYXllciIsInNldEludGVydmFsIiwiZm9yRWFjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxNQUFNLHdCQUFWOztBQUVBLElBQUlDLEtBQUssbUJBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBVDtBQUNBLElBQUlDLEtBQUssdUJBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFUO0FBQ0EsSUFBSUMsWUFBWSwwQkFBaEI7O0FBRUEsSUFBSUMsU0FBUyxlQUFLQyxZQUFMLENBQWtCTCxHQUFsQixDQUFiOztBQUVBLElBQUlNLEtBQUsscUJBQWFGLE1BQWIsQ0FBVDs7QUFFQUosSUFBSU8sR0FBSixDQUFRLHNCQUFPLFVBQVAsQ0FBUjtBQUNBUCxJQUFJTyxHQUFKLENBQVEscUJBQVI7O0FBRUEsSUFBSUMsT0FBTyxJQUFYO0FBQ0FKLE9BQU9LLE1BQVAsQ0FBY0QsSUFBZDtBQUNBRSxRQUFRQyxHQUFSLENBQVksdUJBQXVCSCxJQUFuQzs7QUFFQSxJQUFJSSxVQUFVLENBQWQ7O0FBRUEsSUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBUCxHQUFHUSxFQUFILENBQU0sWUFBTixFQUFxQkMsTUFBRCxJQUFZO0FBQzlCQSxTQUFPQyxJQUFQLENBQVksaUJBQVosRUFBK0JiLFNBQS9CO0FBQ0FZLFNBQU9ELEVBQVAsQ0FBVSxlQUFWLEVBQTRCRyxJQUFELElBQVU7QUFDbkMsUUFBSUMsS0FBS04sU0FBVDtBQUNBQyxrQkFBY00sSUFBZCxDQUFtQkosTUFBbkI7QUFDQSxRQUFJSyxRQUFRLEVBQVo7QUFDQSxRQUFJQyxjQUFjLENBQWxCO0FBQ0EsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxDQUFYO0FBQ0EsUUFBSUMsT0FBTyxDQUFYO0FBQ0EsUUFBSUMsWUFBWSxtQkFBV1IsRUFBWCxFQUFlRSxLQUFmLEVBQXNCQyxXQUF0QixFQUFtQ0MsSUFBbkMsRUFBeUNDLElBQXpDLEVBQStDQyxJQUEvQyxFQUFxREMsSUFBckQsQ0FBaEI7QUFDQVYsV0FBT0MsSUFBUCxDQUFZLGdCQUFaLEVBQThCVSxTQUE5QjtBQUNELEdBWEQ7QUFZQVgsU0FBT0QsRUFBUCxDQUFVLG1CQUFWLEVBQWdDRyxJQUFELElBQVU7QUFDdkNVLG1CQUFlZCxjQUFjSSxLQUFLQyxFQUFuQixDQUFmO0FBQ0EsUUFBSVMsaUJBQWlCWixNQUFyQixFQUNFWSxhQUFhWCxJQUFiLENBQWtCLE9BQWxCLEVBQTJCLEVBQUVZLFNBQVMsZ0JBQVgsRUFBM0I7QUFDRixRQUFJQyxTQUFTMUIsVUFBVTJCLFNBQVYsQ0FBb0JiLEtBQUtDLEVBQXpCLENBQWI7QUFDQVcsV0FBT1AsSUFBUCxHQUFjTCxLQUFLSyxJQUFuQjtBQUNBTyxXQUFPTixJQUFQLEdBQWNOLEtBQUtNLElBQW5CO0FBQ0FNLFdBQU9MLElBQVAsR0FBY1AsS0FBS08sSUFBbkI7QUFDQUssV0FBT0osSUFBUCxHQUFjUixLQUFLUSxJQUFuQjtBQUNELEdBVEQ7QUFVRCxDQXhCRDs7QUEwQkFNLFlBQVksTUFBTTtBQUNoQmxCLGdCQUFjbUIsT0FBZCxDQUF1QkwsWUFBRCxJQUFrQjtBQUN0Q0EsaUJBQWFYLElBQWIsQ0FBa0IsaUJBQWxCLEVBQXFDYixTQUFyQztBQUNELEdBRkQ7QUFHRCxDQUpELEVBSUcsQ0FKSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL2xpYi9HYW1lU3RhdGUnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2xpYi9QbGF5ZXInXG5pbXBvcnQgeyBPYnN0YWNsZSB9IGZyb20gJy4vbGliL09ic3RhY2xlJ1xuXG5sZXQgYXBwID0gZXhwcmVzcygpO1xuXG5sZXQgcDEgPSBuZXcgUGxheWVyKDEsIDIsIDMsIDQsIDUsIDYsIDcpXG5sZXQgbzEgPSBuZXcgT2JzdGFjbGUoMSwgMilcbmxldCBnYW1lU3RhdGUgPSBuZXcgR2FtZVN0YXRlKClcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcClcblxubGV0IGlvID0gbmV3IFNvY2tldElPKHNlcnZlcilcblxuYXBwLnVzZShtb3JnYW4oJ2NvbWJpbmVkJykpXG5hcHAudXNlKGNvcnMoKSk7XG5cbmxldCBwb3J0ID0gMzAwMlxuc2VydmVyLmxpc3Rlbihwb3J0KVxuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcgKyBwb3J0KVxuXG5sZXQgaWRDb3VudCA9IDBcblxudmFyIHBsYXllclNvY2tldHMgPSBbXVxuXG5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgc29ja2V0LmVtaXQoJ3NlbmQtZ2FtZS1zdGF0ZScsIGdhbWVTdGF0ZSlcbiAgc29ja2V0Lm9uKCdjcmVhdGUtcGxheWVyJywgKGRhdGEpID0+IHtcbiAgICBsZXQgaWQgPSBpZENvdW50KytcbiAgICBwbGF5ZXJTb2NrZXRzLnB1c2goc29ja2V0KVxuICAgIGxldCBjb2xvciA9ICcnXG4gICAgbGV0IG9yaWVudGF0aW9uID0gMFxuICAgIGxldCBwb3NYID0gNTBcbiAgICBsZXQgcG9zWSA9IDUwXG4gICAgbGV0IHZlbFggPSAwXG4gICAgbGV0IHZlbFkgPSAwXG4gICAgbGV0IG5ld1BsYXllciA9IG5ldyBQbGF5ZXIoaWQsIGNvbG9yLCBvcmllbnRhdGlvbiwgcG9zWCwgcG9zWSwgdmVsWCwgdmVsWSlcbiAgICBzb2NrZXQuZW1pdCgncGxheWVyLWNyZWF0ZWQnLCBuZXdQbGF5ZXIpXG4gIH0pXG4gIHNvY2tldC5vbignc2VuZC1wbGF5ZXItc3RhdGUnLCAoZGF0YSkgPT4ge1xuICAgIHBsYXllclNvY2tldCA9IHBsYXllclNvY2tldHNbZGF0YS5pZF1cbiAgICBpZiAocGxheWVyU29ja2V0ICE9PSBzb2NrZXQpXG4gICAgICBwbGF5ZXJTb2NrZXQuZW1pdCgnZXJyb3InLCB7IG1lc3NhZ2U6ICdpbnZhbGlkIHBsYXllcid9KVxuICAgIGxldCBwbGF5ZXIgPSBnYW1lU3RhdGUuZ2V0UGxheWVyKGRhdGEuaWQpXG4gICAgcGxheWVyLnBvc1ggPSBkYXRhLnBvc1hcbiAgICBwbGF5ZXIucG9zWSA9IGRhdGEucG9zWVxuICAgIHBsYXllci52ZWxYID0gZGF0YS52ZWxYXG4gICAgcGxheWVyLnZlbFkgPSBkYXRhLnZlbFlcbiAgfSlcbn0pXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgcGxheWVyU29ja2V0cy5mb3JFYWNoKChwbGF5ZXJTb2NrZXQpID0+IHtcbiAgICBwbGF5ZXJTb2NrZXQuZW1pdCgnc2VuZC1nYW1lLXN0YXRlJywgZ2FtZVN0YXRlKVxuICB9KVxufSwgMSlcbiJdfQ==