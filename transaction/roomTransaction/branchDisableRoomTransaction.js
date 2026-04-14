const assert=require('assert'); 

const branchRoomTransaction=require('./branchRoomTranaction');
const allRoomManager=require('../../room/allRoomManager');



/**
 * 分店下架房间的事务
 */
class branchDisableRoomTransaction extends branchRoomTransaction{
    constructor(){
        super();
    }

    /**
     * 第一个参数：分店id
     * 第二个参数：房间信息
     */
    execute(...args){
        super.execute(...args); 

        //检查分店参数是否符合要求
        assert(this.checkBranchArg(args));
        
        //检查添加的变量是否是房间id(是否是string类型，是否在管理器中存在)
        assert(this.checkRoomIdArg(args));

        args.forEach((item,index)=>{
            if(index>0){
                this.getNeedChangeBranchRoomManager(args[0])
                    .setOneRoomDisable(item);
            }
        });
    }
}

module.exports=branchDisableRoomTransaction;
