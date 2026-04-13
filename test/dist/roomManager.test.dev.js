"use strict";

var allRoomManager = require('../room/allRoomManager.js');

var room = require('../room/room');

var SingletonFactory = require('../util/SingletonFactory.js');

describe("RoomManager", function () {
  it("创建房间管理器", function () {
    var roomManager = SingletonFactory.getInstance(allRoomManager);
    expect(roomManager).toBeInstanceOf(allRoomManager);
  });
  it("添加分店的房间管理类", function () {
    var roomManager = SingletonFactory.getInstance(allRoomManager);
    roomManager.addNewBranchRoomManager("test");
    expect(roomManager.getAllRoomManagerList().length).toBe(1);
    roomManager.getOneRoomManagerByBranchId("test").addRoom(new room("testRoom"));
    expect(roomManager.getAllRoomList().length).toBe(1);
  });
});