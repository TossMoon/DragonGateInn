
//用于登录的账户
class account{
    constructor(username,password){
        this.usernameString=username;
        this.passwordString=password;
        this.activeBool=true;
    }

    getUsername(){
        return this.usernameString;
    }

    getPassword(){
        return this.passwordString;
    }
    
    getActiveBool(){
        return this.activeBool;
    }

    //禁用账户，被禁用的账户的行为由管理器具体设定
    setDisable(){
        this.activeBool=false;
    }
}

module.exports=account;