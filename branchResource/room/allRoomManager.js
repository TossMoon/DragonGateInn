const branchRoomManager=require('./branchRoomManager');
const {allBranchManager}=require('../template/allBranchManager');

/**
 * 所有分店的房间管理类
 */
class allRoomManager extends allBranchManager{
    constructor(){
        super();
    }

    /**
     * 添加分店的房间管理类
     * @param {string} branchIdString 分店的编号
     */
    addNewBranchManager(branchIdString){
        super.addNewBranchManager(new branchRoomManager(branchIdString));
    }

    /**
     * 根据房间编号返回房间的引用类型对象
     * @param {string} roomId 房间的编号
     * @returns {room} 房间的引用类型对象
     */
    getOneRoomById(roomId){
        return super.getAllObjectList().find(room=>room.getId()===roomId);
    }


    /**
     * 获取所有空闲房间
     * @returns {room[]} 所有空闲房间的引用类型对象数组
     */
    getAllEmptyRoom()
    {
        return super.getAllObjectList().filter(room=>room.getEmpty());
    }
}
module.exports=allRoomManager;