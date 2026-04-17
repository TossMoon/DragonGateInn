"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var activeState = require('../util/activeState.js'); //用于登录的账户


var account =
/*#__PURE__*/
function () {
  function account(id, password) {
    _classCallCheck(this, account);

    this.idString = id;
    this.passwordString = password;
    this.activeState = new activeState(true);
  }

  _createClass(account, [{
    key: "getID",
    value: function getID() {
      return this.idString;
    }
  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.passwordString;
    } //-------------账户状态相关方法-------------
    //查看账户被禁用的状态

  }, {
    key: "getActiveBool",
    value: function getActiveBool() {
      return this.activeState.getActiveBool();
    } //禁用账户，被禁用的账户的行为由管理器具体设定

  }, {
    key: "setDisable",
    value: function setDisable() {
      this.activeState.setDisable();
    } //启用账户

  }, {
    key: "setEnable",
    value: function setEnable() {
      this.activeState.setEnable();
    }
  }]);

  return account;
}();

module.exports = account;