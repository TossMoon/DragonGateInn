const {MessageManager}=require('../../util/MessageManager');

describe('消息管理器',function(){
    class TestObserver {
        constructor() {
            this.message = 'testObserver';
        }
        printLog(num) {
            console.log(this.message,num);
        }
    }
 
    it('通知观察者',function(){
        const messageName='testMessage';
        
        // 创建TestObserver实例
        const testObserver = new TestObserver();
        
    
        const curMeessagerManager=new MessageManager();

        curMeessagerManager.addObserver(messageName,testObserver.printLog.bind(testObserver));
        curMeessagerManager.notifyAll(messageName,100);

        curMeessagerManager.removeObserver(messageName,testObserver.printLog.bind(testObserver));
        
    })
})
