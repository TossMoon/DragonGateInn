"use strict";

var assert = require('assert');

var allCheckInManager = require('../branchResource/checkIn/allCheckInManager');

var _require = require('../branchResource/checkIn/checkIn'),
    checkIn = _require.checkIn,
    checkInFactory = _require.checkInFactory,
    person = _require.person;

describe('allCheckInManager', function () {
  it('should add new branch checkIn manager', function () {
    /**
     * 测试添加分店入住管理类
     */
    var curAllCheckInManager = new allCheckInManager();
    curAllCheckInManager.addNewBranchManager('branch1');
    expect(curAllCheckInManager.getOneManagerByBranchId('branch1').branchIdString).toBe('branch1'); //创建预约

    var newCheckIn = checkInFactory('branch1', 'roomId1', [new person('name1', 'id1')]);
    curAllCheckInManager.getOneManagerByBranchId('branch1').addNewCheckIn(newCheckIn);
    expect(curAllCheckInManager.getOneManagerByBranchId('branch1').getOneObjectById(newCheckIn.getID())).toBe(newCheckIn); //测试结束退房，检查订单的退房日期是否被设置

    curAllCheckInManager.getOneManagerByBranchId('branch1').setCheckOut(newCheckIn.getID());
    expect(newCheckIn.getCheckOutDate()).toBeInstanceOf(Date);
  });
});