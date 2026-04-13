const assert=require('assert'); 

const transaction=require('../transaction');
const SingletonFactory=require('../../util/SingletonFactory');
const allRoomManager=require('../../room/allRoomManager');
const room=require('../../room/room');

/**
 * 分店添加房间事务
 */
class branchAddRoomTransaction extends transaction{
    constructor(){
        super();
    }

    /**
     * 第一个参数：分店id
     * 第二个参数：房间信息
     */
    execute(...args){
        super.execute(...args); 

        //检查参数是否符合要求
        assert(args.length>=2);
        assert(args
            .every(
                (item,index) => (index===0 && typeof item==='string') || (index>0 && item instanceof room)));
        
        if(!SingletonFactory.getInstance(allRoomManager).getOneRoomManagerByBranchId(args[0])){
            throw new Error('分店不存在');
        }
        
        args.forEach((item,index)=>{
            if(index>0){
                SingletonFactory.getInstance(allRoomManager)
                .getOneRoomManagerByBranchId(args[0])
                .addRoom(item);
            }
        });
    }
}

module.exports=branchAddRoomTransaction;