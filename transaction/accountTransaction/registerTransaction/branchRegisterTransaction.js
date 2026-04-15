const assert=require('assert');

const branchManager=require('../../../accountManager/branchAccountManager');
const branchAccount=require('../../../account/branchAccount');
const transaction=require('../../transaction');
const accountApplication=require('../../../accountManager/accountApplication');


/**
 * 进行注册分店账号的事务
 * @extends transaction
 */
class branchRegisterTransaction extends transaction{
    constructor(){
        super();
    }

    /**
     * 获取一个分店账号
     * @param {...string} args 
     */
    execute(...args){
        super.execute(...args);
        
        assert(args.length===0);

        const newBranchAccount=
            new branchAccount(transaction.getManager(accountApplication).getRandomAccount()
                ,transaction.getManager(accountApplication).getInitPassword());
        transaction.getManager(branchManager).addOneNewAccount(
            newBranchAccount);

        return newBranchAccount;

    }
}

module.exports=branchRegisterTransaction;