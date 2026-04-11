"use strict";

var branchAccount = require('../account/branchAccount.js');

var branchAccountManager = require('../accountManager/branchAccountManager.js');

var SingletonFactory = require('../util/SingletonFactory.js');

describe("branchAccount", function () {
  it("创建一个分店账户", function () {
    var account = new branchAccount("test", "123456");
    expect(account).toBeInstanceOf(branchAccount);
    expect(account.getUsername()).toBe("test");
    expect(account.getPassword()).toBe("123456");
    expect(account.getActiveBool()).toBe(true);
  });
  it("创建分店账户管理器", function () {
    var curbranchAccountManager = SingletonFactory.getInstance(branchAccountManager);
  });
  it("向分店账户管理器中添加分店账户", function () {
    SingletonFactory.getInstance(branchAccountManager).addOneNewAccount(new branchAccount("test", "123456"));
    var curbranchAccount = SingletonFactory.getInstance(branchAccountManager).getOneAccountByUsername("test");
    expect(curbranchAccount).toBeInstanceOf(branchAccount);
    expect(curbranchAccount.getUsername()).toBe("test");
    expect(curbranchAccount.getPassword()).toBe("123456");
    expect(curbranchAccount.getActiveBool()).toBe(true);
  });
  it("禁用特定的分店账户", function () {
    SingletonFactory.getInstance(branchAccountManager).setDisableAccount("test");
    expect(SingletonFactory.getInstance(branchAccountManager).getOneAccountByUsername("test").getActiveBool()).toBe(false);
  });
});