"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var account = require('../account/account.js');

var assert = require('assert');

var accountManager =
/*#__PURE__*/
function () {
  function accountManager() {
    _classCallCheck(this, accountManager);

    this.accountList = [];
  } //添加一个新账户


  _createClass(accountManager, [{
    key: "addOneNewAccount",
    value: function addOneNewAccount(newAccount) {
      //输入的变量类型应该是account的子类
      assert(newAccount instanceof account); //由于是用数组存储的，不能保证里面元素是唯一的
      //每次添加新账户的时候需要检查用户名是否已存在

      if (this.getOneAccountByUsername(newAccount.getUsername()) != null) {
        throw new Error("用户名已存在");
      }

      this.accountList.push(newAccount);
    } //返回所有没有被禁用的账户

  }, {
    key: "getActiveAccountList",
    value: function getActiveAccountList() {
      return this.accountList.filter(function (account) {
        return account.getActiveBool();
      });
    } //返回所有账户

  }, {
    key: "getAllAccountList",
    value: function getAllAccountList() {
      return this.accountList;
    } //根据用户名（也就是账户ID）返回账户的引用类型对象

  }, {
    key: "getOneAccountByUsername",
    value: function getOneAccountByUsername(username) {
      return this.accountList.find(function (account) {
        return account.getUsername() === username;
      });
    } //禁用账户

  }, {
    key: "setDisableAccount",
    value: function setDisableAccount(username) {
      this.accountList.forEach(function (account) {
        if (account.getUsername() === username) {
          account.setDisable();
        }
      });
    }
  }]);

  return accountManager;
}();

module.exports = accountManager;