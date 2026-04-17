const assert=require('assert');
const {allBranchManager}=require('../template/allBranchManager');
const branchReservationManager=require('./branchReservationManager');
/**
 * 所有分店预约管理类
 */
class allReservationManager extends allBranchManager{
    constructor(){
        super();
    }

    /**
     * 添加分店的预约管理类
     * @param {string} branchIdString 分店的编号
     */
    addNewBranchManager(branchIdString){
        super.addNewBranchManager(new branchReservationManager(branchIdString));
    }
}
module.exports=allReservationManager;
