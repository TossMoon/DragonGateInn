const deactivateAccountTransaction=require('./deactivateAccountTransaction');
const branchAccountManager=require('../../../accountManager/branchAccountManager');
const transaction=require('../../transaction');

class deactivateBranchTransaction extends deactivateAccountTransaction{
    constructor(){
        super(transaction.getManager(branchAccountManager));
    }
}

module.exports=deactivateBranchTransaction;
