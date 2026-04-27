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

    /**
     * 获取所有预约
     * @returns {reservation[]} 所有预约的引用类型对象数组
     */
    getAllReservations(){
        return super.getAllObjectList();
    }

    /**
     * 根据顾客编号获取预约列表
     * @param {string} customerId 顾客的编号
     * @returns {reservation[]} 预约的引用类型对象数组
     */
    getReservationsByCustomerId(customerId){
        return super.getAllObjectList().filter(reservation => reservation.getCustomerId() === customerId);
    }

    /**
     * 根据分店编号获取预约列表
     * @param {string} branchId 分店的编号
     * @returns {reservation[]} 预约的引用类型对象数组
     */
    getReservationsByBranchId(branchId){
        return super.getOneManagerByBranchId(branchId).getAllReservations();
    }
}
module.exports=allReservationManager;
