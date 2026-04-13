const assert=require('assert');

const room=require('./room');

//管理单个分店的房间
class branchRoomManager{
    constructor(branchIdString){
        //该分店的编号
        /**
         * 该分店的编号
         * @type {string}
         */
        this.branchIdString=branchIdString;

        //房间列表
        /**
         * 房间列表
         * @type {room[]}
         */
        this.roomList=[];
    }

    /**
     * 添加房间
     * @param {room} newRoom 新房间的引用类型对象
     */
    addRoom(newRoom){
        assert(newRoom instanceof room);

        //检查房间编号是否已存在
        if(this.getOneRoomById(newRoom.getId())!=null){
            throw new Error("房间编号已存在");
        }
        
        this.roomList.push(newRoom);
    }

    /**
     * 返回所有房间
     * @returns {room[]} 所有房间的引用类型对象数组
     */
    getAllRoomList(){
        return this.roomList;
    }

    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */
    getOneRoomById(roomId){
        return this.roomList.find(room=>room.getId()===roomId);
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
module.exports=branchRoomManager;