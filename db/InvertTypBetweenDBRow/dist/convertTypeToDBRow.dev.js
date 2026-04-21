"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert');

var branchAccount = require('../../account/branchAccount');

var customerAccount = require('../../account/customerAccount');

var headquarterAccount = require('../../account/headquarterAccount');

var _require = require('../../branchResource/checkIn/checkIn'),
    checkIn = _require.checkIn,
    person = _require.person,
    checkInFactory = _require.checkInFactory;

var _require2 = require('../../branchResource/reservation/reservation'),
    reservationState = _require2.reservationState,
    reservation = _require2.reservation,
    reservationFactory = _require2.reservationFactory;

var _require3 = require('../../branchResource/room/room'),
    room = _require3.room,
    RoomLayout = _require3.RoomLayout,
    BedInRoom = _require3.BedInRoom;

var activeState = require('../../util/activeState');

var convertTypeToDBRow =
/*#__PURE__*/
function () {
  function convertTypeToDBRow() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, convertTypeToDBRow);

    this.converters = new Map();
    this.flattenArrays = options.flattenArrays;
    this.dateFormat = options.dateFormat || 'datetime';

    this._registerDefaultConverters();
  }
  /**
   * 注册默认的转换器,都是项目里需要使用的，
   * 作为数据库里的一行里的几个字段的数据类型
   */


  _createClass(convertTypeToDBRow, [{
    key: "_registerDefaultConverters",
    value: function _registerDefaultConverters() {
      var _this = this;

      this.registerConverter(activeState, function (instance) {
        return instance.getActiveBool() ? 1 : 0;
      });
      this.registerConverter(person, function (instance) {
        return {
          name: instance.name,
          identityCard: instance.identityCard
        };
      });
      this.registerConverter(BedInRoom, function (instance) {
        return {
          typeString: instance.typeString,
          numInt: instance.numInt
        };
      });
      this.registerConverter(RoomLayout, function (instance) {
        return {
          areaReal: instance.areaReal,
          windowBool: instance.windowBool ? 1 : 0,
          bedType: _this.convertToDBRow(instance.bedType)
        };
      });
      this.registerConverter(reservationState, function (instance) {
        return instance.getState();
      });
    }
    /**
     * 注册类对应的构造数据库中表的各个字段
     * @param {function} classType 要构造的类型
     * @param {function} converterFn 将类型里面各个成员变量构造成对象
     */

  }, {
    key: "registerConverter",
    value: function registerConverter(classType, converterFn) {
      assert(typeof classType === 'function', 'classType must be a constructor function');
      assert(typeof converterFn === 'function', 'converterFn must be a function');
      this.converters.set(classType, converterFn);
    }
    /**
     * 对通用类型（也就是没有在这文件里预先定义的类）
     * 将类实例转换为数据库中的一行的行
     * @param {Object} instance - 类的实例
     * @returns {Object} 数据库中的一行的行
     */

  }, {
    key: "convertToDBRow",
    value: function convertToDBRow(instance) {
      if (instance === null || instance === undefined) {
        return null;
      }

      if (this.converters.has(instance.constructor)) {
        var result = this.converters.get(instance.constructor)(instance);

        if (result instanceof Object && !(result instanceof Date) && !Array.isArray(result)) {
          return this._flattenObject(result);
        }

        return result;
      }

      if (instance instanceof Date) {
        return this._formatDate(instance);
      }

      if (Array.isArray(instance)) {
        return this._convertArray(instance);
      }

      if (instance instanceof Object) {
        return this._convertComplexObject(instance);
      }

      return instance;
    }
    /**
     * 将数组转换为数据库中的一行的字段
     * @param {Array} arr - 数组
     * @returns {Array} 数据库中的一行的字段
     */

  }, {
    key: "_convertArray",
    value: function _convertArray(arr) {
      var _this2 = this;

      if (!this.flattenArrays) {
        return JSON.stringify(arr);
      }

      return arr.map(function (item) {
        return _this2.convertToDBRow(item);
      });
    }
    /**
     * 将对象转换为数据库中的一行的字段
     * @param {Object} obj - 对象
     * @returns {Object} 数据库中的一行的字段
     */

  }, {
    key: "_convertComplexObject",
    value: function _convertComplexObject(obj) {
      var _this3 = this;

      var result = {};
      Object.keys(obj).filter(function (key) {
        return key !== 'constructor';
      }).forEach(function (key) {
        result[key] = _this3.convertToDBRow(obj[key]);
      });
      return result;
    }
    /**
     * 将嵌套的对象展开，转换为字段前的前缀
     * @param {Object} obj - 对象
     * @returns {Object} 数据库中的一行的字段
     */

  }, {
    key: "_flattenObject",
    value: function _flattenObject(obj) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var result = {};

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var newKey = prefix ? "".concat(prefix, "_").concat(key) : key;

        if (Array.isArray(value)) {
          result[newKey] = this._convertArray(value);
        } else if (value instanceof Date) {
          result[newKey] = this._formatDate(value);
        } else if (value instanceof Object && !this.converters.has(value.constructor)) {
          Object.assign(result, this._flattenObject(value, newKey));
        } else {
          result[newKey] = value;
        }
      }

      return result;
    }
    /**
     * 将日期转换为数据库中的一行的字段
     * @param {Date} date - 日期
     * @returns {string} 数据库中的一行的字段
     */

  }, {
    key: "_formatDate",
    value: function _formatDate(date) {
      if (this.dateFormat === 'timestamp') {
        return date.getTime();
      } else if (this.dateFormat === 'date') {
        return date.toISOString().split('T')[0];
      } else if (this.dateFormat === 'datetime') {
        return date.toISOString();
      }

      return date;
    } //--------------基本类型----------------
    //都是项目里需要作为一行存入数据库的类型

  }, {
    key: "convertBranchAccount",
    value: function convertBranchAccount(curInstance) {
      assert(curInstance instanceof branchAccount);
      var result = {
        id: curInstance.getID(),
        password: curInstance.getPassword()
      };
      return this._flattenObject(result);
    }
  }, {
    key: "convertHeadquarterAccount",
    value: function convertHeadquarterAccount(curInstance) {
      assert(curInstance instanceof headquarterAccount);
      var result = {
        id: curInstance.getID(),
        password: curInstance.getPassword()
      };
      return this._flattenObject(result);
    }
  }, {
    key: "convertCustomerAccount",
    value: function convertCustomerAccount(curInstance) {
      assert(curInstance instanceof customerAccount);
      var result = {
        id: curInstance.getID(),
        password: curInstance.getPassword(),
        phone: curInstance.getPhoneString()
      };
      return this._flattenObject(result);
    }
  }, {
    key: "convertCheckIn",
    value: function convertCheckIn(curInstance) {
      assert(curInstance instanceof checkIn);
      var result = {
        id: curInstance.getID(),
        branchId: curInstance.getBranchId(),
        roomId: curInstance.getRoomId(),
        checkInDate: curInstance.getCheckInDate(),
        checkOutDate: curInstance.getCheckOutDate(),
        person: this.convertToDBRow(curInstance.getPerson()),
        reservationId: curInstance.getReservationId(),
        consumeNumber: curInstance.getConsumeNumber()
      };
      return this._flattenObject(result);
    }
  }, {
    key: "convertReservation",
    value: function convertReservation(curInstance) {
      assert(curInstance instanceof reservation);
      var result = {
        id: curInstance.getID(),
        branchId: curInstance.getBranchId(),
        customerId: curInstance.getCustomerId(),
        roomLayout: this.convertToDBRow(curInstance.getRoomLayout()),
        createReservationDate: curInstance.getcreateReservationDate(),
        state: this.convertToDBRow(curInstance.getState())
      };
      return this._flattenObject(result);
    }
  }, {
    key: "convertRoom",
    value: function convertRoom(curInstance) {
      assert(curInstance instanceof room);
      var result = {
        id: curInstance.getID(),
        roomType: this.convertToDBRow(curInstance.getRoomType()),
        activeState: this.convertToDBRow(curInstance.getActiveState()),
        isEmptyBool: curInstance.getEmpty() ? 1 : 0,
        priceReal: curInstance.getPrice()
      };
      return this._flattenObject(result);
    } //-------------------------------------------------------
    //外部可以使用的接口

  }, {
    key: "convert",
    value: function convert(instance) {
      if (instance instanceof branchAccount) {
        return this.convertBranchAccount(instance);
      } else if (instance instanceof headquarterAccount) {
        return this.convertHeadquarterAccount(instance);
      } else if (instance instanceof customerAccount) {
        return this.convertCustomerAccount(instance);
      } else if (instance instanceof checkIn) {
        return this.convertCheckIn(instance);
      } else if (instance instanceof reservation) {
        return this.convertReservation(instance);
      } else if (instance instanceof room) {
        return this.convertRoom(instance);
      } else {
        throw new Error("Unsupported type: ".concat(instance.constructor.name));
      }
    }
  }]);

  return convertTypeToDBRow;
}();

module.exports = convertTypeToDBRow;