'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rsvpMeetupSchema = {
  body: {
    status: _joi2.default.string().lowercase().required()
  },
  params: {
    id: _joi2.default.number().required()
  }
};
console.log(rsvpMeetupSchema);
exports.default = rsvpMeetupSchema;