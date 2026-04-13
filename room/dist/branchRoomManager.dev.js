"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert');

var room = require('./room'); //管理单个分店的房间


var branchRoomManager =
/*#__PURE__*/
function () {
  function branchRoomManager(branchIdString) {
    _classCallCheck(this, branchRoomManager);

    //该分店的编号

    /**
     * 该分店的编号
     * @type {string}
     */
    this.branchIdString = branchIdString; //房间列表

    /**
     * 房间列表
     * @type {room[]}
     */

    this.roomList = [];
  }
  /**
   * 添加房间
   * @param {room} newRoom 新房间的引用类型对象
   */


  _createClass(branchRoomManager, [{
    key: "addRoom",
    value: function addRoom(newRoom) {
      assert(newRoom instanceof room); //检查房间编号是否已存在

      if (this.getOneRoomById(newRoom.getId()) != null) {
        throw new Error("房间编号已存在");
      }

      this.roomList.push(newRoom);
    }
    /**
     * 返回所有房间
     * @returns {room[]} 所有房间的引用类型对象数组
     */

  }, {
    key: "getAllRoomList",
    value: function getAllRoomList() {
      return this.roomList;
    }
    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */

  }, {
    key: "getOneRoomById",
    value: function getOneRoomById(roomId) {
      return this.roomList.find(function (room) {
        return room.getId() === roomId;
      });
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
      return this.roomList.filter(function (room) {
        return room.getEmpty();
      });
    }
  }]);

  return branchRoomManager;
}();

module.exports = branchRoomManager;