import account from '../account/account.js';

class accountManager{
    accountManager(){
        this.accountList=[];
    }

    //添加一个新账户
    addOneNewAccount(newAccount){
        assert(newAccount instanceof account);
        this.accountList.push(newAccount);
    }

    //返回所有没有被禁用的账户
    getActiveAccountList(){
        return this.accountList
            .filter(account=>account.getActiveBool());   
    }

    //返回所有账户
    getAllAccountList(){
        return this.accountList;
    }

    
}