'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secretHash = process.env.SECRET_KEY;

var JwtDecode = function () {
  function JwtDecode() {
    _classCallCheck(this, JwtDecode);
  }

  _createClass(JwtDecode, null, [{
    key: 'jwtDecode',
    value: function jwtDecode(req, res) {
      var jwToken = req.headers['x-access-token'];
      if (!jwToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

      _jsonwebtoken2.default.verify(jwToken, secretHash, function (err, decoded) {
        res.status(200).json(decoded);
      });
    }
  }]);

  return JwtDecode;
}();

exports.default = JwtDecode;