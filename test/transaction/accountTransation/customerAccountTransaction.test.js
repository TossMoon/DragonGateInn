const customerRegisterTransaction=require('../../../transaction/accountTransaction/customerRegisterTransaction');
const SingletonFactory=require('../../../util/SingletonFactory');
const customerAccountManager=require('../../../accountManager/customerAccountManager');

describe('客户注册事务',function(){
    it('注册客户',function(){
        let transaction=new customerRegisterTransaction();
        transaction.execute('test02','123456');


        expect(SingletonFactory.getInstance(customerAccountManager).getAllAccountList().length).toBe(1);
    })
})
