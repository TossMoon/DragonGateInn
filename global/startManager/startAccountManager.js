const branchAccount = require('../../account/branchAccount');
const customerAccount = require('../../account/customerAccount');
const headquarterAccount = require('../../account/headquarterAccount');

const branchAccountManager = require('../../accountManager/branchAccountManager');
const customerAccountManager = require('../../accountManager/customerAccountManager');
const headquarterAccountManager = require('../../accountManager/headquarterAccountManager');

const SingletonFactory = require('../../util/SingletonFactory');

const OracleAccessLayer = require('../../db/OracleAccessLayer');

// 数据库连接配置
const dbConfig = {
    user: 'system',
    password: '123456',
    connectString: 'localhost:1521/hellooracle'
};

const curAccessLayer = SingletonFactory.getInstance(OracleAccessLayer, dbConfig);

// 建立表名、账户类型和管理器的映射关系
const accountConfig = {
    'BRANCH_ACCOUNT': {
        type: branchAccount,
        manager: branchAccountManager
    },
    'CUSTOMER_ACCOUNT': {
        type: customerAccount,
        manager: customerAccountManager
    },
    'HEADQUARTER_ACCOUNT': {
        type: headquarterAccount,
        manager: headquarterAccountManager
    }
};

/**
 * 从数据库中读取账户数据
 * @param {string} accountTableName - 账户表名
 * @returns {Promise<Array>} 包含所有账户数据的数组
 */
async function readAccountDataFromDB(accountTableName) {
    return await curAccessLayer.getTableAllRows(accountTableName);
}

/**
 * 将账户数据写入账户管理器
 * @param {string} accountTableName - 账户表名
 * @param {Array} accountDatas - 包含所有账户数据的数组
 */
function writeAccountDataFromDBToManager(accountType, accountManager, accountDatas) {
    accountDatas.forEach(accountData => {
        accountManager.addOneNewAccount(new accountType(accountData.ID, accountData.PASSWORD));
    });
}

/**
 * 初始化所有账户管理器（从数据库中读取账户数据并写入账户管理器）
 */
async function initAllAccountManager() {
    try {
        console.log('开始初始化账户管理器...');
        
        for (const [tableName, config] of Object.entries(accountConfig)) {
            try {
                console.log(`处理表${tableName}...`);
                // 读取账户数据
                const accountDatas = await readAccountDataFromDB(tableName);
                // 获取账户管理器
                const manager = SingletonFactory.getInstance(config.manager);
                // 写入账户数据到管理器
                writeAccountDataFromDBToManager(config.type, manager, accountDatas);
                console.log(`表${tableName}数据加载完成`);
            } catch (error) {
                console.warn(`处理表${tableName}时出错:`, error.message);
                console.warn('将使用内存模式运行，数据不会持久化');
                // 继续处理下一个表
            }
        }
        
        console.log('账户管理器初始化完成');
    } catch (error) {
        console.error('初始化账户管理器失败:', error);
        console.warn('系统将在无数据库模式下运行');
    }
}

module.exports = {
    initAllAccountManager
}