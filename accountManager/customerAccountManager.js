const assert = require('assert');


const accountManager=  require('./accountManager.js');
const customerAccount= require('../account/customerAccount.js');

//顾客账户的管理器
class customerAccountManager extends accountManager{
    constructor(){
        super();
    }

    addOneNewAccount(newAccount){
        assert(newAccount instanceof customerAccount);
        super.addOneNewAccount(newAccount);
    }
}

module.exports=customerAccountManager;
