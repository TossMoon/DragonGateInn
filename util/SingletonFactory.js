// 泛型单例工厂
const SingletonFactory = (function() {
  // 存储不同类的单例实例
  const instances = new Map();

  return {
    /**
     * 获取指定类的单例实例
     * @param {Function} Class - 目标类
     * @param {...any} args - 类构造函数的参数（仅首次创建时使用）
     * @returns {Object} 该类的单例实例
     */
    getInstance(Class, ...args) {
      // 检查 Class 是否为函数（构造函数）
      if (typeof Class !== 'function') {
        throw new Error('First argument must be a constructor function');
      }

      // 检查 Map 中是否已存在该类的实例
      if (!instances.has(Class)) {
        // 首次创建实例并存储
        const instance = new Class(...args);
        instances.set(Class, instance);
      }

      // 返回已存储的实例
      return instances.get(Class);
    },

    /**
     * 移除指定类的单例实例（可选）
     * @param {Function} Class - 目标类
     */
    removeInstance(Class) {
      if (instances.has(Class)) {
        instances.delete(Class);
      }
    },

    /**
     * 清空所有单例实例（可选）
     */
    clear() {
      instances.clear();
    }
  };
})();

module.exports=SingletonFactory;
