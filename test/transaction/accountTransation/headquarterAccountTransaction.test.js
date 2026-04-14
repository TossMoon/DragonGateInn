const headquarterRegisterTransaction=require('../../../transaction/accountTransaction/headquarterRegisterTransaction');
const SingletonFactory=require('../../../util/SingletonFactory');
const headquarterAccountManager=require('../../../accountManager/headquarterAccountManager');


describe('总部（管理员）账号注册事务',function(){
    it('注册总部账号',function(){
        let transaction=new headquarterRegisterTransaction();
        transaction.execute('1000','123456');

        expect(SingletonFactory.getInstance(headquarterAccountManager).getAllAccountList().length).toBe(1);
    })
})
