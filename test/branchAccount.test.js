const branchAccount = require('../account/branchAccount.js');
const branchAccountManager = require('../accountManager/branchAccountManager.js');
const SingletonFactory = require('../util/SingletonFactory.js');

describe("branchAccount",()=>{
    it("创建一个分店账户",()=>{
        let account=new branchAccount("test","123456");
        expect(account).toBeInstanceOf(branchAccount);
        expect(account.getID()).toBe("test");
        expect(account.getPassword()).toBe("123456");
        expect(account.getActiveBool()).toBe(true);
    });
    

    it("创建分店账户管理器",()=>{
      const curbranchAccountManager=SingletonFactory.getInstance(branchAccountManager);
    });

    it("向分店账户管理器中添加分店账户",()=>{
       SingletonFactory.getInstance(branchAccountManager).addOneNewAccount(new branchAccount("test","123456"));
       const curbranchAccount=SingletonFactory.getInstance(branchAccountManager).getOneAccountByID("test");
       expect(curbranchAccount).toBeInstanceOf(branchAccount);
       expect(curbranchAccount.getID()).toBe("test");
       expect(curbranchAccount.getPassword()).toBe("123456");
       expect(curbranchAccount.getActiveBool()).toBe(true);
    });

    it("禁用特定的分店账户",()=>{
       SingletonFactory.getInstance(branchAccountManager).setDisableAccount("test");
       expect(SingletonFactory.getInstance(branchAccountManager).getOneAccountByID("test").getActiveBool()).toBe(false);
    });
    
});