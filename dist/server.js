'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/v1/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json({ message: 'Hi there! Welcome to our Questioner api! Visit /api/v1 for the Version 1 of out api' });
});

app.use('/api/v1', _index2.default);

app.get('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    message: 'The page you are looking for does not exist'
  });
});

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  app.listen(port, function () {
    console.log('Questioner app is live at http://127.0.0.1:' + port);
  });
} else {
  app.listen(port);
}
exports.default = app;