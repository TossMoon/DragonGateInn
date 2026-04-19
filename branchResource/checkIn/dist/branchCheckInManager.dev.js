"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../template/allBranchManager'),
    branchManager = _require.branchManager,
    allBranchManager = _require.allBranchManager;

var _require2 = require('./checkIn'),
    checkIn = _require2.checkIn;

var assert = require('assert');
/**
 * 分店入住管理类
 */


var branchCheckInManager =
/*#__PURE__*/
function (_branchManager) {
  _inherits(branchCheckInManager, _branchManager);

  function branchCheckInManager(branchIdString) {
    _classCallCheck(this, branchCheckInManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(branchCheckInManager).call(this, branchIdString));
  }
  /**
   * 添加入住订单
   * @param {checkIn} newCheckIn 新入住订单的引用类型对象
   */


  _createClass(branchCheckInManager, [{
    key: "addNewCheckIn",
    value: function addNewCheckIn(newCheckIn) {
      assert(newCheckIn instanceof checkIn);
      this.addObject(newCheckIn);
    }
    /**
     * 结束入住订单
     * @param {string} checkInId 入住订单的编号
     */

  }, {
    key: "setCheckOut",
    value: function setCheckOut(checkInId) {
      assert(typeof checkInId === 'string');
      var checkIn = this.getOneObjectById(checkInId);

      if (checkIn) {
        checkIn.setCheckOutDateAsNow();
      }
    }
  }]);

  return branchCheckInManager;
}(branchManager);

module.exports = branchCheckInManager;