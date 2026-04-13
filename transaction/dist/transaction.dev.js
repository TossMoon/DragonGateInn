"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SingletonFactory = require('../util/SingletonFactory');
/**
 * 事务类
 * 管理系统内所有用户可以进行的改变系统状态的行为，
 * 包括账户相关（分派新账户，登录账户，修改账户信息）
 *     房间管理（添加房间，下架房间）
 *     营业相关（添加顾客预约，登记入住）
 */


var transaction =
/*#__PURE__*/
function () {
  function transaction() {
    _classCallCheck(this, transaction);

    /**
     * 事务发生的时间
     * @type {string}
     */
    this.date = new Date();
  }
  /**
   * 执行事务
   */


  _createClass(transaction, [{
    key: "execute",
    value: function execute() {}
    /**
     * 获取管理器实例,默认是从单例工厂中取得管理器实例
     * @param {string} managerType 管理器类型
     * @returns {object} 管理器实例
     */

  }, {
    key: "getManager",
    value: function getManager(managerType) {
      return SingletonFactory.getInstance(managerType);
    }
  }]);

  return transaction;
}();

module.exports = transaction;