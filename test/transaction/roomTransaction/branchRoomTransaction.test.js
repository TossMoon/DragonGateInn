const branchAddRoomTransaction=require('../../../transaction/roomTransaction/branchAddRoomTransaction');
const branchDisableRoomTransaction=require('../../../transaction/roomTransaction/branchDisableRoomTransaction');
const branchOccupiedRoomTransaction=require('../../../transaction/roomTransaction/branchOccupiedRoomTransaction');
const branchEmptyRoomTransaction=require('../../../transaction/roomTransaction/branchEmptyRoomTranscation');

const { room } = require('../../../room/room');
const SingletonFactory = require('../../../util/SingletonFactory');
const allRoomManager=require('../../../room/allRoomManager');



describe('分店可以进行的房间事务',()=>{
    it('添加房间',()=>{
        const transaction=new branchAddRoomTransaction();
        const newRoom=new room('1002');
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchRoomManager('test02');
        transaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllRoomList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById('1002'))
                .toBe(newRoom);
    });

    it('下架房间',()=>{
        const transaction=new branchDisableRoomTransaction();
        const newRoom='1002';
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchRoomManager('test02');
        transaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllRoomList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById(newRoom)
                .getActiveState()
                .getActiveBool())
                .toBe(false);
    });

    it('占据空闲房间，释放被占据的房间',()=>{
        const occupiedTransaction=new branchOccupiedRoomTransaction();
        const newRoom='1002';
        

        SingletonFactory.getInstance(allRoomManager).addNewBranchRoomManager('test02');
        occupiedTransaction.execute('test02',newRoom);

        expect(SingletonFactory.getInstance(allRoomManager).getAllRoomList().length).toBe(1);

        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById(newRoom)
                .getEmpty())
                .toBe(false);

        const emptyTransaction=new branchEmptyRoomTransaction();
        emptyTransaction.execute('test02',newRoom);
        expect(SingletonFactory.getInstance(allRoomManager)
                .getOneRoomById(newRoom)
                .getEmpty())
                .toBe(true);
    });

   
});
