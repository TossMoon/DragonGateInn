"use strict";

var allReservationManager = require('../branchResource/reservation/allReservationManager');

var _require = require('../branchResource/reservation/reservation'),
    reservationFactory = _require.reservationFactory,
    reservationState = _require.reservationState;

var _require2 = require('../branchResource/room/room'),
    RoomLayout = _require2.RoomLayout,
    BedInRoom = _require2.BedInRoom;

describe('allReservationManager', function () {
  it('should add new branch reservation manager', function () {
    /**
     * 测试添加分店预约管理类
     */
    var curAllReservationManager = new allReservationManager();
    curAllReservationManager.addNewBranchManager('branch1');
    expect(curAllReservationManager.getOneManagerByBranchId('branch1').branchIdString).toBe('branch1');
    /**
     * 测试添加预约订单
     */

    var newBranchManager = curAllReservationManager.getOneManagerByBranchId('branch1');
    var newReservation = reservationFactory('1001', 'branch1', new RoomLayout(24, true, new BedInRoom("单人床", 1)));
    console.log(newReservation);
    newBranchManager.addNewReservation(newReservation);
    expect(newBranchManager.getOneObjectById(newReservation.getId())).toBe(newReservation);
    /**
     * 测试确认预约订单
     */

    newBranchManager.setConfirmedState(newReservation.getId());
    expect(newReservation.getState()).toBe(reservationState.state.confirmed);
  });
});