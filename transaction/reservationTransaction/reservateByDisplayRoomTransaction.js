const customerReservateTransaction=require('./customerReservateTransaction');
const allDisplayRoomManager=require('../../branchResource/displayRoom/allDisplayRoomManager');
const transaction=require('../../transaction/transaction');
const customerAccountManager=require('../../accountManager/customerAccountManager');
/**
 * 顾客使用展示房间预约
 */
class reservateByDisplayRoomTransaction extends customerReservateTransaction{
    constructor(){
        super();
    }

    execute(...args){
        const [branchID, customerNumber, displayRoomID] = args;

        const displayRoom=transaction.getManager(allDisplayRoomManager)
                .getOneDisplayRoomById(branchID, displayRoomID);

        if(displayRoom==null){
            return this.packageResult(false,null,"展示房间不存在");
        }

        if(!displayRoom.getActiveState().getActiveBool())
        {
            return this.packageResult(false,null,"展示房间已被下架");
        }

        const customerID=transaction.getManager(customerAccountManager)
                .getCustomAccountByPhoneString(customerNumber).getID();

        if(customerID==null){
            return this.packageResult(false,null,"顾客不存在");
        }

        return super.execute(customerID,branchID,
            {
                area: displayRoom.getRoomLayout().areaReal,
                windowBool: displayRoom.getRoomLayout().windowBool,
                typeString: displayRoom.getRoomLayout().bedType.typeString,
                numId: displayRoom.getRoomLayout().bedType.numInt,
            }
            );
    }
}

module.exports=reservateByDisplayRoomTransaction;
