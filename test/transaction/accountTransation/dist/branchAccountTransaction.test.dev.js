"use strict";

var branchRegisterTransaction = require('../../../transaction/accountTransaction/registerTransaction/branchRegisterTransaction');

var SingletonFactory = require('../../../util/SingletonFactory');

var branchAccountManager = require('../../../accountManager/branchAccountManager');

describe('分点账号注册事务', function () {
  it('注册分点账号', function () {
    var transaction = new branchRegisterTransaction();
    transaction.execute();
    expect(SingletonFactory.getInstance(branchAccountManager).getAllAccountList().length).toBe(1);
  });
});