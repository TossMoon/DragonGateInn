const SingletonFactory=require('../util/SingletonFactory');

/**
 * 事务类
 * 管理系统内所有用户可以进行的改变系统状态的行为，
 * 包括账户相关（分派新账户，登录账户，修改账户信息）
 *     房间管理（添加房间，下架房间）
 *     营业相关（添加顾客预约，登记入住）
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

    /**
     * 获取管理器实例,默认是从单例工厂中取得管理器实例
     * @param {string} managerType 管理器类型
     * @returns {object} 管理器实例
     */
    static getManager(managerType){
        return SingletonFactory.getInstance(managerType);
    }
}

module.exports=transaction; 