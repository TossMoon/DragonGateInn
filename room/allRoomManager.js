const assert=require('assert');


const branchRoomManager=require('./branchRoomManager');


/**
 * 所有分店的房间管理类
 */
class allRoomManager{
    constructor(){
        //所有分店的房间管理类列表
        /**
         * 所有分店的房间管理类列表
         * @type {branchRoomManager[]}
         */
        this.branchRoomManagerList=[];
    }

    /**
     * 添加分店的房间管理类
     * @param {string} branchIdString 分店的编号
     */
    addNewBranchRoomManager(branchIdString){
        assert(typeof branchIdString==='string');
        this.branchRoomManagerList.push(new branchRoomManager(branchIdString));
    }

    /**
     * 根据分店编号返回分店的房间管理类的引用类型对象
     * @param {string} branchIdString 分店的编号
     * @returns {branchRoomManager} 分店的房间管理类的引用类型对象
     */
    getOneRoomManagerByBranchId(branchIdString){
        return this.branchRoomManagerList.find(roomManager=>roomManager.branchIdString===branchIdString);
    }

    /**
     * 返回所有分店的房间管理类的引用类型对象数组
     * @returns {branchRoomManager[]} 所有分店的房间管理类的引用类型对象数组
     */
    getAllRoomManagerList(){
        return this.branchRoomManagerList;
    }

    
    /**
     * 返回所有房间的引用类型对象数组
     * @returns {room[]} 所有房间的引用类型对象数组
     */
    getAllRoomList(){
        return this.branchRoomManagerList.flatMap(roomManager=>roomManager.roomList);
    }

    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */
    getOneRoomById(roomId){
        return this.branchRoomManagerList.flatMap(roomManager=>roomManager.roomList).find(room=>room.getId()===roomId);
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
        return this.roomList.filter(room=>room.getEmpty());
    }
}
module.exports=allRoomManager;