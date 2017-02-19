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
      return player.socket == socket;
    });
    if (player === undefined) return new Error();
    gameState.players.filter(p => {
      return p.id != player.id;
    });
    io.emit('player-disconnected', { id: socket.id });
  });
  socket.emit('send-game-state', gameState);
  socket.on('create-player', data => {
    console.log('player connected');
    let id = socket.id;
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
  socket.on('my-bullet-fired', data => {
    console.log('bullet fired');
    io.emit('bullet-fired', data);
  });
});

setInterval(() => {
  io.emit('send-game-state', gameState);
}, 30);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnYW1lU3RhdGUiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJpbyIsInVzZSIsInBvcnQiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIiwiaWRDb3VudCIsInBsYXllclNvY2tldHMiLCJvbiIsInNvY2tldCIsInBsYXllciIsImZpbmQiLCJ1bmRlZmluZWQiLCJFcnJvciIsInBsYXllcnMiLCJmaWx0ZXIiLCJwIiwiaWQiLCJlbWl0IiwiZGF0YSIsInB1c2giLCJjb2xvciIsIm9yaWVudGF0aW9uIiwicG9zWCIsInBvc1kiLCJ2ZWxYIiwidmVsWSIsIm5ld1BsYXllciIsImdldFBsYXllciIsInNldEludGVydmFsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLE1BQU0sd0JBQVY7O0FBRUEsSUFBSUMsWUFBWSwwQkFBaEI7O0FBRUEsSUFBSUMsU0FBUyxlQUFLQyxZQUFMLENBQWtCSCxHQUFsQixDQUFiOztBQUVBLElBQUlJLEtBQUsscUJBQWFGLE1BQWIsQ0FBVDs7QUFFQUYsSUFBSUssR0FBSixDQUFRLHNCQUFPLFVBQVAsQ0FBUjtBQUNBTCxJQUFJSyxHQUFKLENBQVEscUJBQVI7O0FBRUEsSUFBSUMsT0FBTyxJQUFYO0FBQ0FKLE9BQU9LLE1BQVAsQ0FBY0QsSUFBZDtBQUNBRSxRQUFRQyxHQUFSLENBQVksdUJBQXVCSCxJQUFuQzs7QUFFQSxJQUFJSSxVQUFVLENBQWQ7O0FBRUEsSUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBUCxHQUFHUSxFQUFILENBQU0sWUFBTixFQUFxQkMsTUFBRCxJQUFZO0FBQzlCQSxTQUFPRCxFQUFQLENBQVUsWUFBVixFQUF3QixNQUFNO0FBQzVCSixZQUFRQyxHQUFSLENBQVkscUJBQVo7O0FBRUEsUUFBSUssU0FBU0gsY0FBY0ksSUFBZCxDQUFvQkQsTUFBRCxJQUFZO0FBQzFDLGFBQU9BLE9BQU9ELE1BQVAsSUFBaUJBLE1BQXhCO0FBQ0QsS0FGWSxDQUFiO0FBR0EsUUFBSUMsV0FBV0UsU0FBZixFQUNFLE9BQU8sSUFBSUMsS0FBSixFQUFQO0FBQ0ZoQixjQUFVaUIsT0FBVixDQUFrQkMsTUFBbEIsQ0FBMEJDLENBQUQsSUFBTztBQUM5QixhQUFPQSxFQUFFQyxFQUFGLElBQVFQLE9BQU9PLEVBQXRCO0FBQ0QsS0FGRDtBQUdBakIsT0FBR2tCLElBQUgsQ0FBUSxxQkFBUixFQUErQixFQUFDRCxJQUFJUixPQUFPUSxFQUFaLEVBQS9CO0FBQ0QsR0FaRDtBQWFBUixTQUFPUyxJQUFQLENBQVksaUJBQVosRUFBK0JyQixTQUEvQjtBQUNBWSxTQUFPRCxFQUFQLENBQVUsZUFBVixFQUE0QlcsSUFBRCxJQUFVO0FBQ25DZixZQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQSxRQUFJWSxLQUFLUixPQUFPUSxFQUFoQjtBQUNBVixrQkFBY2EsSUFBZCxDQUFtQixFQUFDSCxJQUFJQSxFQUFMLEVBQVNSLFFBQVFBLE1BQWpCLEVBQW5CO0FBQ0EsUUFBSVksUUFBUSxFQUFaO0FBQ0EsUUFBSUMsY0FBYyxDQUFsQjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sQ0FBWDtBQUNBLFFBQUlDLE9BQU8sQ0FBWDtBQUNBLFFBQUlDLFlBQVksbUJBQVdWLEVBQVgsRUFBZUksS0FBZixFQUFzQkMsV0FBdEIsRUFBbUNDLElBQW5DLEVBQXlDQyxJQUF6QyxFQUErQ0MsSUFBL0MsRUFBcURDLElBQXJELENBQWhCO0FBQ0E3QixjQUFVaUIsT0FBVixDQUFrQk0sSUFBbEIsQ0FBdUJPLFNBQXZCO0FBQ0FsQixXQUFPUyxJQUFQLENBQVksZ0JBQVosRUFBOEJTLFNBQTlCO0FBQ0QsR0FiRDtBQWNBbEIsU0FBT0QsRUFBUCxDQUFVLG1CQUFWLEVBQWdDVyxJQUFELElBQVU7QUFDdkMsUUFBSVQsU0FBU2IsVUFBVStCLFNBQVYsQ0FBb0JULEtBQUtGLEVBQXpCLENBQWI7QUFDQSxRQUFJUCxXQUFXRSxTQUFmLEVBQ0U7QUFDRkYsV0FBT2EsSUFBUCxHQUFjSixLQUFLSSxJQUFuQjtBQUNBYixXQUFPYyxJQUFQLEdBQWNMLEtBQUtLLElBQW5CO0FBQ0FkLFdBQU9lLElBQVAsR0FBY04sS0FBS00sSUFBbkI7QUFDQWYsV0FBT2dCLElBQVAsR0FBY1AsS0FBS08sSUFBbkI7QUFDQWhCLFdBQU9ZLFdBQVAsR0FBcUJILEtBQUtHLFdBQTFCO0FBQ0QsR0FURDtBQVVBYixTQUFPRCxFQUFQLENBQVUsaUJBQVYsRUFBOEJXLElBQUQsSUFBVTtBQUNyQ2YsWUFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQUwsT0FBR2tCLElBQUgsQ0FBUSxjQUFSLEVBQXdCQyxJQUF4QjtBQUNELEdBSEQ7QUFJRCxDQTNDRDs7QUE2Q0FVLFlBQVksTUFBTTtBQUNoQjdCLEtBQUdrQixJQUFILENBQVEsaUJBQVIsRUFBMkJyQixTQUEzQjtBQUNELENBRkQsRUFFRyxFQUZIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnXG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbidcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vbGliL0dhbWVTdGF0ZSdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbGliL1BsYXllcidcbmltcG9ydCB7IE9ic3RhY2xlIH0gZnJvbSAnLi9saWIvT2JzdGFjbGUnXG5cbmxldCBhcHAgPSBleHByZXNzKCk7XG5cbmxldCBnYW1lU3RhdGUgPSBuZXcgR2FtZVN0YXRlKClcblxubGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcClcblxubGV0IGlvID0gbmV3IFNvY2tldElPKHNlcnZlcilcblxuYXBwLnVzZShtb3JnYW4oJ2NvbWJpbmVkJykpXG5hcHAudXNlKGNvcnMoKSk7XG5cbmxldCBwb3J0ID0gMzAwMlxuc2VydmVyLmxpc3Rlbihwb3J0KVxuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcgKyBwb3J0KVxuXG5sZXQgaWRDb3VudCA9IDBcblxudmFyIHBsYXllclNvY2tldHMgPSBbXVxuXG5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIgZGlzY29ubmVjdGVkJylcblxuICAgIGxldCBwbGF5ZXIgPSBwbGF5ZXJTb2NrZXRzLmZpbmQoKHBsYXllcikgPT4ge1xuICAgICAgcmV0dXJuIHBsYXllci5zb2NrZXQgPT0gc29ja2V0XG4gICAgfSlcbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gbmV3IEVycm9yKClcbiAgICBnYW1lU3RhdGUucGxheWVycy5maWx0ZXIoKHApID0+IHtcbiAgICAgIHJldHVybiBwLmlkICE9IHBsYXllci5pZFxuICAgIH0pXG4gICAgaW8uZW1pdCgncGxheWVyLWRpc2Nvbm5lY3RlZCcsIHtpZDogc29ja2V0LmlkIH0pXG4gIH0pXG4gIHNvY2tldC5lbWl0KCdzZW5kLWdhbWUtc3RhdGUnLCBnYW1lU3RhdGUpXG4gIHNvY2tldC5vbignY3JlYXRlLXBsYXllcicsIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3BsYXllciBjb25uZWN0ZWQnKVxuICAgIGxldCBpZCA9IHNvY2tldC5pZFxuICAgIHBsYXllclNvY2tldHMucHVzaCh7aWQ6IGlkLCBzb2NrZXQ6IHNvY2tldH0pXG4gICAgbGV0IGNvbG9yID0gJydcbiAgICBsZXQgb3JpZW50YXRpb24gPSAwXG4gICAgbGV0IHBvc1ggPSA1MFxuICAgIGxldCBwb3NZID0gNTBcbiAgICBsZXQgdmVsWCA9IDBcbiAgICBsZXQgdmVsWSA9IDBcbiAgICBsZXQgbmV3UGxheWVyID0gbmV3IFBsYXllcihpZCwgY29sb3IsIG9yaWVudGF0aW9uLCBwb3NYLCBwb3NZLCB2ZWxYLCB2ZWxZKVxuICAgIGdhbWVTdGF0ZS5wbGF5ZXJzLnB1c2gobmV3UGxheWVyKVxuICAgIHNvY2tldC5lbWl0KCdwbGF5ZXItY3JlYXRlZCcsIG5ld1BsYXllcilcbiAgfSlcbiAgc29ja2V0Lm9uKCdzZW5kLXBsYXllci1zdGF0ZScsIChkYXRhKSA9PiB7XG4gICAgbGV0IHBsYXllciA9IGdhbWVTdGF0ZS5nZXRQbGF5ZXIoZGF0YS5pZClcbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm5cbiAgICBwbGF5ZXIucG9zWCA9IGRhdGEucG9zWFxuICAgIHBsYXllci5wb3NZID0gZGF0YS5wb3NZXG4gICAgcGxheWVyLnZlbFggPSBkYXRhLnZlbFhcbiAgICBwbGF5ZXIudmVsWSA9IGRhdGEudmVsWVxuICAgIHBsYXllci5vcmllbnRhdGlvbiA9IGRhdGEub3JpZW50YXRpb25cbiAgfSlcbiAgc29ja2V0Lm9uKCdteS1idWxsZXQtZmlyZWQnLCAoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdidWxsZXQgZmlyZWQnKVxuICAgIGlvLmVtaXQoJ2J1bGxldC1maXJlZCcsIGRhdGEpXG4gIH0pXG59KVxuXG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIGlvLmVtaXQoJ3NlbmQtZ2FtZS1zdGF0ZScsIGdhbWVTdGF0ZSlcbn0sIDMwKVxuIl19