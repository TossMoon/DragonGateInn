"use strict";

var headquarterRegisterTransaction = require('../../../transaction/accountTransaction/headquarterRegisterTransaction');

var SingletonFactory = require('../../../util/SingletonFactory');

var headquarterAccountManager = require('../../../accountManager/headquarterAccountManager');

describe('总部（管理员）账号注册事务', function () {
  it('注册总部账号', function () {
    var transaction = new headquarterRegisterTransaction();
    transaction.execute('1000', '123456');
    expect(SingletonFactory.getInstance(headquarterAccountManager).getAllAccountList().length).toBe(1);
  });
});