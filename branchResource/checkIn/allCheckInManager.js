const assert=require('assert');
const {allBranchManager}=require('../template/allBranchManager');
const branchCheckInManager=require('./branchCheckInManager');

class allCheckInManager extends allBranchManager{
    constructor(){
        super();
    }

     /**
     * 添加分店的预约管理类
     * @param {string} branchIdString 分店的编号
     */
    addNewBranchManager(branchIdString){
        super.addNewBranchManager(new branchCheckInManager(branchIdString));
    }
}
module.exports=allCheckInManager;