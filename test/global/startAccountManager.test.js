const startAccountManager = require('../../global/InitManager/InitAccountManager.js');
const SingletonFactory = require('../../util/SingletonFactory.js');
const OracleAccessLayer = require('../../db/OracleAccessLayer.js');

const {room,RoomLayout} = require('../../branchResource/room/room');
const activeState = require('../../util/activeState');

const branchAccountManager = require('../../accountManager/branchAccountManager');

describe('startAccountManager', () => {
    it('should initialize all account managers', async () => {
        await startAccountManager.initAllAccountManager();
        
        const curBranchAccountManager=SingletonFactory.getInstance(branchAccountManager);
        expect(curBranchAccountManager.getAllAccountList().length).toBe(1);
    });

   
});