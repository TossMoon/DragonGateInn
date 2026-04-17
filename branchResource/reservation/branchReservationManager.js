const assert=require('assert');

const { branchManager } = require('../template/allBranchManager');
const { reservation, reservationState } = require('./reservation');
/**
 * 分店预约管理类
 */
class branchReservationManager extends branchManager{
    constructor(branchIdString){
        super(branchIdString);
    }

    /**
     * 添加预约
     * @param {reservation} newReservation 新预约的引用类型对象
     */
    addNewReservation(newReservation){
        assert(newReservation instanceof reservation);

        this.addObject(newReservation);
    }

    /**
     * 获取所有待确认的预约订单
     * @returns {reservation[]} 所有待确认的预约订单的引用类型对象数组
     */
    getPendingStateReservation(){
        return this.getAllObjectList().filter(reservation=>reservation.getState()===reservationState.state.pending);
    }

    /**
     * 酒店确认顾客提交的订单
     * @param {string} reservationId 预约订单的编号
     */
    setConfirmedState(reservationId){
        assert(typeof reservationId==='string');

        const reservation=this.getOneObjectById(reservationId);
        if(reservation){
            reservation.confirm();
        }
    }

    /**
     * 酒店取消顾客提交的订单
     * @param {string} reservationId 预约订单的编号
     */
    setCanceledState(reservationId){
        assert(typeof reservationId==='string');

        const reservation=this.getOneObjectById(reservationId);
        if(reservation){
            reservation.cancel();
        }
    }
}

module.exports=branchReservationManager;