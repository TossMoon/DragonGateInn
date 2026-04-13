const assert=require('assert');


/**
 * 事务类
 * 管理系统内所有用户可以进行的行为，
 * 包括账户相关（获取账户，登录账户，修改账户信息）
 *     房间管理（添加房间，下架房间）
 *     营业相关（添加顾客预约，入住）
 */
class transaction{
    constructor(){
        /**
         * 事务发生的时间
         * @type {string}
         */
        this.date=new Date();

    }

    /**
     * 执行事务
     */
    execute(...args){
        
    }
}

module.exports=transaction; 