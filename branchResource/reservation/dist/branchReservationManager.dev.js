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

var assert = require('assert');

var _require = require('../template/allBranchManager'),
    branchManager = _require.branchManager;

var _require2 = require('./reservation'),
    reservation = _require2.reservation,
    reservationState = _require2.reservationState;
/**
 * 分店预约管理类
 */


var branchReservationManager =
/*#__PURE__*/
function (_branchManager) {
  _inherits(branchReservationManager, _branchManager);

  function branchReservationManager(branchIdString) {
    _classCallCheck(this, branchReservationManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(branchReservationManager).call(this, branchIdString));
  }
  /**
   * 添加预约
   * @param {reservation} newReservation 新预约的引用类型对象
   */


  _createClass(branchReservationManager, [{
    key: "addNewReservation",
    value: function addNewReservation(newReservation) {
      assert(newReservation instanceof reservation);
      this.addObject(newReservation);
    }
    /**
     * 获取所有待确认的预约订单
     * @returns {reservation[]} 所有待确认的预约订单的引用类型对象数组
     */

  }, {
    key: "getPendingStateReservation",
    value: function getPendingStateReservation() {
      return this.getAllObjectList().filter(function (reservation) {
        return reservation.getState() === reservationState.state.pending;
      });
    }
    /**
     * 酒店确认顾客提交的订单
     * @param {string} reservationId 预约订单的编号
     */

  }, {
    key: "setConfirmedState",
    value: function setConfirmedState(reservationId) {
      assert(typeof reservationId === 'string');
      var reservation = this.getOneObjectById(reservationId);

      if (reservation) {
        reservation.confirm();
      }
    }
    /**
     * 酒店取消顾客提交的订单
     * @param {string} reservationId 预约订单的编号
     */

  }, {
    key: "setCanceledState",
    value: function setCanceledState(reservationId) {
      assert(typeof reservationId === 'string');
      var reservation = this.getOneObjectById(reservationId);

      if (reservation) {
        reservation.cancel();
      }
    }
  }]);

  return branchReservationManager;
}(branchManager);

module.exports = branchReservationManager;