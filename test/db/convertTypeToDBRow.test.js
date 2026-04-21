const convertTypeToDBRow = require('../../db/InvertTypBetweenDBRow/convertTypeToDBRow');


const branchAccount = require('../../account/branchAccount');
const customerAccount = require('../../account/customerAccount');
const headquarterAccount = require('../../account/headquarterAccount');

const {checkIn,person,checkInFactory}=require('../../branchResource/checkIn/checkIn');
const {reservationState,reservation,reservationFactory}=require('../../branchResource/reservation/reservation');
const {room,RoomLayout,BedInRoom}=require('../../branchResource/room/room');
const activeState = require('../../util/activeState');

const convertManager = new convertTypeToDBRow();

describe('convertTypeToDBRow',()=>{
    it('should register activeState converter',()=>{

        const newActiveState = new activeState(true);
        const dbRow = convertManager.convert(newActiveState);
        expect(dbRow).toEqual(1);
    })


    it('should convert branch account to db row',()=>{
       const newBranchAccount = new branchAccount('101','123456');
       const dbRow = convertManager.convert(newBranchAccount);
       
       expect(dbRow).toEqual({
           id: '101',
           password: '123456',
           activeState: 1,
       });
    });
    it('should convert headquarter account to db row',()=>{
       const newHeadquarterAccount = new headquarterAccount('101','123456');
       const dbRow = convertManager.convert(newHeadquarterAccount);
       
       expect(dbRow).toEqual({
           id: '101',
           password: '123456',
           activeState: 1,
       });
    });
    it('should convert customer account to db row',()=>{
       const newCustomerAccount = new customerAccount('101','123456','13800000000');
       const dbRow = convertManager.convert(newCustomerAccount);
       
       expect(dbRow).toEqual({
           id: '101',
           password: '123456',
           phone: '13800000000',
           activeState: 1,
       });
    });

    it('should convert checkIn to db row',()=>{
       const newCheckIn = checkInFactory('branch1','roomId1',[new person('name1','id1')]);
       const dbRow = convertManager.convert(newCheckIn);
       
       expect(dbRow).toEqual({
           id: newCheckIn.getID(),
           branchId: 'branch1',
           roomId: 'roomId1',
           person: "[{\"name\":\"name1\",\"identityCard\":\"id1\"}]",
           checkInDate: newCheckIn.getCheckInDate().toISOString(),
           checkOutDate: newCheckIn.getCheckOutDate(),
           consumeNumber:0,
           reservationId:null,
       });
    });

    it('should convert reservation to db row',()=>{
       const newReservation = reservationFactory('customer1','branch1',
            new RoomLayout(24,true,new BedInRoom('单人床',1)));
       const dbRow = convertManager.convert(newReservation);
       
       expect(dbRow).toEqual({
            id: newReservation.getID(),
            createReservationDate: newReservation.getcreateReservationDate().toISOString(),
            branchId: 'branch1',
            customerId:'customer1',
            roomLayout_areaReal: 24,
            roomLayout_bedType_numInt: 1,
            roomLayout_bedType_typeString: "单人床",
            roomLayout_windowBool: 1,
            reservationState: "pending",
       });
    });

    it('should convert room ',()=>{
        const newRoom = new room('101');
        const dbRow = convertManager.convert(newRoom);
        
        expect(dbRow).toEqual({
            id: '101',
            roomType_areaReal: 0,
            roomType_windowBool: 0,
            roomType_bedType_typeString: "单人床",
            roomType_bedType_numInt: 1,
            activeState: 1,
            isEmptyBool: 1,
            priceReal: 0,
        });
    });
});
