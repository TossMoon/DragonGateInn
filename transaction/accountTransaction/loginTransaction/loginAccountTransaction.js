const assert=require('assert');

const transaction=require('../../../transaction/transaction');


class loginAccountTransaction extends transaction{
    constructor(curAccountManager){
        super();
        this.accountManager=curAccountManager;
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
       assert(typeof args[0]==='string','用户名必须是字符串');
       assert(typeof args[1]==='string','密码必须是字符串');
       const [username,password]=args;
      
       const account=this.accountManager.getOneAccountByID(username);
       if(!account){
            // 用户名不存在
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
module.exports=loginAccountTransaction;