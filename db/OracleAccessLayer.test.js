// db/testOracle.js
const OracleAccessLayer = require('./OracleAccessLayer');

async function testOracleConnection() {
    // 数据库连接配置
    const config = {
        user: 'system',
        password: '123456',
        connectString: 'localhost:1521/hellooracle'
    };

    const db = new OracleAccessLayer(config);

    try {
        // 连接数据库
        await db.connect();
        console.log('连接成功');

        // 测试获取表列
        const columns = await db.getTableColumnInfos('USERS');
        console.log('表列信息:', columns);

        // 测试插入数据
        const insertResult = await db.insertData('USERS', {
            ID: 1,
            NAME: '测试用户',
            AGE: 25,
            CREATED_DATE: new Date()
        });
        console.log('插入结果:', insertResult, '行受影响');

        // 测试更新数据
        const updateResult = await db.updateData('USERS',
            { AGE: 26 },
            { ID: 1 }
        );
        console.log('更新结果:', updateResult, '行受影响');

    } catch (error) {
        console.error('测试失败:', error);
    } finally {
        // 断开连接
        await db.disconnect();
        console.log('连接已断开');
    }
}

// 运行测试
testOracleConnection();