const customerReservateTransaction=require('../../../transaction/reservationTransaction/customerReservateTransaction');

const customerRegisterTransaction=require('../../../transaction/accountTransaction/registerTransaction/customerRegisterTransaction');
const SingletonFactory=require('../../../util/SingletonFactory');
const customerAccountManager=require('../../../accountManager/customerAccountManager');

const branchRegisterTransaction=require('../../../transaction/accountTransaction/registerTransaction/branchRegisterTransaction');
const branchAccountManager=require('../../../accountManager/branchAccountManager');

const branchReservationManager=require('../../../branchResource/reservation/branchReservationManager');
const allReservationManager=require('../../../branchResource/reservation/allReservationManager');
describe('顾客的预订房间事务',()=>{
    it('顾客的预订房间事务的执行',()=>{
        let newCustomerRegisterTransaction=new customerRegisterTransaction();
        const customerId=newCustomerRegisterTransaction.execute('138000000000','123456').getID();

        let newBranchRegisterTransaction=new branchRegisterTransaction();
        const branchId=newBranchRegisterTransaction.execute().getID();

        let newCustomerReservateTransaction=new customerReservateTransaction();
        const reservation=newCustomerReservateTransaction.execute(customerId,branchId,
        {area:100,windowBool:true,bedType:{typeString:'double',numId:1}}).resultContent;
        
        expect(SingletonFactory.getInstance(allReservationManager).getAllObjectList()).toContain(reservation);
       
    })
})
