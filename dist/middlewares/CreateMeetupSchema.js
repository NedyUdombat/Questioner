'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMeetupSchema = {
  body: {
    organizer: _joi2.default.string().required(),
    topic: _joi2.default.string().required(),
    happeningOn: _joi2.default.string().required(),
    location: _joi2.default.string().required(),
    tags: _joi2.default.array().items(_joi2.default.string()),
    images: _joi2.default.string(),
    isAdmin: _joi2.default.boolean()
  }
};

exports.default = createMeetupSchema;