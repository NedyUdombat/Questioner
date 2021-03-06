'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);

    this.errors = [];
    this.hasErrors = false;
  }

  _createClass(Validator, [{
    key: 'validate',
    value: function validate(value, rules) {
      this.validateRules(value, rules);

      // return this.errors.length === 0 ? true : this.errors;
    }
  }, {
    key: 'validateRules',
    value: function validateRules(value, rules) {
      var self = this;
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          var rule = rules.split('|');

          for (var i = 0; i < rule.length; i++) {
            self[rule[i]](value[key], key);
          }
        }
      }
    }
  }, {
    key: 'string',
    value: function string(value, key) {
      if (typeof value !== 'string') {
        this.hasErrors = true;
        this.errors.push({ error: 'This field:' + key + ' must be a string' });
      }
    }
  }, {
    key: 'required',
    value: function required(value, key) {
      if (value === '' || value === null || typeof value === 'undefined') {
        this.hasErrors = true;
        this.errors.push({ error: 'This field:' + key + ' cannot be empty' });
      }
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      return this.errors;
    }
  }]);

  return Validator;
}();

exports.default = Validator;