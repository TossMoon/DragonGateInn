const assert=require('assert');

const headquarterManager=require('../../../accountManager/headquarterAccountManager');
const headquarterAccount=require('../../../account/headquarterAccount');
const transaction=require('../../transaction');


class headquarterRegisterTransaction extends transaction{
    constructor(){
        super();

    }

    execute(...args){
        assert(args.length===2);
        assert(args[0]!==null && typeof args[0]==='string');
        assert(args[1]!==null && typeof args[1]==='string');
        
        const [headquarterId,password]=args;
        this.getManager(headquarterManager)
            .addOneNewAccount(
                new headquarterAccount(headquarterId,password));
    }
}
module.exports=headquarterRegisterTransaction;