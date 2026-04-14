const randomIdGenerator=require('../util/randomIdGenerator');


class accountApplication{
   constructor(){
    this.randomIdGenerator=new randomIdGenerator();
    this.randomDigits=8;
    
   }

   /**
    * 生成一个随机的账户
    * @returns {string} 随机的账户
    */
   getRandomAccount(){
       return this.randomIdGenerator.generateId(this.randomDigits);
   }

   /**
    * 生成一个初始密码
    * @returns {string} 初始密码
    */
   getInitPassword(){
       return '123456';
   }
}

module.exports=accountApplication;
