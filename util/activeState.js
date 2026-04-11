//标记一个数据是否是启用状态
class activeState{
    constructor(activeBool){
        this.activeBool=activeBool;
    }

    getActiveBool(){
        return this.activeBool;
    }

    setActive(){
        this.activeBool=true;
    }

    setDisable(){
        this.activeBool=false;
    }
}

module.exports=activeState;