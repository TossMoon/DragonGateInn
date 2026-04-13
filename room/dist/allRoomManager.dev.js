"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert');

var branchRoomManager = require('./branchRoomManager');
/**
 * 所有分店的房间管理类
 */


var allRoomManager =
/*#__PURE__*/
function () {
  function allRoomManager() {
    _classCallCheck(this, allRoomManager);

    //所有分店的房间管理类列表

    /**
     * 所有分店的房间管理类列表
     * @type {branchRoomManager[]}
     */
    this.branchRoomManagerList = [];
  }
  /**
   * 添加分店的房间管理类
   * @param {string} branchIdString 分店的编号
   */


  _createClass(allRoomManager, [{
    key: "addNewBranchRoomManager",
    value: function addNewBranchRoomManager(branchIdString) {
      assert(typeof branchIdString === 'string');
      this.branchRoomManagerList.push(new branchRoomManager(branchIdString));
    }
    /**
     * 根据分店编号返回分店的房间管理类的引用类型对象
     * @param {string} branchIdString 分店的编号
     * @returns {branchRoomManager} 分店的房间管理类的引用类型对象
     */

  }, {
    key: "getOneRoomManagerByBranchId",
    value: function getOneRoomManagerByBranchId(branchIdString) {
      return this.branchRoomManagerList.find(function (roomManager) {
        return roomManager.branchIdString === branchIdString;
      });
    }
    /**
     * 返回所有分店的房间管理类的引用类型对象数组
     * @returns {branchRoomManager[]} 所有分店的房间管理类的引用类型对象数组
     */

  }, {
    key: "getAllRoomManagerList",
    value: function getAllRoomManagerList() {
      return this.branchRoomManagerList;
    }
    /**
     * 返回所有房间的引用类型对象数组
     * @returns {room[]} 所有房间的引用类型对象数组
     */

  }, {
    key: "getAllRoomList",
    value: function getAllRoomList() {
      return this.branchRoomManagerList.flatMap(function (roomManager) {
        return roomManager.roomList;
      });
    }
    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */

  }, {
    key: "getOneRoomById",
    value: function getOneRoomById(roomId) {
      return this.branchRoomManagerList.flatMap(function (roomManager) {
        return roomManager.roomList;
      }).find(function (room) {
        return room.getId() === roomId;
      });
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

  return allRoomManager;
}();

module.exports = allRoomManager;