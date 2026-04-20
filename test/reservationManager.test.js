const allReservationManager=require('../branchResource/reservation/allReservationManager');
const { reservationFactory ,reservationState} = require('../branchResource/reservation/reservation');
const { RoomLayout,BedInRoom } = require('../branchResource/room/room');

describe('allReservationManager',()=>{
    it('should add new branch reservation manager',()=>{
        /**
         * 测试添加分店预约管理类
         */
        const curAllReservationManager=new allReservationManager();
        curAllReservationManager.addNewBranchManager('branch1');
        expect(curAllReservationManager.getOneManagerByBranchId('branch1').branchIdString).toBe('branch1');

        /**
         * 测试添加预约订单
         */
        const newBranchManager=curAllReservationManager.getOneManagerByBranchId('branch1');
        const newReservation=reservationFactory('1001','branch1',new RoomLayout(24,true,new BedInRoom("单人床",1)));
        
        newBranchManager.addNewReservation(newReservation);
        expect(newBranchManager.getOneObjectById(newReservation.getID())).toBe(newReservation);

        /**
         * 测试确认预约订单
         */
        newBranchManager.setConfirmedState(newReservation.getID());
        expect(newReservation.getState()).toBe(reservationState.state.confirmed);
    });
});
