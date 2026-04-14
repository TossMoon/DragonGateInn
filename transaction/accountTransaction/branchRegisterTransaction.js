const assert=require('assert');

const branchManager=require('../../accountManager/branchAccountManager');
const branchAccount=require('../../account/branchAccount');
const transaction=require('../transaction');
const accountApplication=require('../../accountManager/accountApplication');


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
        assert(args.length===0);

        this.getManager(branchManager).addOneNewAccount(
            new branchAccount(this.getManager(accountApplication).getRandomAccount()
                ,this.getManager(accountApplication).getInitPassword()));

    }
}

module.exports=branchRegisterTransaction;