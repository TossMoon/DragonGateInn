const activeState = require('../util/activeState.js');

//用于登录的账户
class account{
    constructor(username,password){
        this.usernameString=username;
        this.passwordString=password;
        this.activeState=new activeState(true);
    }

    getUsername(){
        return this.usernameString;
    }

    getPassword(){
        return this.passwordString;
    }
    

    //-------------账户状态相关方法-------------
    //查看账户被禁用的状态
    getActiveBool(){
        return this.activeState.getActiveBool();
    }

    //禁用账户，被禁用的账户的行为由管理器具体设定
    setDisable(){
        this.activeState.setDisable();
    }

    //启用账户
    setActive(){
        this.activeState.setActive();
    }
}

module.exports=account;