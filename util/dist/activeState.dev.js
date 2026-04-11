"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert'); //标记一个数据是否是启用状态


var activeState =
/*#__PURE__*/
function () {
  function activeState(activeBool) {
    _classCallCheck(this, activeState);

    assert(typeof activeBool === 'boolean');
    this.activeBool = activeBool;
  }

  _createClass(activeState, [{
    key: "getActiveBool",
    value: function getActiveBool() {
      return this.activeBool;
    }
  }, {
    key: "setActive",
    value: function setActive() {
      this.activeBool = true;
    }
  }, {
    key: "setDisable",
    value: function setDisable() {
      this.activeBool = false;
    }
  }]);

  return activeState;
}();

module.exports = activeState;