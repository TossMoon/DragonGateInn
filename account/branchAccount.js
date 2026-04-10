import account from './account.js';


//分店的账户
 class branchAccount extends account{
    branchAccount(username,password){
        this.base=new accountComponent(username,password);
    }

    getUsername(){
        return this.base.getUsername();
    }

    getPassword(){
        return this.base.getPassword();
    }
    
    getActiveBool(){
        return this.base.getActiveBool();
    }
}