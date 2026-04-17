"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert');
/**
 * 分店的管理类
 */


var branchManager =
/*#__PURE__*/
function () {
  function branchManager(branchIdString) {
    _classCallCheck(this, branchManager);

    this.branchIdString = branchIdString;
    this.objectList = [];
  }
  /**
   * 添加对象
   * @param {*} newObject 新对象的引用类型对象
   */


  _createClass(branchManager, [{
    key: "addObject",
    value: function addObject(newObject) {
      this.objectList.push(newObject);
    }
    /**
     * 返回所有对象
     * @returns {*} 所有对象的引用类型对象数组
     */

  }, {
    key: "getAllObjectList",
    value: function getAllObjectList() {
      return this.objectList;
    }
    /**
     * 根据对象编号返回对象的引用类型对象
     * @param {string} objectIdString 对象的编号
     * @returns {*} 对象的引用类型对象
     */

  }, {
    key: "getOneObjectById",
    value: function getOneObjectById(objectIdString) {
      return this.objectList.find(function (object) {
        return object.getId() === objectIdString;
      });
    }
  }]);

  return branchManager;
}();
/**
 * 所有分店有关的所有资源的管理类（包括房间，预定,入住，营收）
 */


var allBranchManager =
/*#__PURE__*/
function () {
  function allBranchManager() {
    _classCallCheck(this, allBranchManager);

    this.branchManagerList = [];
  }
  /**
   * 添加分店的管理类
   * @param {string} branchIdString 分店的编号
   */


  _createClass(allBranchManager, [{
    key: "addNewBranchManager",
    value: function addNewBranchManager(newBranchManager) {
      assert(newBranchManager instanceof branchManager);
      this.branchManagerList.push(newBranchManager);
    }
    /**
     * 根据分店编号返回分店的管理类的引用类型对象
     * @param {string} branchIdString 分店的编号
     * @returns {branchManager} 分店的管理类的引用类型对象
     */

  }, {
    key: "getOneManagerByBranchId",
    value: function getOneManagerByBranchId(branchIdString) {
      return this.branchManagerList.find(function (manager) {
        return manager.branchIdString === branchIdString;
      });
    }
    /**
     * 返回所有分店的管理类的引用类型对象数组
     * @returns {branchManager[]} 所有分店的管理类的引用类型对象数组
     */

  }, {
    key: "getAllManagers",
    value: function getAllManagers() {
      return this.branchManagerList;
    }
    /**
     * 返回所有对象的引用类型对象数组
     * @returns {*} 所有对象的引用类型对象数组
     */

  }, {
    key: "getAllObjectList",
    value: function getAllObjectList() {
      return this.branchManagerList.flatMap(function (manager) {
        return manager.getAllObjectList();
      });
    }
  }]);

  return allBranchManager;
}();

module.exports.allBranchManager = allBranchManager;
module.exports.branchManager = branchManager;