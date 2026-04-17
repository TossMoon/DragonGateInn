"use strict";

var allRoomManager = require('../branchResource/room/allRoomManager.js');

var _require = require('../branchResource/room/room.js'),
    room = _require.room;

var SingletonFactory = require('../util/SingletonFactory.js');

describe("RoomManager", function () {
  it("创建房间管理器", function () {
    var roomManager = SingletonFactory.getInstance(allRoomManager);
    expect(roomManager).toBeInstanceOf(allRoomManager);
  });
  it("添加分店的房间管理类", function () {
    var roomManager = SingletonFactory.getInstance(allRoomManager);
    roomManager.addNewBranchManager("test");
    expect(roomManager.getAllManagers().length).toBe(1);
    roomManager.getOneManagerByBranchId("test").addRoom(new room("testRoom"));
    expect(roomManager.getAllObjectList().length).toBe(1);
  });
});