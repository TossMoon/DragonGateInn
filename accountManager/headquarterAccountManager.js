const assert = require('assert');


const accountManager=  require('./accountManager.js');
const headquarterAccount= require('../account/headquarterAccount.js');

//总部账户的管理器
class headquarterAccountManager extends accountManager{
    constructor(){
        super();
    }

    addOneNewAccount(newAccount){
        assert(newAccount instanceof headquarterAccount);
        super.addOneNewAccount(newAccount);
    }
}

module.exports=headquarterAccountManager;
