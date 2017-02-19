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
  socket.on('disconnect', () => {
    console.log('player disconnected');

    let player = playerSockets.find(player => {
      return player.socket === socket;
    });
    if (player === undefined) return new Error();
    gameState.players.filter(p => {
      return p.id !== player.id;
    });
  });
  socket.emit('send-game-state', gameState);
  socket.on('create-player', data => {
    console.log('player connected');
    let id = idCount++;
    playerSockets.push({ id: id, socket: socket });
    let color = '';
    let orientation = 0;
    let posX = 50;
    let posY = 50;
    let velX = 0;
    let velY = 0;
    let newPlayer = new _Player.Player(id, color, orientation, posX, posY, velX, velY);
    gameState.players.push(newPlayer);
    socket.emit('player-created', newPlayer);
  });
  socket.on('send-player-state', data => {
    let player = gameState.getPlayer(data.id);
    if (player === undefined) return;
    player.posX = data.posX;
    player.posY = data.posY;
    player.velX = data.velX;
    player.velY = data.velY;
    player.orientation = data.orientation;
  });
});

setInterval(() => {
  playerSockets.forEach(playerSocket => {
    playerSocket.socket.emit('send-game-state', gameState);
  });
}, 30);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnYW1lU3RhdGUiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJpbyIsInVzZSIsInBvcnQiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIiwiaWRDb3VudCIsInBsYXllclNvY2tldHMiLCJvbiIsInNvY2tldCIsInBsYXllciIsImZpbmQiLCJ1bmRlZmluZWQiLCJFcnJvciIsInBsYXllcnMiLCJmaWx0ZXIiLCJwIiwiaWQiLCJlbWl0IiwiZGF0YSIsInB1c2giLCJjb2xvciIsIm9yaWVudGF0aW9uIiwicG9zWCIsInBvc1kiLCJ2ZWxYIiwidmVsWSIsIm5ld1BsYXllciIsImdldFBsYXllciIsInNldEludGVydmFsIiwiZm9yRWFjaCIsInBsYXllclNvY2tldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxNQUFNLHdCQUFWOztBQUVBLElBQUlDLFlBQVksMEJBQWhCOztBQUVBLElBQUlDLFNBQVMsZUFBS0MsWUFBTCxDQUFrQkgsR0FBbEIsQ0FBYjs7QUFFQSxJQUFJSSxLQUFLLHFCQUFhRixNQUFiLENBQVQ7O0FBRUFGLElBQUlLLEdBQUosQ0FBUSxzQkFBTyxVQUFQLENBQVI7QUFDQUwsSUFBSUssR0FBSixDQUFRLHFCQUFSOztBQUVBLElBQUlDLE9BQU8sSUFBWDtBQUNBSixPQUFPSyxNQUFQLENBQWNELElBQWQ7QUFDQUUsUUFBUUMsR0FBUixDQUFZLHVCQUF1QkgsSUFBbkM7O0FBRUEsSUFBSUksVUFBVSxDQUFkOztBQUVBLElBQUlDLGdCQUFnQixFQUFwQjs7QUFFQVAsR0FBR1EsRUFBSCxDQUFNLFlBQU4sRUFBcUJDLE1BQUQsSUFBWTtBQUM5QkEsU0FBT0QsRUFBUCxDQUFVLFlBQVYsRUFBd0IsTUFBTTtBQUM1QkosWUFBUUMsR0FBUixDQUFZLHFCQUFaOztBQUVBLFFBQUlLLFNBQVNILGNBQWNJLElBQWQsQ0FBb0JELE1BQUQsSUFBWTtBQUMxQyxhQUFPQSxPQUFPRCxNQUFQLEtBQWtCQSxNQUF6QjtBQUNELEtBRlksQ0FBYjtBQUdBLFFBQUlDLFdBQVdFLFNBQWYsRUFDRSxPQUFPLElBQUlDLEtBQUosRUFBUDtBQUNGaEIsY0FBVWlCLE9BQVYsQ0FBa0JDLE1BQWxCLENBQTBCQyxDQUFELElBQU87QUFDOUIsYUFBT0EsRUFBRUMsRUFBRixLQUFTUCxPQUFPTyxFQUF2QjtBQUNELEtBRkQ7QUFHRCxHQVhEO0FBWUFSLFNBQU9TLElBQVAsQ0FBWSxpQkFBWixFQUErQnJCLFNBQS9CO0FBQ0FZLFNBQU9ELEVBQVAsQ0FBVSxlQUFWLEVBQTRCVyxJQUFELElBQVU7QUFDbkNmLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLFFBQUlZLEtBQUtYLFNBQVQ7QUFDQUMsa0JBQWNhLElBQWQsQ0FBbUIsRUFBQ0gsSUFBSUEsRUFBTCxFQUFTUixRQUFRQSxNQUFqQixFQUFuQjtBQUNBLFFBQUlZLFFBQVEsRUFBWjtBQUNBLFFBQUlDLGNBQWMsQ0FBbEI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxZQUFZLG1CQUFXVixFQUFYLEVBQWVJLEtBQWYsRUFBc0JDLFdBQXRCLEVBQW1DQyxJQUFuQyxFQUF5Q0MsSUFBekMsRUFBK0NDLElBQS9DLEVBQXFEQyxJQUFyRCxDQUFoQjtBQUNBN0IsY0FBVWlCLE9BQVYsQ0FBa0JNLElBQWxCLENBQXVCTyxTQUF2QjtBQUNBbEIsV0FBT1MsSUFBUCxDQUFZLGdCQUFaLEVBQThCUyxTQUE5QjtBQUNELEdBYkQ7QUFjQWxCLFNBQU9ELEVBQVAsQ0FBVSxtQkFBVixFQUFnQ1csSUFBRCxJQUFVO0FBQ3ZDLFFBQUlULFNBQVNiLFVBQVUrQixTQUFWLENBQW9CVCxLQUFLRixFQUF6QixDQUFiO0FBQ0EsUUFBSVAsV0FBV0UsU0FBZixFQUNFO0FBQ0ZGLFdBQU9hLElBQVAsR0FBY0osS0FBS0ksSUFBbkI7QUFDQWIsV0FBT2MsSUFBUCxHQUFjTCxLQUFLSyxJQUFuQjtBQUNBZCxXQUFPZSxJQUFQLEdBQWNOLEtBQUtNLElBQW5CO0FBQ0FmLFdBQU9nQixJQUFQLEdBQWNQLEtBQUtPLElBQW5CO0FBQ0FoQixXQUFPWSxXQUFQLEdBQXFCSCxLQUFLRyxXQUExQjtBQUNELEdBVEQ7QUFVRCxDQXRDRDs7QUF3Q0FPLFlBQVksTUFBTTtBQUNoQnRCLGdCQUFjdUIsT0FBZCxDQUF1QkMsWUFBRCxJQUFrQjtBQUN0Q0EsaUJBQWF0QixNQUFiLENBQW9CUyxJQUFwQixDQUF5QixpQkFBekIsRUFBNENyQixTQUE1QztBQUNELEdBRkQ7QUFHRCxDQUpELEVBSUcsRUFKSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL2xpYi9HYW1lU3RhdGUnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2xpYi9QbGF5ZXInXG5pbXBvcnQgeyBPYnN0YWNsZSB9IGZyb20gJy4vbGliL09ic3RhY2xlJ1xuXG5sZXQgYXBwID0gZXhwcmVzcygpO1xuXG5sZXQgZ2FtZVN0YXRlID0gbmV3IEdhbWVTdGF0ZSgpXG5cbmxldCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApXG5cbmxldCBpbyA9IG5ldyBTb2NrZXRJTyhzZXJ2ZXIpXG5cbmFwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKVxuYXBwLnVzZShjb3JzKCkpO1xuXG5sZXQgcG9ydCA9IDMwMDJcbnNlcnZlci5saXN0ZW4ocG9ydClcbmNvbnNvbGUubG9nKCdsaXN0ZW5pbmcgb24gcG9ydCAnICsgcG9ydClcblxubGV0IGlkQ291bnQgPSAwXG5cbnZhciBwbGF5ZXJTb2NrZXRzID0gW11cblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0KSA9PiB7XG4gIHNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygncGxheWVyIGRpc2Nvbm5lY3RlZCcpXG5cbiAgICBsZXQgcGxheWVyID0gcGxheWVyU29ja2V0cy5maW5kKChwbGF5ZXIpID0+IHtcbiAgICAgIHJldHVybiBwbGF5ZXIuc29ja2V0ID09PSBzb2NrZXRcbiAgICB9KVxuICAgIGlmIChwbGF5ZXIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoKVxuICAgIGdhbWVTdGF0ZS5wbGF5ZXJzLmZpbHRlcigocCkgPT4ge1xuICAgICAgcmV0dXJuIHAuaWQgIT09IHBsYXllci5pZFxuICAgIH0pXG4gIH0pXG4gIHNvY2tldC5lbWl0KCdzZW5kLWdhbWUtc3RhdGUnLCBnYW1lU3RhdGUpXG4gIHNvY2tldC5vbignY3JlYXRlLXBsYXllcicsIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3BsYXllciBjb25uZWN0ZWQnKVxuICAgIGxldCBpZCA9IGlkQ291bnQrK1xuICAgIHBsYXllclNvY2tldHMucHVzaCh7aWQ6IGlkLCBzb2NrZXQ6IHNvY2tldH0pXG4gICAgbGV0IGNvbG9yID0gJydcbiAgICBsZXQgb3JpZW50YXRpb24gPSAwXG4gICAgbGV0IHBvc1ggPSA1MFxuICAgIGxldCBwb3NZID0gNTBcbiAgICBsZXQgdmVsWCA9IDBcbiAgICBsZXQgdmVsWSA9IDBcbiAgICBsZXQgbmV3UGxheWVyID0gbmV3IFBsYXllcihpZCwgY29sb3IsIG9yaWVudGF0aW9uLCBwb3NYLCBwb3NZLCB2ZWxYLCB2ZWxZKVxuICAgIGdhbWVTdGF0ZS5wbGF5ZXJzLnB1c2gobmV3UGxheWVyKVxuICAgIHNvY2tldC5lbWl0KCdwbGF5ZXItY3JlYXRlZCcsIG5ld1BsYXllcilcbiAgfSlcbiAgc29ja2V0Lm9uKCdzZW5kLXBsYXllci1zdGF0ZScsIChkYXRhKSA9PiB7XG4gICAgbGV0IHBsYXllciA9IGdhbWVTdGF0ZS5nZXRQbGF5ZXIoZGF0YS5pZClcbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm5cbiAgICBwbGF5ZXIucG9zWCA9IGRhdGEucG9zWFxuICAgIHBsYXllci5wb3NZID0gZGF0YS5wb3NZXG4gICAgcGxheWVyLnZlbFggPSBkYXRhLnZlbFhcbiAgICBwbGF5ZXIudmVsWSA9IGRhdGEudmVsWVxuICAgIHBsYXllci5vcmllbnRhdGlvbiA9IGRhdGEub3JpZW50YXRpb25cbiAgfSlcbn0pXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgcGxheWVyU29ja2V0cy5mb3JFYWNoKChwbGF5ZXJTb2NrZXQpID0+IHtcbiAgICBwbGF5ZXJTb2NrZXQuc29ja2V0LmVtaXQoJ3NlbmQtZ2FtZS1zdGF0ZScsIGdhbWVTdGF0ZSlcbiAgfSlcbn0sIDMwKVxuIl19