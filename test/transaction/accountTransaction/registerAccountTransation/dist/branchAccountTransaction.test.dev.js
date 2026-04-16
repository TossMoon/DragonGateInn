"use strict";

var branchRegisterTransaction = require('../../../../transaction/accountTransaction/registerTransaction/branchRegisterTransaction');

var SingletonFactory = require('../../../../util/SingletonFactory');

var branchAccountManager = require('../../../../accountManager/branchAccountManager');

var allRoomManager = require('../../../../room/allRoomManager');

describe('分点账号注册事务', function () {
  it('注册分点账号', function () {
    var transaction = new branchRegisterTransaction();
    var newBranchAccount = transaction.execute();
    expect(SingletonFactory.getInstance(branchAccountManager).getOneAccountByUsername(newBranchAccount.getUsername())).toBeDefined(); // 检查房间管理器是否添加成功

    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomManagerByBranchId(newBranchAccount.getUsername())).toBeDefined();
  });
});