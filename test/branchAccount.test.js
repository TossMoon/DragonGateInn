const branchAccount = require('../account/branchAccount.js');
const accountManager = require('../accountManager/accountManager.js');

describe("branchAccount",()=>{
    it("创建一个分店账户",()=>{
        let account=new branchAccount("test","123456");
        expect(account).toBeInstanceOf(branchAccount);
        expect(account.getUsername()).toBe("test");
        expect(account.getPassword()).toBe("123456");
        expect(account.getActiveBool()).toBe(true);
    });
    

    it("向账户存储库中添加一个新分店账户",()=>{
        let branchAccountManager=new accountManager();
        branchAccountManager.addOneNewAccount(new branchAccount("test","123456"));
        expect(branchAccountManager.getAllAccountList().length).toBe(1);
        expect(branchAccountManager.getOneAccountByUsername("test")).toBeInstanceOf(branchAccount);
        expect(branchAccountManager.getOneAccountByUsername("test").getUsername()).toBe("test");
        expect(branchAccountManager.getOneAccountByUsername("test").getPassword()).toBe("123456");
        expect(branchAccountManager.getOneAccountByUsername("test").getActiveBool()).toBe(true);


        //禁用账户
        branchAccountManager.setDisableAccount("test");
        expect(branchAccountManager.getOneAccountByUsername("test").getActiveBool()).toBe(false);
    })

    
});