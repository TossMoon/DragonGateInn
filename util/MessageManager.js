const assert=require('assert');

/**
 * 观察者
 */
class Observer{
    constructor(func){
        this.func=func;
    }

    /**
     * 触发观察者
     */
    notify(...args){
        assert(this.func!==null && typeof this.func==='function');
        this.func(...args);
    }
}

/**
 * 观察者列表
 */
class ObserverList{
    constructor(){
        this.observers=[];
    }

    /**
     * 添加观察者
     * @param {Observer} observer 观察者
     */
    push(observer){
        assert(observer!==null && observer instanceof Observer);
        this.observers.push(observer);
    }

    /**
     * 移除观察者
     * @param {Observer} observer 观察者
     */
    remove(observer){
        assert(observer!==null && observer instanceof Observer);
        this.observers.splice(this.observers.indexOf(observer),1);
    }

    /**
     * 清空所有观察者
     */
    clear(){
        this.observers=[];
    }

    /**
     * 触发所有观察者
     */
    notifyAll(...args){
        this.observers.forEach(observer=>observer.notify(...args)); 
    }
}
/**
/**
 * 消息管理器
 */
class MessageManager{
    constructor(){
        this.messageMap=new Map();
    }

    /**
     * 注册消息
     * @param {string} messageName 消息名称
     */
    registerMessage(messageName){
        assert(messageName!==null && typeof messageName==='string');

        if(this.messageMap.has(messageName)===false){
            this.messageMap.set(messageName,new ObserverList());
        }
    }

    /**
     * 添加观察者
     * @param {string} messageName 消息名称
     * @param {function} fun 观察者函数
     */
    addObserver(messageName,fun){
        this.registerObserverByObject(messageName,new Observer(fun));
    }

    /**
     * 注册观察者
     * @param {string} messageName 消息名称
     * @param {Observer} observer 观察者
     */
    registerObserverByObject(messageName,observer){
        assert(messageName!==null && typeof messageName==='string');
        assert(observer!==null && observer instanceof Observer);

        if(this.messageMap.has(messageName)===false){
            this.messageMap.set(messageName,new ObserverList());
        }
        this.messageMap.get(messageName).push(observer);
    }
    
    /**
     * 移除观察者
     * @param {string} messageName 消息名称
     * @param {function} func 观察者函数
     */
    removeObserver(messageName,func){
        this.removeObserverByObject(messageName,new Observer(func));
    }

    /**
     * 移除观察者
     * @param {string} messageName 消息名称
     * @param {Observer} observer 观察者
     */
    removeObserverByObject(messageName,observer){
        assert(messageName!==null && typeof messageName==='string');
        assert(observer!==null && observer instanceof Observer);

        if(this.messageMap.has(messageName)===false){
            return;
        }
        this.messageMap.get(messageName).remove(observer);
    }
    
    /**
     * 移除所有观察者
     * @param {string} messageName 消息名称
     */
    removeAllObserve(messageName){
        assert(messageName!==null && typeof messageName==='string');

        if(this.messageMap.has(messageName)===false){
            return;
        }
        this.messageMap.get(messageName).clear();
    }

    /**
     * 触发所有观察者
     * @param {string} messageName 消息名称
     * @param {...*} args 观察者函数参数
     */
    notifyAll(messageName,...args){
        assert(messageName!==null && typeof messageName==='string');

        if(this.messageMap.has(messageName)===false){
            return;
        }
        this.messageMap.get(messageName).notifyAll(...args);
    }
}

module.exports.MessageManager=MessageManager;
