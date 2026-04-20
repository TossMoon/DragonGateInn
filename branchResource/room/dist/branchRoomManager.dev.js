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

var assert = require('assert');

var _require = require('../template/allBranchManager'),
    branchManager = _require.branchManager;

var _require2 = require('./room'),
    room = _require2.room; //管理单个分店的房间


var branchRoomManager =
/*#__PURE__*/
function (_branchManager) {
  _inherits(branchRoomManager, _branchManager);

  function branchRoomManager(branchIdString) {
    _classCallCheck(this, branchRoomManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(branchRoomManager).call(this, branchIdString));
  }
  /**
   * 添加房间
   * @param {room} newRoom 新房间的引用类型对象
   */


  _createClass(branchRoomManager, [{
    key: "addRoom",
    value: function addRoom(newRoom) {
      assert(newRoom instanceof room); //检查房间编号是否已存在

      if (this.getOneRoomById(newRoom.getID()) != null) {
        throw new Error("房间编号已存在");
      }

      this.addObject(newRoom);
    }
    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */

  }, {
    key: "getOneRoomById",
    value: function getOneRoomById(roomId) {
      return _get(_getPrototypeOf(branchRoomManager.prototype), "getOneObjectById", this).call(this, roomId);
    }
    /**
     * 设置房间为不可出租
     * @param {string} roomId 房间的编号
     */

  }, {
    key: "setOneRoomDisable",
    value: function setOneRoomDisable(roomId) {
      assert(typeof roomId === 'string');
      var targetRoom = this.getOneRoomById(roomId);
      if (targetRoom) targetRoom.setDisable();
    }
    /**
     * 设置房间为可出租
     * @param {string} roomId 房间的编号
     */

  }, {
    key: "setOneRoomEnable",
    value: function setOneRoomEnable(roomId) {
      assert(typeof roomId === 'string');
      var targetRoom = this.getOneRoomById(roomId);
      if (targetRoom) targetRoom.setEnable();
    }
    /**
     * 设置房间为空闲
     * @param {string} roomId 房间的编号
     */

  }, {
    key: "setOneRoomEmpty",
    value: function setOneRoomEmpty(roomId) {
      assert(typeof roomId === 'string');
      var targetRoom = this.getOneRoomById(roomId);
      if (targetRoom) targetRoom.setEmpty();
    }
    /**
     * 设置房间被占用
     * @param {string} roomId 房间的编号
     */

  }, {
    key: "setOneRoomOccupied",
    value: function setOneRoomOccupied(roomId) {
      assert(typeof roomId === 'string');
      var targetRoom = this.getOneRoomById(roomId);
      if (targetRoom) targetRoom.setOccupied();
    }
    /**
     * 获取房间是否为空闲
     * @param {string} roomId 房间的编号
     * @returns {boolean} 房间是否为空闲
     */

  }, {
    key: "getOneRoomEmpty",
    value: function getOneRoomEmpty(roomId) {
      assert(typeof roomId === 'string');
      var targetRoom = this.getOneRoomById(roomId);
      if (targetRoom) return targetRoom.getEmpty();
      return false;
    }
    /**
     * 获取所有空闲房间
     * @returns {room[]} 所有空闲房间的引用类型对象数组
     */

  }, {
    key: "getAllEmptyRoom",
    value: function getAllEmptyRoom() {
      return this.objectList.filter(function (room) {
        return room.getEmpty();
      });
    }
  }]);

  return branchRoomManager;
}(branchManager);

module.exports = branchRoomManager;