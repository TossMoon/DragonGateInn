const account = require('./account.js');

/**
 * 分店的账户
 * @extends account
 */
//分店的账户
 class branchAccount extends account{
    constructor(username,password){
        super(username,password);
        this.branchName=username;
    }

    setBranchName(branchName){
        this.branchName=branchName;
    }

    getBranchName(){
        return this.branchName;
    }   
 
}

module.exports=branchAccount;
