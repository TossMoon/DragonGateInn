const util = require('util');


const DatabaseAccessLayer = require('./DatabaseAccessLayer');
const oracledb = require('oracledb'); // 直接导入，不再使用try-catch

// Oracle数据库访问实现类
class OracleAccessLayer extends DatabaseAccessLayer {
    /**
     * 构造函数
     * @param {Object} config - 数据库连接配置
     */
    constructor(config) {
        super(config);
    }

    /**
     * 连接数据库
     * @returns {Promise} 连接结果
     */
    async connect() {
        try {
            console.log('Oracle数据库连接中...');
            this.connection = await oracledb.getConnection({
                user: this.config.user,
                password: this.config.password,
                connectString: this.config.connectString
            });
            console.log('Oracle数据库连接成功');
            return true;
        } catch (error) {
            console.error('Oracle数据库连接失败:', error);
            throw error;
        }
    }

    /**
     * 断开数据库连接
     * @returns {Promise} 断开结果
     */
    async disconnect() {
        try {
            if (this.connection) {

                console.log('Oracle数据库断开连接中...');

                await this.connection.close();
                this.connection = null;

                console.log('Oracle数据库断开连接成功');
            }
            return true;
        } catch (error) {
            console.error('Oracle数据库断开连接失败:', error);
            throw error;
        }
    }

    /**
     * 检查并确保数据库连接
     * @returns {Promise} 连接结果
     */
    async ensureConnection() {
        if (!this.connection) {
            await this.connect();
        }
    }

    /**
     * 从表中读取所有列信息（包括列名和类型）
     * @param {string} tableName - 表名
     * @returns {Promise<Array>} 列信息数组
     */
    async getTableColumnInfos(tableName) {
        try {
            await this.ensureConnection();
            console.log(`获取表${tableName}的所有列信息`);
            const result = await this.connection.execute(
                `SELECT column_name, data_type
                 FROM user_tab_columns
                 WHERE table_name = UPPER(:tableName)`,
                { tableName: tableName }
            );

            return result.rows.map(row => ({
                name: row[0],
                type: row[1]
            }));
        } catch (error) {
            console.error('获取表列信息失败:', error);
            throw error;
        }
    }

    /**
     * 从表中读取所有行数据
     * @param {string} tableName - 表名
     * @returns {Promise<Array>} 行数据数组，每行数据为列名和值一一对应的对象
     */
    async getTableAllRows(tableName) {
        try {
            await this.ensureConnection();
            console.log(`获取表${tableName}的所有行数据`);
            const result = await this.connection.execute(
                `SELECT * FROM ${tableName}`,
                [],
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            return result.rows || [];
        } catch (error) {
            console.error('获取表行数据失败:', error);
            throw error;
        }
    }

    /**
     * 向表中写入数据
     * @param {string} tableName - 表名
     * @param {Object} data - 要写入的数据
     * @returns {Promise<number>} 影响的行数
     */
    async insertData(tableName, data) {
        try {
            await this.ensureConnection();
            console.log(`向表${tableName}插入数据:`, data);

            // 构建INSERT语句
            const columns = [];
            const placeholders = [];
            const values = [];
            let index = 1;

            for (const [key, value] of Object.entries(data)) {
                columns.push(key);
                
                if (value && typeof value === 'string' && value.includes('T')) {
                    // 检测ISO 8601格式日期字符串
                    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
                    if (dateRegex.test(value)) {
                        // 使用TO_DATE函数明确指定日期格式
                        placeholders.push(`TO_DATE(:${index}, 'YYYY-MM-DD HH24:MI:SS')`);
                        const d = new Date(value);
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const seconds = String(d.getSeconds()).padStart(2, '0');
                        values.push(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
                        index++;
                        continue;
                    }
                } else if (value instanceof Date) {
                    // 对于Date对象
                    placeholders.push(`TO_DATE(:${index}, 'YYYY-MM-DD HH24:MI:SS')`);
                    const year = value.getFullYear();
                    const month = String(value.getMonth() + 1).padStart(2, '0');
                    const day = String(value.getDate()).padStart(2, '0');
                    const hours = String(value.getHours()).padStart(2, '0');
                    const minutes = String(value.getMinutes()).padStart(2, '0');
                    const seconds = String(value.getSeconds()).padStart(2, '0');
                    values.push(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
                    index++;
                    continue;
                }
                
                // 普通值
                placeholders.push(`:${index}`);
                values.push(value);
                index++;
            }

            const sql = `INSERT INTO ${tableName} (${columns.join(', ')})
                        VALUES (${placeholders.join(', ')})`;

            console.log('SQL语句:', sql);
            console.log('参数值:', values);

            const result = await this.connection.execute(
                sql,
                values,
                { autoCommit: true }
            );

            return result.rowsAffected || 1;
        } catch (error) {
            console.error('插入数据失败:', error);
            throw error;
        }
    }

    /**
     * 构建UPDATE语句的SET子句
     * @param {Object} data - 要修改的数据
     * @param {Object} condition - 条件
     * @returns {Object} SET和WHERE子句对象
     */
    createUpdateClause(data,condition)
    {
         // 构建UPDATE语句
        const setClause = Object.keys(data)
            .map((key, index) => `${key} = :${index + 1}`)
            .join(', ');

        const whereClause = Object.keys(condition)
            .map((key, index) => `${key} = :${Object.keys(data).length + index + 1}`)
            .join(' AND ');

        return {
            setClause,
            whereClause
        }
    }

    /**
     * 修改表中的数据
     * @param {string} tableName - 表名
     * @param {Object} data - 要修改的数据
     * @param {Object} condition - 条件
     * @returns {Promise<number>} 影响的行数
     */
    async updateData(tableName, data, condition) {
        try {
            await this.ensureConnection();
            console.log(`更新表${tableName}的数据:`, data, '条件:', condition);

            // 构建UPDATE语句，处理日期类型
            const setParts = [];
            const values = [];
            let index = 1;

            for (const [key, value] of Object.entries(data)) {
                if (value && typeof value === 'string' && value.includes('T')) {
                    // 检测ISO 8601格式日期字符串
                    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
                    if (dateRegex.test(value)) {
                        // 使用TO_DATE函数
                        setParts.push(`${key} = TO_DATE(:${index}, 'YYYY-MM-DD HH24:MI:SS')`);
                        const d = new Date(value);
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const seconds = String(d.getSeconds()).padStart(2, '0');
                        values.push(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
                        index++;
                        continue;
                    }
                } else if (value instanceof Date) {
                    // 对于Date对象
                    setParts.push(`${key} = TO_DATE(:${index}, 'YYYY-MM-DD HH24:MI:SS')`);
                    const year = value.getFullYear();
                    const month = String(value.getMonth() + 1).padStart(2, '0');
                    const day = String(value.getDate()).padStart(2, '0');
                    const hours = String(value.getHours()).padStart(2, '0');
                    const minutes = String(value.getMinutes()).padStart(2, '0');
                    const seconds = String(value.getSeconds()).padStart(2, '0');
                    values.push(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
                    index++;
                    continue;
                }
                
                // 普通值
                setParts.push(`${key} = :${index}`);
                values.push(value);
                index++;
            }

            // 添加条件值
            for (const value of Object.values(condition)) {
                values.push(value);
            }

            const whereParts = Object.keys(condition)
                .map((key, i) => `${key} = :${setParts.length + i + 1}`)
                .join(' AND ');

            const sql = `UPDATE ${tableName}
                        SET ${setParts.join(', ')}
                        WHERE ${whereParts}`;

            console.log('SQL语句:', sql);
            console.log('参数值:', values);

            const result = await this.connection.execute(
                sql,
                values,
                { autoCommit: true }
            );

            return result.rowsAffected || 0;
        } catch (error) {
            console.error('更新数据失败:', error);
            throw error;
        }
    }

      /**
     * 删除表中的数据
     * @param {string} tableName - 表名
     * @param {Object} condition - 条件
     * @returns {Promise<number>} 影响的行数
     */
    async deleteData(tableName, condition) {
        try {
            await this.ensureConnection();
            console.log(`删除表${tableName}的数据:`, condition);

            const sql = `DELETE FROM ${tableName}
            WHERE ${this.createUpdateClause({},condition).whereClause}`;

            const result = await this.connection.execute(
                sql,
                Object.values(condition),
                { autoCommit: true }
            );

            return result.rowsAffected || 0;
        } catch (error) {
            console.error('删除数据失败:', error);
            throw error;
        }
    }

    /**
     * 创建表
     * @param {string} tableName - 表名或完整的SQL语句
     * @param {Array} columns - 列信息数组（可选）
     * @returns {Promise} 创建结果
     */
    async createTable(tableName, columns) {
        try {
            await this.ensureConnection();

            let sql;
            if (columns) {
                // 如果提供了列信息，构建SQL语句
                console.log(`创建表${tableName}，列信息:`, columns);
                sql = `CREATE TABLE ${tableName} (${columns.map(col => `${col.name} ${col.type}`).join(', ')})`;
            } else {
                // 如果没有提供列信息，tableName参数应该是完整的SQL语句
                console.log('执行创建表的SQL语句');
                sql = tableName;
            }

            await this.connection.execute(sql, { autoCommit: true });
            return true;
        } catch (error) {
            console.error('创建表失败:', error);
            throw error;
        }
    }



    /**
     * 用SQL语句创建表
     * @param {string} sql - 创建表的SQL语句
     * @returns {Promise} 创建结果
     */
    async createTableBySQL(sql){
        try {
            await this.ensureConnection();
            console.log(`执行创建表的SQL语句:`, sql);
            await this.connection.execute(sql, [], { autoCommit: true });
            return true;
        } catch (error) {
            console.error('创建表失败:', error);
            throw error;
        }
    }
}

module.exports = OracleAccessLayer;