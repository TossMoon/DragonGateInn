"use strict";

var customerRegisterTransaction = require('../../../transaction/accountTransaction/registerTransaction/customerRegisterTransaction');

var SingletonFactory = require('../../../util/SingletonFactory');

var customerAccountManager = require('../../../accountManager/customerAccountManager');

describe('客户注册事务', function () {
  it('注册客户', function () {
    var transaction = new customerRegisterTransaction();
    transaction.execute('138000000000', '123456');
    expect(SingletonFactory.getInstance(customerAccountManager).getAllAccountList().length).toBe(1);

    try {
      var havenTransaction = new customerRegisterTransaction();
      havenTransaction.execute('138000000000', '123456');
    } catch (error) {
      expect(error.message).toBe('注册顾客账户时，使用的手机号已存在');
    }
  });
});