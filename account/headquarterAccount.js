const account = require('./account.js');


//总部的账户
 class headquarterAccount extends account{
    constructor(username,password){
        super(username,password);
    }
 
}

module.exports=headquarterAccount;
