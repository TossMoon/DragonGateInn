const loginAccountTransaction=require('../LoginTransaction/loginAccountTransaction');
const headquarterAccountManager=require('../../../accountManager/headquarterAccountManager');
const transaction=require('../../../transaction/transaction');

class loginHeadquarterTransaction extends loginAccountTransaction{
    constructor(){
        super(transaction.getManager(headquarterAccountManager));
    }
}

module.exports=loginHeadquarterTransaction;
