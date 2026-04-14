"use strict";

var branchAddRoomTransaction = require('../../../transaction/roomTransaction/branchAddRoomTransaction');

var room = require('../../../room/room');

var SingletonFactory = require('../../../util/SingletonFactory');

var allRoomManager = require('../../../room/allRoomManager');

describe('分店添加房间事务', function () {
  it('添加房间', function () {
    var transaction = new branchAddRoomTransaction();
    var newRoom = new room('1002');
    SingletonFactory.getInstance(allRoomManager).addNewBranchRoomManager('test02');
    transaction.execute('test02', newRoom);
    expect(SingletonFactory.getInstance(allRoomManager).getAllRoomList().length).toBe(1);
    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomById('1002')).toBe(newRoom);
  });
});