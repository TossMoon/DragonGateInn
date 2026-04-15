const loginAccountTransaction=require('../LoginTransaction/loginAccountTransaction');
const branchAccountManager=require('../../../accountManager/branchAccountManager');
const transaction=require('../../../transaction/transaction');

class loginBranchTransaction extends loginAccountTransaction{
    constructor(){
        super(transaction.getManager(branchAccountManager));
    }
}

module.exports=loginBranchTransaction;
