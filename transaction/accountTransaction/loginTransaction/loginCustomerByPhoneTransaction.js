const assert=require('assert');

const transaction=require('../../../transaction/transaction');
const customerAccountManager=require('../../../accountManager/customerAccountManager');

class loginCustomerByPhoneTransaction extends transaction{
    constructor(){
        super();
        this.accountManager=transaction.getManager(customerAccountManager);
    }

    /**
     * 检查密码是否正确
     */
    checkPassword(account,password){
        return account.getPassword()===password;
    }


    /**
     * 执行登录事务
     */
    execute(...args){
       super.execute(...args);

       assert(args.length===2,'登录事务需要两个参数：用户名和密码');
       assert(typeof args[0]==='string','手机号必须是字符串');
       assert(typeof args[1]==='string','密码必须是字符串');
       const [phone,password]=args;
      
       const account=this.accountManager.getCustomAccountByPhoneString(phone);
       if(!account){
            // 绑定手机号的客户不存在
           return false;
       }
       if(!this.checkPassword(account,password)){
            // 密码错误
           return false;
       }
       // 登录成功
       return true;
    }
}
module.exports=loginCustomerByPhoneTransaction;
