const startAccountManager = require('../../global/startManager/startAccountManager.js');
const SingletonFactory = require('../../util/SingletonFactory.js');
const OracleAccessLayer = require('../../db/OracleAccessLayer.js');

const {room,RoomLayout} = require('../../branchResource/room/room');
const activeState = require('../../util/activeState');


describe('startAccountManager', () => {
    it('should initialize all account managers', async () => {
        // // 模拟数据库连接
        // SingletonFactory.getInstance(OracleAccessLayer,{
        //     user: 'STARDUST',
        //     password: '123456',
        //     connectString: 'localhost:1521/hellooracle'
        // });

        // await startAccountManager.initAllAccountManager();
        
    });

   
});