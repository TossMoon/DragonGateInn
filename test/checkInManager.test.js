const assert=require('assert');
const allCheckInManager=require('../branchResource/checkIn/allCheckInManager');
const {checkIn,checkInFactory,person}=require('../branchResource/checkIn/checkIn');

describe('allCheckInManager',()=>{
    it('should add new branch checkIn manager',()=>{
        /**
         * 测试添加分店入住管理类
         */
        const curAllCheckInManager=new allCheckInManager();
        curAllCheckInManager.addNewBranchManager('branch1');
        expect(curAllCheckInManager.getOneManagerByBranchId('branch1').branchIdString).toBe('branch1');

        //创建预约
        const newCheckIn=checkInFactory('branch1','roomId1',[new person('name1','id1')]);
        curAllCheckInManager.getOneManagerByBranchId('branch1').addNewCheckIn(newCheckIn);
        expect(curAllCheckInManager.getOneManagerByBranchId('branch1').
            getOneObjectById(newCheckIn.getID())).toBe(newCheckIn);

        //测试结束退房，检查订单的退房日期是否被设置
        curAllCheckInManager.getOneManagerByBranchId('branch1').setCheckOut(newCheckIn.getID());
        expect(newCheckIn.getCheckOutDate()).toBeInstanceOf(Date);
    });
});
