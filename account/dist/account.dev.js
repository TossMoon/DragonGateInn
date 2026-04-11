"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//用于登录的账户
var account =
/*#__PURE__*/
function () {
  function account(username, password) {
    _classCallCheck(this, account);

    this.usernameString = username;
    this.passwordString = password;
    this.activeBool = true;
  }

  _createClass(account, [{
    key: "getUsername",
    value: function getUsername() {
      return this.usernameString;
    }
  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.passwordString;
    }
  }, {
    key: "getActiveBool",
    value: function getActiveBool() {
      return this.activeBool;
    } //禁用账户，被禁用的账户的行为由管理器具体设定

  }, {
    key: "setDisable",
    value: function setDisable() {
      this.activeBool = false;
    }
  }]);

  return account;
}();

module.exports = account;