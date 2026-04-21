const convertDBRowToType = require('../../db/InvertTypBetweenDBRow/convertDBRowToType');


const branchAccount = require('../../account/branchAccount');
const customerAccount = require('../../account/customerAccount');
const headquarterAccount = require('../../account/headquarterAccount');

const {checkIn,person,checkInFactory}=require('../../branchResource/checkIn/checkIn');
const {reservationState,reservation,reservationFactory}=require('../../branchResource/reservation/reservation');
const {room,RoomLayout,BedInRoom}=require('../../branchResource/room/room');
const activeState = require('../../util/activeState');

const curConvertDBRowToType =new convertDBRowToType();

describe('convertTypeToDBRow',()=>{
    it('activeState',()=>{
        const dbRow={
            activeState: 1,
        }
        const result = curConvertDBRowToType.convert('activeState',dbRow);
        expect(result).toEqual(new activeState(true));
    })

    it('branchAccount',()=>{
        const dbRow={
            id: '101',
            password: '123456',
            activeState: 1,
        }
        const result = curConvertDBRowToType.convert('branchAccount',dbRow);
        expect(result).toEqual(new branchAccount('101','123456'));
    })

    it('headquarterAccount',()=>{
        const dbRow={
            id: '101',
            password: '123456',
            activeState: 1,
        }
        const result = curConvertDBRowToType.convert('headquarterAccount',dbRow);
        expect(result).toEqual(new headquarterAccount('101','123456'));
    })

    it('customerAccount',()=>{
        const dbRow={
            id: '101',
            password: '123456',
            phone: '13800000000',
            activeState: 1,
        }
        const result = curConvertDBRowToType.convert('customerAccount',dbRow);
        expect(result).toEqual(new customerAccount('101','123456','13800000000'));
    })

    it('should convert room to DB row',()=>{
        const dbRow={
            id: '101',
            roomLayout_areaReal: 0,
            roomLayout_windowBool: 0,
            roomLayout_bedType_typeString: "单人床",
            roomLayout_bedType_numInt: 1,
            activeState: 1,
            isEmptyBool: 1,
            priceReal: 0,
        }
        const roomInstance = curConvertDBRowToType.convert('room',dbRow);
        expect(roomInstance).toEqual(new room('101'));
    });

    it('checkIn',()=>{
        const dbRow={
            id: '93328245',
            branchId: 'branch1',
            roomId: 'roomId1',
            person: "[{\"name\":\"name1\",\"identityCard\":\"id1\"}]",
            checkInDate: '2023-01-01T00:00:00.000Z',
            checkOutDate: null,
            consumeNumber:0,
            reservationId:null,
        }
        const result = curConvertDBRowToType.convert('checkIn',dbRow);
        //expect(result).toEqual(checkInFactory('branch1','roomId1',[new person('name1','id1')]));
    })

    it('reservation',()=>{
        const dbRow={
            id: '93328245',
            createReservationDate:'2023-01-01T00:00:00.000Z' ,
            branchId: 'branch1',
            customerId:'customer1',
            roomLayout_areaReal: 24,
            roomLayout_bedType_numInt: 1,
            roomLayout_bedType_typeString: "单人床",
            roomLayout_windowBool: 1,
            reservationState: "pending",
        }
        const result = curConvertDBRowToType.convert('reservation',dbRow);
        // expect(result).toEqual(reservationFactory('customer1','branch1',
        //     new RoomLayout(24,true,new BedInRoom('单人床',1))));
    })

})