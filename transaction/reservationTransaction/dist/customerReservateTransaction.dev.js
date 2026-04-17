"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var transaction = require('../transaction');

var _require = require('../../branchResource/room/room'),
    RoomLayout = _require.RoomLayout,
    BedInRoom = _require.BedInRoom;

var customerManager = require('../../accountManager/customerAccountManager');

var branchManager = require('../../accountManager/branchAccountManager');

var _require2 = require('../../branchResource/reservation/reservation'),
    reservationFactory = _require2.reservationFactory;

var branchReservationManager = require('../../branchResource/reservation/branchReservationManager');

var allReservationManager = require('../../branchResource/reservation/allReservationManager');
/**
 * 顾客的预订房间事务
 */


var customerReservateTransaction =
/*#__PURE__*/
function (_transaction) {
  _inherits(customerReservateTransaction, _transaction);

  function customerReservateTransaction() {
    _classCallCheck(this, customerReservateTransaction);

    return _possibleConstructorReturn(this, _getPrototypeOf(customerReservateTransaction).call(this));
  }
  /**
   * 执行预订房间事务
   * @param {...any} args 顾客的预订房间事务的参数
   * @returns {any} 预约订单
   */


  _createClass(customerReservateTransaction, [{
    key: "execute",
    value: function execute() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(customerReservateTransaction.prototype), "execute", this)).call.apply(_get2, [this].concat(args)); // 执行预订房间事务


      var customerId = args[0],
          branchId = args[1],
          roomLayout = args[2]; // 检查顾客是否存在

      var customer = transaction.getManager(customerManager).getOneAccountByID(customerId);

      if (customer == undefined) {
        return this.packageResult(false, null, "顾客不存在");
      } // 检查分支是否存在


      var branch = transaction.getManager(branchManager).getOneAccountByID(branchId);

      if (branch == undefined) {
        return this.packageResult(false, null, "分支不存在");
      }

      if (transaction.getManager(allReservationManager).getOneManagerByBranchId(branchId) === undefined) {
        return this.packageResult(false, null, "该分店对应的预定管理器不存在");
      } //根据输入的数据创建房间布局


      var requireRoomLayout = new RoomLayout(roomLayout.area, roomLayout.windowBool, new BedInRoom(roomLayout.typeString, roomLayout.numId)); //创建预约订单

      var newReservation = reservationFactory(customerId, branchId, requireRoomLayout); //向分店预约管理类添加预约订单

      transaction.getManager(allReservationManager).getOneManagerByBranchId(branchId).addNewReservation(newReservation);
      return this.packageResult(true, newReservation, "预订成功");
    }
  }]);

  return customerReservateTransaction;
}(transaction);

module.exports = customerReservateTransaction;