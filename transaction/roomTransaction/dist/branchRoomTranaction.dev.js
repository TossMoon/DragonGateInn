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

var allRoomManager = require('../../room/allRoomManager');
/**
 * 分店可以操作的房间事务
 */


var branchRoomTransaction =
/*#__PURE__*/
function (_transaction) {
  _inherits(branchRoomTransaction, _transaction);

  function branchRoomTransaction() {
    _classCallCheck(this, branchRoomTransaction);

    return _possibleConstructorReturn(this, _getPrototypeOf(branchRoomTransaction).call(this));
  }
  /**
   * 检查添加的变量是否是房间id(是否是string类型，是否在管理器中存在)
   * @returns {boolean} 如果参数符合要求则返回true，否则返回false
   */


  _createClass(branchRoomTransaction, [{
    key: "checkRoomIdArg",
    value: function checkRoomIdArg(args) {
      return args.every(function (item, index) {
        if (index > 0) {
          return typeof item === 'string' && transaction.getManager(allRoomManager).getOneRoomById(item) !== null;
        }

        return true;
      });
    }
    /**
     * 检查分店是否存在,是否存储在全局所有房间管理器中
     * @param {string} branchId 分店id
     * @returns {boolean} 如果分店存在则返回true，否则返回false
     */

  }, {
    key: "checkBranchExist",
    value: function checkBranchExist(branchId) {
      return transaction.getManager(allRoomManager).getOneRoomManagerByBranchId(branchId) !== null;
    }
    /**
     * 检查参数是否符合要求，包括参数的数量，参数第一个是否是分店的id
     * @param {array} args 参数数组
     * @returns {boolean} 如果参数符合要求则返回true，否则返回false
     */

  }, {
    key: "checkBranchArg",
    value: function checkBranchArg(args) {
      if (args.length < 2) {
        return false;
      }

      if (!args.every(function (item, index) {
        if (index == 0) {
          return typeof item === 'string';
        }

        return true;
      })) {
        return false;
      }

      if (!this.checkBranchExist(args[0])) {
        return false;
      }

      return true;
    }
    /**
     * 获取分店的房间管理器
     * @param {string} branchId 分店id
     * @returns {branchRoomManager} 分店的房间管理器
     */

  }, {
    key: "getNeedChangeBranchRoomManager",
    value: function getNeedChangeBranchRoomManager(branchId) {
      return transaction.getManager(allRoomManager).getOneRoomManagerByBranchId(branchId);
    }
    /**
     * 
     */

  }, {
    key: "execute",
    value: function execute() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(branchRoomTransaction.prototype), "execute", this)).call.apply(_get2, [this].concat(args));
    }
  }]);

  return branchRoomTransaction;
}(transaction);

module.exports = branchRoomTransaction;