const allRoomManager=require('../branchResource/room/allRoomManager.js');
const { room } = require('../branchResource/room/room.js');
const SingletonFactory = require('../util/SingletonFactory.js');

describe("RoomManager",()=>{
    it("创建房间管理器",()=>{
        const roomManager=SingletonFactory.getInstance(allRoomManager);
        expect(roomManager).toBeInstanceOf(allRoomManager);
    });

    it("添加分店的房间管理类",()=>{
        const roomManager=SingletonFactory.getInstance(allRoomManager);


        roomManager.addNewBranchManager("test");
        expect(roomManager.getAllManagers().length).toBe(1);

        roomManager.getOneManagerByBranchId("test").addRoom(new room("testRoom"));
        expect(roomManager.getAllObjectList().length).toBe(1);

    });

});
