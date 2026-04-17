"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var activeState = require('../util/activeState');

var assert = require('assert'); //床铺的情况，某种类型的床有几张


var BedInRoom =
/*#__PURE__*/
function () {
  function BedInRoom() {
    _classCallCheck(this, BedInRoom);
  }

  _createClass(BedInRoom, [{
    key: "BedInRoom",
    value: function BedInRoom(typeString, numInt) {
      //床的类型
      this.typeString = typeString; //有几张床

      this.numInt = numInt;
    }
  }, {
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
  function RoomLayout() {
    _classCallCheck(this, RoomLayout);
  }

  _createClass(RoomLayout, [{
    key: "RoomType",
    value: function RoomType(area, windowBool, bedType) {
      //房间的面积
      this.areaReal = area; //是否有窗户

      this.windowBool = windowBool; //房间床铺的情况

      assert(bedType instanceof BedInRoom);
      this.BedType = bedType;
    }
  }, {
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
  function room(roomType) {
    _classCallCheck(this, room);

    assert(roomType instanceof RoomLayout);
    this.roomType = roomType;
    this.activeState = new activeState(true);
  }

  _createClass(room, [{
    key: "getRoomType",
    value: function getRoomType() {
      return this.roomType;
    } //房间是否可以出售

  }, {
    key: "getActiveState",
    value: function getActiveState() {
      return this.activeState;
    }
  }, {
    key: "setDisable",
    value: function setDisable() {
      this.activeState.setDisable();
    }
  }, {
    key: "setEnable",
    value: function setEnable() {
      this.activeState.setEnable();
    }
  }]);

  return room;
}();