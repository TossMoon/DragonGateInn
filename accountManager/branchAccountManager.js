const assert = require('assert');


const accountManager=  require('./accountManager.js');
const branchAccount= require('../account/branchAccount.js');

//分店账户的管理器
class branchAccountManager extends accountManager{
    constructor(){
        super();
    }

    addOneNewAccount(newAccount){
        assert(newAccount instanceof branchAccount);
        super.addOneNewAccount(newAccount);
    }
}

module.exports=branchAccountManager;