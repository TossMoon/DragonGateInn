const loginAccountTransaction=require('../LoginTransaction/loginAccountTransaction');
const customerAccountManager=require('../../../accountManager/customerAccountManager');
const transaction=require('../../../transaction/transaction');

class loginCustomerTransaction extends loginAccountTransaction{
    constructor(){
        super(transaction.getManager(customerAccountManager));
    }
}

module.exports=loginCustomerTransaction;
