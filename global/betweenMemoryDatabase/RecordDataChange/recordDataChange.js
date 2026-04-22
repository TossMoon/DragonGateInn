const assert=require('assert');
const {accountClassTableConfig}=require('../classTableConfig');

const SingletonFactory=require('../../../util/SingletonFactory');

const globalDatabaseAccessLayer = require('../../DatabaseConnection/DatabaeseConnect');

const branchResourceManagers=require('../../branchResource/branchResourceManagers');
/**
 * 数据变更记录类
 */
class recordDataChange{
    constructor(tableName,changeType,changeDataId){
        this.tableName=tableName;
        this.changeType=changeType;
        this.changeDataId=changeDataId;
    }

}

/**
 * 数据变更记录管理器类
 */
class recordDataChangeManager{
    constructor(){
        this.changeList=[];
    }

    addChange(change){
        
        this.changeList.push(change);
    }

    changeTableId(tableName,manager,id)
    {
        const data=SingletonFactory.getInstance(manager).getOneObjectById(id);
        if(data){
            
        }
    }
    /**
     * 执行数据变更
     */
    changeDatabase(){
        this.changeList.forEach(change=>{
            if(change.changeType=='add'){
                globalDatabaseAccessLayer.insertRow(change.tableName,change.changeDataId);
            }else if(change.changeType=='update'){
                globalDatabaseAccessLayer.updateRow(change.tableName,change.changeDataId);
            }else if(change.changeType=='delete'){
                globalDatabaseAccessLayer.deleteRow(change.tableName,change.changeDataId);
            }
        })
    }
}