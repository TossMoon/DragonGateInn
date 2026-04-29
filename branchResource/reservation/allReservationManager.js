const assert=require('assert');

const {allBranchManager}=require('../template/allBranchManager');


const SingletonFactory=require('../../util/SingletonFactory');
const customerAccountManager=require('../../accountManager/customerAccountManager');

const branchReservationManager=require('./branchReservationManager');

const branchAccountManager=require('../../accountManager/branchAccountManager');
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
     * 根据顾客手机号获取预约列表
     * @param {string} customerNumber 顾客的手机号
     * @returns {reservation[]} 预约的引用类型对象数组
     */
    getReservationByCustomerPhone(customerNumber)
    {
        const customerAccount= SingletonFactory.getInstance(customerAccountManager).getCustomAccountByPhoneString(customerNumber);
        const reservations= this.getReservationsByCustomerId(customerAccount.getID());
        return reservations.map(r => {
                const branchAccount = SingletonFactory.getInstance(branchAccountManager)
                                                      .getOneAccountByID(r.branchIdString);
                return {
                    ...r,
                    branchName: branchAccount ? branchAccount.getBranchName() : '未知分店'
                };
        });
    }

    /**
     * 获取带顾客手机号的预约列表
     * @param {reservation[]} reservations 预约的引用类型对象数组
     * @returns {reservation[]} 带顾客手机号的预约列表的引用类型对象数组
     */
    _getHaveCusotmerPhoneReservations(reservations)
    {
        return reservations.map(r => {
                const customerAccount = SingletonFactory.getInstance(customerAccountManager)
                                                      .getOneAccountByID(r.customerIdString);
                return {
                    ...r,
                    customerPhone: customerAccount ? customerAccount.getPhoneString() : '未知顾客'
                };
        });
    }

    /**
     * 根据分店编号获取预约列表
     * @param {string} branchId 分店的编号
     * @returns {reservation[]} 预约的引用类型对象数组
     */
    getReservationsByBranchId(branchId){
        const reservations= super.getOneManagerByBranchId(branchId).getAllReservations();
        return this._getHaveCusotmerPhoneReservations(reservations);
    }

    /**
     * 根据分店编号获取待确认预约列表
     * @param {string} branchId 分店的编号
     * @returns {reservation[]} 待确认预约列表的引用类型对象数组
     */
    getPendingReservationsByBranchId(branchId){
        const reservations= super.getOneManagerByBranchId(branchId).getAllReservations();

        return this._getHaveCusotmerPhoneReservations(reservations.filter(r => r.state.state === 'pending'));
    }
}
module.exports=allReservationManager;
