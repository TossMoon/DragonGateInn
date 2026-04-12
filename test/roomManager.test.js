const RoomManager=require('../room/RoomManager');
const room=require('../room/room');
const SingletonFactory = require('../util/SingletonFactory.js');

describe("RoomManager",()=>{
    it("创建房间管理器",()=>{
        const roomManager=SingletonFactory.getInstance(RoomManager);
        expect(roomManager).toBeInstanceOf(RoomManager);
    });

    it("添加分店的房间管理类",()=>{
        const roomManager=SingletonFactory.getInstance(RoomManager);


        roomManager.addNewBranchRoomManager("test");
        expect(roomManager.getAllRoomManagerList().length).toBe(1);

        roomManager.getOneRoomManagerByBranchId("test").addRoom(new room("testRoom"));
        expect(roomManager.getAllRoomList().length).toBe(1);

    });

});
