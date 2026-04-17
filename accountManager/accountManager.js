const account = require('../account/account.js');
const assert = require('assert');


class accountManager{
    constructor(){
        this.accountList=[];
    }

    //添加一个新账户
    addOneNewAccount(newAccount){
        //输入的变量类型应该是account的子类
        assert(newAccount instanceof account);

        //由于是用数组存储的，不能保证里面元素是唯一的
        //每次添加新账户的时候需要检查用户名是否已存在
        if(this.getOneAccountByID(newAccount.getID())!=null){
            throw new Error("用户名已存在");
        }
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

    //根据用户名（也就是账户ID）返回账户的引用类型对象
    getOneAccountByID(id){
        return this.accountList.find(account=>account.getID()===id);
    }


    //禁用账户
    setDisableAccount(id){
        this.accountList.forEach(account=>{
            if(account.getID()===id){
                account.setDisable();
            }
        });
    }

    //启用账户
    setEnableAccount(id){
        this.accountList.forEach(account=>{
            if(account.getID()===id){
                account.setEnable();
            }
        });
    }
}

module.exports=accountManager;