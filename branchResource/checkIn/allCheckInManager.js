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

    /**
     * 获取所有入住记录
     * @returns {checkIn[]} 所有入住记录的引用类型对象数组
     */
    getAllCheckIns(){
        return super.getAllObjectList();
    }

    /**
     * 根据分店编号获取入住记录列表
     * @param {string} branchId 分店的编号
     * @returns {checkIn[]} 入住记录的引用类型对象数组
     */
    getCheckInsByBranchId(branchId){
        return super.getOneManagerByBranchId(branchId).getAllCheckIns();
    }

    /**
     * 根据顾客编号获取入住记录列表
     * @param {string} customerId 顾客的编号
     * @returns {checkIn[]} 入住记录的引用类型对象数组
     */
    getCheckInsByCustomerId(customerId){
        return super.getAllObjectList().filter(checkIn => checkIn.getCustomerId() === customerId);
    }
}
module.exports=allCheckInManager;