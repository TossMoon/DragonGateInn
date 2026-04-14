const account = require('./account.js');

/**
 * 顾客的账户
 */
 class customerAccount extends account{
    constructor(username,password,phoneString=""){
        super(username,password);
        this.phoneString=phoneString;
    }

    /**
     * 设置顾客的手机号
     * @param {string} phoneString 要设置的手机号
     */
    setPhoneString(phoneString){
        this.phoneString=phoneString;
    }

    /**
     * 获取顾客的手机号
     * @returns {string} 顾客的手机号
     */
    getPhoneString(){
        return this.phoneString;
    }
 
}

module.exports=customerAccount;
