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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();

let server = _http2.default.createServer(app);

let io = new _socket2.default(server);

app.use((0, _morgan2.default)('combined'));
app.use((0, _cors2.default)());

server.listen(3000);
console.log('listening on port 3000');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJpbyIsInVzZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsTUFBTSx3QkFBVjs7QUFHQSxJQUFJQyxTQUFTLGVBQUtDLFlBQUwsQ0FBa0JGLEdBQWxCLENBQWI7O0FBRUEsSUFBSUcsS0FBSyxxQkFBYUYsTUFBYixDQUFUOztBQUVBRCxJQUFJSSxHQUFKLENBQVEsc0JBQU8sVUFBUCxDQUFSO0FBQ0FKLElBQUlJLEdBQUosQ0FBUSxxQkFBUjs7QUFHQUgsT0FBT0ksTUFBUCxDQUFjLElBQWQ7QUFDQUMsUUFBUUMsR0FBUixDQUFZLHdCQUFaIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnXG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbidcblxubGV0IGFwcCA9IGV4cHJlc3MoKTtcblxuXG5sZXQgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKVxuXG5sZXQgaW8gPSBuZXcgU29ja2V0SU8oc2VydmVyKVxuXG5hcHAudXNlKG1vcmdhbignY29tYmluZWQnKSlcbmFwcC51c2UoY29ycygpKTtcblxuXG5zZXJ2ZXIubGlzdGVuKDMwMDApXG5jb25zb2xlLmxvZygnbGlzdGVuaW5nIG9uIHBvcnQgMzAwMCcpXG5cbiJdfQ==