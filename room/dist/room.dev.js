"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var activeState = require('../util/activeState');

var assert = require('assert'); //床铺的情况，某种类型的床有几张


var BedInRoom =
/*#__PURE__*/
function () {
  function BedInRoom(typeString, numInt) {
    _classCallCheck(this, BedInRoom);

    //床的类型
    this.typeString = typeString; //有几张床

    this.numInt = numInt;
    /**
     * 是否空闲（如果这个房间被出租了，那么这个变量为false）
     * @type {boolean}
     */

    this.isEmptyBool = true;
  }

  _createClass(BedInRoom, [{
    key: "getBedType",
    value: function getBedType() {
      return this.typeString;
    }
  }, {
    key: "getBedNum",
    value: function getBedNum() {
      return this.numInt;
    }
  }]);

  return BedInRoom;
}(); //酒店房间的户型


var RoomLayout =
/*#__PURE__*/
function () {
  function RoomLayout(area, windowBool, bedType) {
    _classCallCheck(this, RoomLayout);

    //房间的面积
    this.areaReal = area; //是否有窗户

    this.windowBool = windowBool; //房间床铺的情况

    assert(bedType instanceof BedInRoom);
    this.BedType = bedType;
  }

  _createClass(RoomLayout, [{
    key: "getArea",
    value: function getArea() {
      return this.areaReal;
    }
  }, {
    key: "getWindowBool",
    value: function getWindowBool() {
      return this.windowBool;
    }
  }, {
    key: "getBedType",
    value: function getBedType() {
      return this.BedType;
    }
  }]);

  return RoomLayout;
}();
/**
 * 酒店房间类
 */


var room =
/*#__PURE__*/
function () {
  function room(id) {
    var roomType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new RoomLayout(0, false, new BedInRoom("单人床", 1));

    _classCallCheck(this, room);

    //房间编号
    this.id = id; //房间的户型

    assert(roomType instanceof RoomLayout);
    this.roomType = roomType; //房间是否可以出租

    this.activeState = new activeState(true);
  }
  /**
   * 获取房间的编号
   * @returns {string} 房间的编号
   */


  _createClass(room, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
    /**
     * 获取房间的户型
     * @returns {RoomLayout} 房间的户型
     */

  }, {
    key: "getRoomType",
    value: function getRoomType() {
      return this.roomType;
    }
    /**
     * 获取房间是否可以出租
     * @returns {activeState} 房间的是否可以出租
     */

  }, {
    key: "getActiveState",
    value: function getActiveState() {
      return this.activeState;
    }
    /**
     * 设置房间为不可出租
     */

  }, {
    key: "setDisable",
    value: function setDisable() {
      this.activeState.setDisable();
    }
    /**
     * 设置房间为可出租
     */

  }, {
    key: "setEnable",
    value: function setEnable() {
      this.activeState.setEnable();
    }
    /**
     * 设置房间为空闲
     */

  }, {
    key: "setEmpty",
    value: function setEmpty() {
      this.isEmptyBool = true;
    }
    /**
     * 设置房间被占用
     * @param {boolean} isOccupied 是否被占用
     */

  }, {
    key: "setOccupied",
    value: function setOccupied() {
      this.isEmptyBool = false;
    }
    /**
     * 获取房间是否为空闲
     * @returns {boolean} 房间是否为空闲
     */

  }, {
    key: "getEmpty",
    value: function getEmpty() {
      return this.isEmptyBool;
    }
  }]);

  return room;
}();

module.exports = room;