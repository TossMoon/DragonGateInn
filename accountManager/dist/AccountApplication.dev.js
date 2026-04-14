"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var randomIdGenerator = require('../util/randomIdGenerator');

var accountApplication =
/*#__PURE__*/
function () {
  function accountApplication() {
    _classCallCheck(this, accountApplication);

    this.randomIdGenerator = new randomIdGenerator();
    this.randomDigits = 8;
  }
  /**
   * 生成一个随机的账户
   * @returns {string} 随机的账户
   */


  _createClass(accountApplication, [{
    key: "getRandomAccount",
    value: function getRandomAccount() {
      return this.randomIdGenerator.generateId(this.randomDigits);
    }
    /**
     * 生成一个初始密码
     * @returns {string} 初始密码
     */

  }, {
    key: "getInitPassword",
    value: function getInitPassword() {
      return '123456';
    }
  }]);

  return accountApplication;
}();

module.exports = accountApplication;