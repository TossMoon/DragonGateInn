const assert=require('assert');

/**
 * 分店的管理类
 */
class branchManager{
    constructor(branchIdString){
        this.branchIdString=branchIdString;
        this.objectList=[];
    }

    /**
     * 添加对象
     * @param {*} newObject 新对象的引用类型对象
     */
    addObject(newObject){
        this.objectList.push(newObject);
    }
    /**
     * 返回所有对象
     * @returns {*} 所有对象的引用类型对象数组
     */
    getAllObjectList(){
        return this.objectList;
    }

    /**
     * 根据对象编号返回对象的引用类型对象
     * @param {string} objectIdString 对象的编号
     * @returns {*} 对象的引用类型对象
     */
    getOneObjectById(objectIdString){
        return this.objectList.find(object=>object.getID()===objectIdString);
    }

}

/**
 * 所有分店有关的所有资源的管理类（包括房间，预定,入住，营收）
 */

class allBranchManager{
    constructor(){
        this.branchManagerList=[];
    }

    /**
     * 添加分店的管理类
     * @param {string} branchIdString 分店的编号
     */
    addNewBranchManager(newBranchManager){
        assert(newBranchManager instanceof branchManager);
        this.branchManagerList.push(newBranchManager);
    }

    /**
     * 根据分店编号返回分店的管理类的引用类型对象
     * @param {string} branchIdString 分店的编号
     * @returns {branchManager} 分店的管理类的引用类型对象
     */
    getOneManagerByBranchId(branchIdString){
        return this.branchManagerList.find(manager=>manager.branchIdString===branchIdString);
    }

    /**
     * 返回所有分店的管理类的引用类型对象数组
     * @returns {branchManager[]} 所有分店的管理类的引用类型对象数组
     */
    getAllManagers(){
        return this.branchManagerList;
    }
    /**
     * 返回所有对象的引用类型对象数组
     * @returns {*} 所有对象的引用类型对象数组
     */
    getAllObjectList(){
        return this.branchManagerList.flatMap(manager=>manager.getAllObjectList());
    }
    /**
     * 根据对象编号返回对象的引用类型对象
     * @param {string} objectIdString 对象的编号
     * @returns {*} 对象的引用类型对象
     */
    getOneObjectById(objectIdString){
        return this.branchManagerList.flatMap(manager=>manager.getAllObjectList())
            .find(object=>object.getID()===objectIdString);
    }
}

module.exports.allBranchManager=allBranchManager;
module.exports.branchManager=branchManager;
