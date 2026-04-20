const branchAddRoomTransaction=require('../../../transaction/roomTransaction/branchAddRoomTransaction');
const branchDisableRoomTransaction=require('../../../transaction/roomTransaction/branchDisableRoomTransaction');
const branchOccupiedRoomTransaction=require('../../../transaction/roomTransaction/branchOccupiedRoomTransaction');
const branchEmptyRoomTransaction=require('../../../transaction/roomTransaction/branchEmptyRoomTranscation');

const { room } = require('../../../branchResource/room/room');
const SingletonFactory = require('../../../util/SingletonFactory');
const allRoomManager=require('../../../branchResource/room/allRoomManager');



describe('分店可以进行的房间事务',()=>{
    it('添加房间',()=>{
        const transaction=new branchAddRoomTransaction();
        const newRoom=new room('1002');
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
        transaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById('test02','1002'))
                .toBe(newRoom);
    });

    it('下架房间',()=>{
        const transaction=new branchDisableRoomTransaction();
        const newRoom='1002';
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
        transaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById('test02',newRoom)
                .getActiveState()
                .getActiveBool())
                .toBe(false);
    });

    it('占据空闲房间，释放被占据的房间',()=>{
        const occupiedTransaction=new branchOccupiedRoomTransaction();
        const newRoom='1002';
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchManager('test02');
        occupiedTransaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllObjectList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById('test02',newRoom)
                .getEmpty())
                .toBe(false);

        const emptyTransaction=new branchEmptyRoomTransaction();
        emptyTransaction.execute('test02',newRoom);
        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById('test02',newRoom)
                .getEmpty())
                .toBe(true);
    });

   
});
