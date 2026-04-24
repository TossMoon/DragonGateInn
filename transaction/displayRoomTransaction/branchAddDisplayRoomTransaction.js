const assert=require('assert'); 

const branchDisplayRoomTransaction=require('./branchDisplayRoomTransaction');
const { displayRoom } = require('../../branchResource/displayRoom/displayRoom');

/**
 * 分店添加展示房间事务
 */
class branchAddDisplayRoomTransaction extends branchDisplayRoomTransaction{
    constructor(){
        super();
    }
    
    /**
     * 第一个参数：分店id
     * 第二个参数及以后：展示房间信息
     */
    execute(...args){
        super.execute(...args); 

        //检查分店参数是否符合要求
        assert(this.checkBranchArg(args));

        if(!this.checkBranchExist(args[0])){
            return this.packageResult(false,null,"分店不存在");
        }
        
        //检查添加的变量是否是展示房间实例
        assert(args.every((item,index) => {
            if(index>0){return item instanceof displayRoom}
            return true;
        }));

        args.forEach((item,index)=>{
            if(index>0){
                this.getNeedChangeBranchDisplayRoomManager(args[0])
                    .addDisplayRoom(item);
            }
        });

        args.forEach((item,index)=>{
            if(index>0){
                this.changeDatabase('insert',item);
            }
        });

        return this.packageResult(true,null,"展示房间添加成功");
    }
}

module.exports=branchAddDisplayRoomTransaction;