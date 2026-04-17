"use strict";

var headquarterAccount = require('../account/headquarterAccount.js');

var headquarterAccountManager = require('../accountManager/headquarterAccountManager.js');

var SingletonFactory = require('../util/SingletonFactory.js');

describe("branchAccount", function () {
  it("创建总部账户管理器", function () {
    var curheadquarterAccountManager = SingletonFactory.getInstance(headquarterAccountManager);
  });
  it("向总部账户管理器中添加总部账户", function () {
    SingletonFactory.getInstance(headquarterAccountManager).addOneNewAccount(new headquarterAccount("test", "123456"));
    var curheadquarterAccount = SingletonFactory.getInstance(headquarterAccountManager).getOneAccountByID("test");
    expect(curheadquarterAccount).toBeInstanceOf(headquarterAccount);
    expect(curheadquarterAccount.getID()).toBe("test");
    expect(curheadquarterAccount.getPassword()).toBe("123456");
    expect(curheadquarterAccount.getActiveBool()).toBe(true);
  });
  it("禁用特定的总部账户", function () {
    SingletonFactory.getInstance(headquarterAccountManager).setDisableAccount("test");
    expect(SingletonFactory.getInstance(headquarterAccountManager).getOneAccountByID("test").getActiveBool()).toBe(false);
  });
});