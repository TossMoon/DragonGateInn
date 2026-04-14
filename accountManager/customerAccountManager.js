const assert = require('assert');


const accountManager=  require('./accountManager.js');
const customerAccount= require('../account/customerAccount.js');

//顾客账户的管理器
class customerAccountManager extends accountManager{
    constructor(){
        super();
    }

    addOneNewAccount(newAccount){
        assert(newAccount instanceof customerAccount);

        super.addOneNewAccount(newAccount);
    }

    /**
     * 根据顾客的手机号获取顾客账户
     * @param {string} phoneString 顾客的手机号
     * @returns {customerAccount} 顾客账户
     */
    getCustomAccountByPhoneString(phoneString){
        return this.accountList.find(account=>account.getPhoneString()===phoneString);
    }
}

module.exports=customerAccountManager;
