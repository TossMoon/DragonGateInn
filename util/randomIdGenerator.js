// 随机分配8位数字ID的模块
class randomIdGenerator{
    constructor(){
        this.idGenerator=new Set();
    }

    /**
     * 占用ID,可以显式指定占用一些ID
     * @param {string} id 要占用的ID
     */
     occupyId(id){
        this.idGenerator.add(id);
    }

    /**
     * 生成一个指定位数的随机数字ID
     * @param {number} digits 要生成的ID位数，默认8位
     * @returns {string} 指定位数的数字ID
     */
     generateId(digits = 8) {
        if (digits < 1) {
            throw new Error('位数必须大于0');
        }
        
        let id;
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        
        // 确保生成的ID是唯一的
        do {
            // 生成指定范围内的随机数
            id = Math.floor(min + Math.random() * (max - min + 1)).toString();
        } while (this.idGenerator.has(id));

        // 记录已生成的ID
        this.idGenerator.add(id);
        return id;
    }


    /**
     * 检查ID是否已存在
     * @param {string} id 要检查的ID
     * @returns {boolean} 如果ID已存在返回true，否则返回false
     */
     isIdExists(id) {
        return this.idGenerator.has(id);
    }

    /**
     * 清除所有已生成的ID记录
     */
     clearIds() {
        this.idGenerator.clear();
    }
}

module.exports=randomIdGenerator;