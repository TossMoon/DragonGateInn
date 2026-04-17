const transaction=require('../transaction')

const roomLayout=require('../../branchResource/room/room');
const customerManager=require('../../accountManager/customerAccountManager')
const branchManager=require('../../accountManager/branchAccountManager')

/**
 * 顾客的预订房间事务
 */
class CustomerReservateTransaction extends transaction{
    constructor(){
        super()
    }


    execute(...args){
        super.execute(...args);
        // 执行预订房间事务
        const [customerId,branchId,roomLayout]=args;

        // 检查顾客是否存在
        const customer=transaction.getManager(customerManager).getOneAccountByID(customerId);
        if(customer==undefined){
            return this.packageResult(false,null,"顾客不存在");
        }

        // 检查分支是否存在
        const branch=transaction.getManager(branchManager).getOneAccountByID(branchId);
        if(branch==undefined){
            return this.packageResult(false,null,"分支不存在");
        }

        const requireRoomLayout=new roomLayout(roomLayout.area,roomLayout.windowBool,roomLayout.bedType);
        
    }
}