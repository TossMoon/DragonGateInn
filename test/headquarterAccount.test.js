const headquarterAccount = require('../account/headquarterAccount.js');
const headquarterAccountManager = require('../accountManager/headquarterAccountManager.js');
const SingletonFactory = require('../util/SingletonFactory.js');

describe("branchAccount",()=>{
   

    it("创建总部账户管理器",()=>{
      const curheadquarterAccountManager=SingletonFactory.getInstance(headquarterAccountManager);
    });

    it("向总部账户管理器中添加总部账户",()=>{
       SingletonFactory.getInstance(headquarterAccountManager).addOneNewAccount(new headquarterAccount("test","123456"));
       const curheadquarterAccount=SingletonFactory.getInstance(headquarterAccountManager).getOneAccountByUsername("test");
       expect(curheadquarterAccount).toBeInstanceOf(headquarterAccount);
       expect(curheadquarterAccount.getUsername()).toBe("test");
       expect(curheadquarterAccount.getPassword()).toBe("123456");
       expect(curheadquarterAccount.getActiveBool()).toBe(true);
    });

    it("禁用特定的总部账户",()=>{
       SingletonFactory.getInstance(headquarterAccountManager).setDisableAccount("test");
       expect(SingletonFactory.getInstance(headquarterAccountManager).getOneAccountByUsername("test").getActiveBool()).toBe(false); 
    });
    
});