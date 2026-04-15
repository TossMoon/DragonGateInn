const branchRegisterTransaction=require('../../../../transaction/accountTransaction/registerTransaction/branchRegisterTransaction');
const SingletonFactory=require('../../../../util/SingletonFactory');
const branchAccountManager=require('../../../../accountManager/branchAccountManager');


describe('分点账号注册事务',function(){
    it('注册分点账号',function(){
        let transaction=new branchRegisterTransaction();
        transaction.execute();

        expect(SingletonFactory.getInstance(branchAccountManager).getAllAccountList().length).toBe(1);
    })
})
