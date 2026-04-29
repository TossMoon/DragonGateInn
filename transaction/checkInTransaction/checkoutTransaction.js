const assert=require('assert');

const transaction=require('../transaction');
const allCheckInManager=require('../../branchResource/checkIn/allCheckInManager');

const allRoomManager=require('../../branchResource/room/allRoomManager');

class checkoutTransaction extends transaction{
    constructor(){
        super();
    }

     /**
     * 获取房间对象
     * @param {string} branchId 分店的编号
     * @param {string} roomId 房间的编号
     * @returns {room} 房间对象
     */
    _getRoomObject(branchId,roomId){
        return transaction.getManager(allRoomManager)
            .getOneManagerByBranchId(branchId).getOneRoomById(roomId);
    }

     /**
     * 执行入住订单确认
     * @param {string} checkInId 入住订单的编号
     * @returns {object} 包含是否成功、入住订单、提示信息的对象
     */
    execute(...args){
        super.execute(...args);
        assert(args.length==1,"参数数量错误");
        const checkInId=args[0];
        
        const curCheckIn= transaction.getManager(allCheckInManager).getOneObjectById(checkInId);
        if(curCheckIn==undefined){
            return this.packageResult(false,null,"入住订单不存在");
        }
       
        if(curCheckIn.getIsCheckedOut()==true){
            return this.packageResult(false,null,"入住订单已退房");
        }
       
        // 设置退房日期为当前时间
        curCheckIn.setCheckOutDateAsNow();

        //设置入住手续包含的房间被占用
        this._getRoomObject(curCheckIn.getBranchId(),curCheckIn.getRoomId())
            .setEmpty();
             
        this.changeDatabase('update',curCheckIn);
        return this.packageResult(true,curCheckIn,"入住订单退房成功");
    }
}
module.exports=checkoutTransaction;
