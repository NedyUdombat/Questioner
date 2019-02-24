'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _multerStorageCloudinary = require('multer-storage-cloudinary');

var _multerStorageCloudinary2 = _interopRequireDefault(_multerStorageCloudinary);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

_cloudinary2.default.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
var storage = (0, _multerStorageCloudinary2.default)({
  cloudinary: _cloudinary2.default,
  folder: 'demo',
  allowedFormats: ['jpg', 'png']
  // transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
exports.default = (0, _multer2.default)({ storage: storage });