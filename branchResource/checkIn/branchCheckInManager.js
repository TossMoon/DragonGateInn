const {branchManager,allBranchManager}=require('../template/allBranchManager');
const {checkIn}=require('./checkIn');
const assert=require('assert');

/**
 * 分店入住管理类
 */
class branchCheckInManager extends branchManager{
    constructor(branchIdString){
        super(branchIdString);
    }

    /**
     * 添加入住订单
     * @param {checkIn} newCheckIn 新入住订单的引用类型对象
     */
    addNewCheckIn(newCheckIn){
        assert(newCheckIn instanceof checkIn);

        this.addObject(newCheckIn);
    }

    /**
     * 结束入住订单
     * @param {string} checkInId 入住订单的编号
     */
    setCheckOut(checkInId){
        assert(typeof checkInId==='string');

        const checkIn=this.getOneObjectById(checkInId);
        if(checkIn){
            checkIn.setCheckOutDateAsNow();
        }
    }

    /**
     * 获取所有入住记录
     * @returns {checkIn[]} 所有入住记录的引用类型对象数组
     */
    getAllCheckIns(){
        return this.getAllObjectList();
    }
}
module.exports=branchCheckInManager;

