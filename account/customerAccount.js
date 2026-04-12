const account = require('./account.js');


//顾客的账户
 class customerAccount extends account{
    constructor(username,password){
        super(username,password);
    }
 
}

module.exports=customerAccount;
