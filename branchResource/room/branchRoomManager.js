const assert=require('assert');

const { branchManager } = require('../template/allBranchManager');
const { room } = require('./room');

//管理单个分店的房间
class branchRoomManager extends branchManager{
    constructor(branchIdString){
        super(branchIdString);

        
    }

    /**
     * 添加房间
     * @param {room} newRoom 新房间的引用类型对象
     */
    addRoom(newRoom){
        assert(newRoom instanceof room);

        //检查房间编号是否已存在
        if(this.getOneRoomById(newRoom.getID())!=null){
            throw new Error("房间编号已存在");
        }
        
        this.addObject(newRoom);
    }


    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */
    getOneRoomById(roomId){
        return super.getOneObjectById(roomId);
    }

    /**
     * 设置房间为不可出租
     * @param {string} roomId 房间的编号
     */
    setOneRoomDisable(roomId) {
        assert(typeof roomId==='string');
        const targetRoom = this.getOneRoomById(roomId);
        if (targetRoom) targetRoom.setDisable();
    }

    /**
     * 设置房间为可出租
     * @param {string} roomId 房间的编号
     */
    setOneRoomEnable(roomId) {
        assert(typeof roomId==='string');
        const targetRoom = this.getOneRoomById(roomId);
        if (targetRoom) targetRoom.setEnable();
    }

    /**
     * 设置房间为空闲
     * @param {string} roomId 房间的编号
     */
    setOneRoomEmpty(roomId)
    {
        assert(typeof roomId==='string');
        const targetRoom = this.getOneRoomById(roomId);
        if (targetRoom) targetRoom.setEmpty();
    }

    /**
     * 设置房间被占用
     * @param {string} roomId 房间的编号
     */
    setOneRoomOccupied(roomId)
    {
        assert(typeof roomId==='string');
        const targetRoom = this.getOneRoomById(roomId);
        if (targetRoom) targetRoom.setOccupied();
    }

    /**
     * 获取房间是否为空闲
     * @param {string} roomId 房间的编号
     * @returns {boolean} 房间是否为空闲
     */
    getOneRoomEmpty(roomId)
    {
        assert(typeof roomId==='string');
        const targetRoom = this.getOneRoomById(roomId);
        if (targetRoom) return targetRoom.getEmpty();
        return false;
    }

    /**
     * 获取所有空闲房间
     * @returns {room[]} 所有空闲房间的引用类型对象数组
     */
    getAllEmptyRoom()
    {
        return this.objectList.filter(room=>room.getEmpty());
    }
}
module.exports=branchRoomManager;