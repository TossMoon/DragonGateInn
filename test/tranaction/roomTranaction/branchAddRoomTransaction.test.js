const branchAddRoomTransaction=require('../../../transaction/roomTransaction/branchAddRoomTransaction');
const room=require('../../../room/room');
const SingletonFactory = require('../../../util/SingletonFactory');
const allRoomManager=require('../../../room/allRoomManager');



describe('分店添加房间事务',()=>{
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
});
