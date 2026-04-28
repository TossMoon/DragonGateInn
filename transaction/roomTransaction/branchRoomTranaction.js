const transaction=require('../transaction');
const allRoomManager=require('../../branchResource/room/allRoomManager');


/**
 * 分店可以操作的房间事务
 */
class branchRoomTransaction extends transaction{
    constructor(){
        super();
    }

    /**
     * 检查添加的变量是否是房间id(是否是string类型，是否在管理器中存在)
     * @returns {boolean} 如果参数符合要求则返回true，否则返回false
     */
    checkRoomIdArg(args){

        if(!Array.isArray(args)){
            typeof item==='string' 
                    && transaction.getManager(allRoomManager).getOneRoomById(args,item) !== null;
        }

        return args.every((item,index) => {
            if(index>0){
                return typeof item==='string' 
                    && transaction.getManager(allRoomManager).getOneRoomById(args[0],item) !== null}
            return true;
        });
    }

    /**
     * 检查分店是否存在,是否存储在全局所有房间管理器中
     * @param {string} branchId 分店id
     * @returns {boolean} 如果分店存在则返回true，否则返回false
     */
    checkBranchExist(branchId){
        return transaction.getManager(allRoomManager).getOneManagerByBranchId(branchId) !== null;
    }

    /**
     * 检查参数是否符合要求，包括参数的数量，参数第一个是否是分店的id
     * @param {array} args 参数数组
     * @returns {boolean} 如果参数符合要求则返回true，否则返回false
     */
    checkBranchArg(args){
        if(!Array.isArray(args)){
            return typeof item==='string';
        }

        if(args.length<2){
            return false;
        }
        if(!args.every(
                (item,index) =>{
                    if(index==0){return typeof item==='string'}
                    return true;
                })){
            return false;
        }
        return true;
    }

    /**
     * 获取分店的房间管理器
     * @param {string} branchId 分店id
     * @returns {branchRoomManager} 分店的房间管理器
     */
    getNeedChangeBranchRoomManager(branchId)
    {
        return transaction.getManager(allRoomManager)
            .getOneManagerByBranchId(branchId)
            
    }

    /**
     * 
     */
    execute(...args){
        super.execute(...args); 
    }

}

module.exports=branchRoomTransaction;