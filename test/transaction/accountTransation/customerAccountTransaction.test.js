const customerRegisterTransaction=require('../../../transaction/accountTransaction/registerTransaction/customerRegisterTransaction');
const SingletonFactory=require('../../../util/SingletonFactory');
const customerAccountManager=require('../../../accountManager/customerAccountManager');

describe('客户注册事务',function(){
    it('注册客户',function(){
        let transaction=new customerRegisterTransaction();
        transaction.execute('138000000000','123456');

        expect(SingletonFactory.getInstance(customerAccountManager).getAllAccountList().length).toBe(1);

        try{
            let havenTransaction=new customerRegisterTransaction();
            havenTransaction.execute('138000000000','123456');
        }catch(error){
            expect(error.message).toBe('注册顾客账户时，使用的手机号已存在');
        }


    })
})
