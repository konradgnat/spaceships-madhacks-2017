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

server.listen(3000);
console.log('listening on port 3000');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJwMSIsIm8xIiwiZ2FtZVN0YXRlIiwic2VydmVyIiwiY3JlYXRlU2VydmVyIiwiaW8iLCJ1c2UiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLE1BQU0sd0JBQVY7O0FBRUEsSUFBSUMsS0FBSyxtQkFBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixDQUFUO0FBQ0EsSUFBSUMsS0FBSyx1QkFBYSxDQUFiLEVBQWdCLENBQWhCLENBQVQ7QUFDQSxJQUFJQyxZQUFZLDBCQUFoQjs7QUFFQSxJQUFJQyxTQUFTLGVBQUtDLFlBQUwsQ0FBa0JMLEdBQWxCLENBQWI7O0FBRUEsSUFBSU0sS0FBSyxxQkFBYUYsTUFBYixDQUFUOztBQUVBSixJQUFJTyxHQUFKLENBQVEsc0JBQU8sVUFBUCxDQUFSO0FBQ0FQLElBQUlPLEdBQUosQ0FBUSxxQkFBUjs7QUFHQUgsT0FBT0ksTUFBUCxDQUFjLElBQWQ7QUFDQUMsUUFBUUMsR0FBUixDQUFZLHdCQUFaIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnXG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbidcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vbGliL0dhbWVTdGF0ZSdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbGliL1BsYXllcidcbmltcG9ydCB7IE9ic3RhY2xlIH0gZnJvbSAnLi9saWIvT2JzdGFjbGUnXG5cbmxldCBhcHAgPSBleHByZXNzKCk7XG5cbmxldCBwMSA9IG5ldyBQbGF5ZXIoMSwgMiwgMywgNCwgNSwgNiwgNylcbmxldCBvMSA9IG5ldyBPYnN0YWNsZSgxLCAyKVxubGV0IGdhbWVTdGF0ZSA9IG5ldyBHYW1lU3RhdGUoKVxuXG5sZXQgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKVxuXG5sZXQgaW8gPSBuZXcgU29ja2V0SU8oc2VydmVyKVxuXG5hcHAudXNlKG1vcmdhbignY29tYmluZWQnKSlcbmFwcC51c2UoY29ycygpKTtcblxuXG5zZXJ2ZXIubGlzdGVuKDMwMDApXG5jb25zb2xlLmxvZygnbGlzdGVuaW5nIG9uIHBvcnQgMzAwMCcpXG5cbiJdfQ==