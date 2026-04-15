const deactivateAccountTransaction=require('./deactivateAccountTransaction');
const customerAccountManager=require('../../../accountManager/customerAccountManager');
const transaction=require('../../transaction');

class deactivateCustomerTransaction extends deactivateAccountTransaction{
    constructor(){
        super(transaction.getManager(customerAccountManager));
    }
}

module.exports=deactivateCustomerTransaction;
