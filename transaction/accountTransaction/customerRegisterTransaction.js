const assert=require('assert');

const transaction=require('../transaction');
const customerAccount=require('../../account/customerAccount');
const customerAccountManager=require('../../accountManager/customerAccountManager');

/**
 * 客户注册事务
 * @extends transaction
 */
class customerRegisterTransaction extends transaction{
    constructor(){
        super();
    }

    execute(...args){
        assert(args.length===2);
        assert(args[0]!==null && typeof args[0]==='string');
        assert(args[1]!==null && typeof args[1]==='string');

        const [customerId,password]=args;
        this.getManager(customerAccountManager)
            .addOneNewAccount(new customerAccount(customerId,password));
      
    }
}

module.exports=customerRegisterTransaction;
