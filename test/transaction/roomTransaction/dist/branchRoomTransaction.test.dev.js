"use strict";

var branchAddRoomTransaction = require('../../../transaction/roomTransaction/branchAddRoomTransaction');

var branchDisableRoomTransaction = require('../../../transaction/roomTransaction/branchDisableRoomTransaction');

var branchOccupiedRoomTransaction = require('../../../transaction/roomTransaction/branchOccupiedRoomTransaction');

var branchEmptyRoomTransaction = require('../../../transaction/roomTransaction/branchEmptyRoomTranscation');

var _require = require('../../../branchResource/room/room'),
    room = _require.room;

var SingletonFactory = require('../../../util/SingletonFactory');

var allRoomManager = require('../../../branchResource/room/allRoomManager');

describe('分店可以进行的房间事务', function () {
  it('添加房间', function () {
    var transaction = new branchAddRoomTransaction();
    var newRoom = new room('1002');
    SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
    transaction.execute('test02', newRoom);
    expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);
    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomById('1002')).toBe(newRoom);
  });
  it('下架房间', function () {
    var transaction = new branchDisableRoomTransaction();
    var newRoom = '1002';
    SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
    transaction.execute('test02', newRoom);
    expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);
    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomById(newRoom).getActiveState().getActiveBool()).toBe(false);
  });
  it('占据空闲房间，释放被占据的房间', function () {
    var occupiedTransaction = new branchOccupiedRoomTransaction();
    var newRoom = '1002';
    SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
    occupiedTransaction.execute('test02', newRoom);
    expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);
    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomById(newRoom).getEmpty()).toBe(false);
    var emptyTransaction = new branchEmptyRoomTransaction();
    emptyTransaction.execute('test02', newRoom);
    expect(SingletonFactory.getInstance(allRoomManager).getOneRoomById(newRoom).getEmpty()).toBe(true);
  });
});