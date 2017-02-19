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
    /*let playerSocket = playerSockets.find((player) => {
      return player.id === data.id
    })
    if (playerSocket === null) {
      throw new Error()
    }*/
    //if (playerSocket !== socket)
    //playerSocket.emit('error', { message: 'invalid player'})
    let player = gameState.getPlayer(data.id);
    if (player === undefined) return;
    player.posX = data.posX;
    player.posY = data.posY;
    player.velX = data.velX;
    player.velY = data.velY;
  });
});

setInterval(() => {
  playerSockets.forEach(playerSocket => {
    playerSocket.socket.emit('send-game-state', gameState);
  });
}, 100);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnYW1lU3RhdGUiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJpbyIsInVzZSIsInBvcnQiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIiwiaWRDb3VudCIsInBsYXllclNvY2tldHMiLCJvbiIsInNvY2tldCIsImVtaXQiLCJkYXRhIiwiaWQiLCJwdXNoIiwiY29sb3IiLCJvcmllbnRhdGlvbiIsInBvc1giLCJwb3NZIiwidmVsWCIsInZlbFkiLCJuZXdQbGF5ZXIiLCJwbGF5ZXJzIiwicGxheWVyIiwiZ2V0UGxheWVyIiwidW5kZWZpbmVkIiwic2V0SW50ZXJ2YWwiLCJmb3JFYWNoIiwicGxheWVyU29ja2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLE1BQU0sd0JBQVY7O0FBRUEsSUFBSUMsWUFBWSwwQkFBaEI7O0FBRUEsSUFBSUMsU0FBUyxlQUFLQyxZQUFMLENBQWtCSCxHQUFsQixDQUFiOztBQUVBLElBQUlJLEtBQUsscUJBQWFGLE1BQWIsQ0FBVDs7QUFFQUYsSUFBSUssR0FBSixDQUFRLHNCQUFPLFVBQVAsQ0FBUjtBQUNBTCxJQUFJSyxHQUFKLENBQVEscUJBQVI7O0FBRUEsSUFBSUMsT0FBTyxJQUFYO0FBQ0FKLE9BQU9LLE1BQVAsQ0FBY0QsSUFBZDtBQUNBRSxRQUFRQyxHQUFSLENBQVksdUJBQXVCSCxJQUFuQzs7QUFFQSxJQUFJSSxVQUFVLENBQWQ7O0FBRUEsSUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBUCxHQUFHUSxFQUFILENBQU0sWUFBTixFQUFxQkMsTUFBRCxJQUFZO0FBQzlCQSxTQUFPQyxJQUFQLENBQVksaUJBQVosRUFBK0JiLFNBQS9CO0FBQ0FZLFNBQU9ELEVBQVAsQ0FBVSxlQUFWLEVBQTRCRyxJQUFELElBQVU7QUFDbkNQLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLFFBQUlPLEtBQUtOLFNBQVQ7QUFDQUMsa0JBQWNNLElBQWQsQ0FBbUIsRUFBQ0QsSUFBSUEsRUFBTCxFQUFTSCxRQUFRQSxNQUFqQixFQUFuQjtBQUNBLFFBQUlLLFFBQVEsRUFBWjtBQUNBLFFBQUlDLGNBQWMsQ0FBbEI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxPQUFPLENBQVg7QUFDQSxRQUFJQyxZQUFZLG1CQUFXUixFQUFYLEVBQWVFLEtBQWYsRUFBc0JDLFdBQXRCLEVBQW1DQyxJQUFuQyxFQUF5Q0MsSUFBekMsRUFBK0NDLElBQS9DLEVBQXFEQyxJQUFyRCxDQUFoQjtBQUNBdEIsY0FBVXdCLE9BQVYsQ0FBa0JSLElBQWxCLENBQXVCTyxTQUF2QjtBQUNBWCxXQUFPQyxJQUFQLENBQVksZ0JBQVosRUFBOEJVLFNBQTlCO0FBQ0QsR0FiRDtBQWNBWCxTQUFPRCxFQUFQLENBQVUsbUJBQVYsRUFBZ0NHLElBQUQsSUFBVTtBQUN2Qzs7Ozs7O0FBTUE7QUFDRTtBQUNGLFFBQUlXLFNBQVN6QixVQUFVMEIsU0FBVixDQUFvQlosS0FBS0MsRUFBekIsQ0FBYjtBQUNBLFFBQUlVLFdBQVdFLFNBQWYsRUFDRTtBQUNGRixXQUFPTixJQUFQLEdBQWNMLEtBQUtLLElBQW5CO0FBQ0FNLFdBQU9MLElBQVAsR0FBY04sS0FBS00sSUFBbkI7QUFDQUssV0FBT0osSUFBUCxHQUFjUCxLQUFLTyxJQUFuQjtBQUNBSSxXQUFPSCxJQUFQLEdBQWNSLEtBQUtRLElBQW5CO0FBQ0QsR0FoQkQ7QUFpQkQsQ0FqQ0Q7O0FBbUNBTSxZQUFZLE1BQU07QUFDaEJsQixnQkFBY21CLE9BQWQsQ0FBdUJDLFlBQUQsSUFBa0I7QUFDdENBLGlCQUFhbEIsTUFBYixDQUFvQkMsSUFBcEIsQ0FBeUIsaUJBQXpCLEVBQTRDYixTQUE1QztBQUNELEdBRkQ7QUFHRCxDQUpELEVBSUcsR0FKSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tICcuL2xpYi9HYW1lU3RhdGUnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2xpYi9QbGF5ZXInXG5pbXBvcnQgeyBPYnN0YWNsZSB9IGZyb20gJy4vbGliL09ic3RhY2xlJ1xuXG5sZXQgYXBwID0gZXhwcmVzcygpO1xuXG5sZXQgZ2FtZVN0YXRlID0gbmV3IEdhbWVTdGF0ZSgpXG5cbmxldCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApXG5cbmxldCBpbyA9IG5ldyBTb2NrZXRJTyhzZXJ2ZXIpXG5cbmFwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKVxuYXBwLnVzZShjb3JzKCkpO1xuXG5sZXQgcG9ydCA9IDMwMDJcbnNlcnZlci5saXN0ZW4ocG9ydClcbmNvbnNvbGUubG9nKCdsaXN0ZW5pbmcgb24gcG9ydCAnICsgcG9ydClcblxubGV0IGlkQ291bnQgPSAwXG5cbnZhciBwbGF5ZXJTb2NrZXRzID0gW11cblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0KSA9PiB7XG4gIHNvY2tldC5lbWl0KCdzZW5kLWdhbWUtc3RhdGUnLCBnYW1lU3RhdGUpXG4gIHNvY2tldC5vbignY3JlYXRlLXBsYXllcicsIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3BsYXllciBjb25uZWN0ZWQnKVxuICAgIGxldCBpZCA9IGlkQ291bnQrK1xuICAgIHBsYXllclNvY2tldHMucHVzaCh7aWQ6IGlkLCBzb2NrZXQ6IHNvY2tldH0pXG4gICAgbGV0IGNvbG9yID0gJydcbiAgICBsZXQgb3JpZW50YXRpb24gPSAwXG4gICAgbGV0IHBvc1ggPSA1MFxuICAgIGxldCBwb3NZID0gNTBcbiAgICBsZXQgdmVsWCA9IDBcbiAgICBsZXQgdmVsWSA9IDBcbiAgICBsZXQgbmV3UGxheWVyID0gbmV3IFBsYXllcihpZCwgY29sb3IsIG9yaWVudGF0aW9uLCBwb3NYLCBwb3NZLCB2ZWxYLCB2ZWxZKVxuICAgIGdhbWVTdGF0ZS5wbGF5ZXJzLnB1c2gobmV3UGxheWVyKVxuICAgIHNvY2tldC5lbWl0KCdwbGF5ZXItY3JlYXRlZCcsIG5ld1BsYXllcilcbiAgfSlcbiAgc29ja2V0Lm9uKCdzZW5kLXBsYXllci1zdGF0ZScsIChkYXRhKSA9PiB7XG4gICAgLypsZXQgcGxheWVyU29ja2V0ID0gcGxheWVyU29ja2V0cy5maW5kKChwbGF5ZXIpID0+IHtcbiAgICAgIHJldHVybiBwbGF5ZXIuaWQgPT09IGRhdGEuaWRcbiAgICB9KVxuICAgIGlmIChwbGF5ZXJTb2NrZXQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgfSovXG4gICAgLy9pZiAocGxheWVyU29ja2V0ICE9PSBzb2NrZXQpXG4gICAgICAvL3BsYXllclNvY2tldC5lbWl0KCdlcnJvcicsIHsgbWVzc2FnZTogJ2ludmFsaWQgcGxheWVyJ30pXG4gICAgbGV0IHBsYXllciA9IGdhbWVTdGF0ZS5nZXRQbGF5ZXIoZGF0YS5pZClcbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm5cbiAgICBwbGF5ZXIucG9zWCA9IGRhdGEucG9zWFxuICAgIHBsYXllci5wb3NZID0gZGF0YS5wb3NZXG4gICAgcGxheWVyLnZlbFggPSBkYXRhLnZlbFhcbiAgICBwbGF5ZXIudmVsWSA9IGRhdGEudmVsWVxuICB9KVxufSlcblxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICBwbGF5ZXJTb2NrZXRzLmZvckVhY2goKHBsYXllclNvY2tldCkgPT4ge1xuICAgIHBsYXllclNvY2tldC5zb2NrZXQuZW1pdCgnc2VuZC1nYW1lLXN0YXRlJywgZ2FtZVN0YXRlKVxuICB9KVxufSwgMTAwKVxuIl19