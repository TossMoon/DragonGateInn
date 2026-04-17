"use strict";

var customerAccount = require('../account/customerAccount.js');

var customerAccountManager = require('../accountManager/customerAccountManager.js');

var SingletonFactory = require('../util/SingletonFactory.js');

describe("customerAccount", function () {
  it("创建客户账户管理器", function () {
    var curcustomerAccountManager = SingletonFactory.getInstance(customerAccountManager);
  });
  it("向客户账户管理器中添加客户账户", function () {
    SingletonFactory.getInstance(customerAccountManager).addOneNewAccount(new customerAccount("test", "123456"));
    var curcustomerAccount = SingletonFactory.getInstance(customerAccountManager).getOneAccountByID("test");
    expect(curcustomerAccount).toBeInstanceOf(customerAccount);
    expect(curcustomerAccount.getID()).toBe("test");
    expect(curcustomerAccount.getPassword()).toBe("123456");
    expect(curcustomerAccount.getActiveBool()).toBe(true);
  });
  it("禁用特定的客户账户", function () {
    SingletonFactory.getInstance(customerAccountManager).setDisableAccount("test");
    expect(SingletonFactory.getInstance(customerAccountManager).getOneAccountByID("test").getActiveBool()).toBe(false);
  });
});