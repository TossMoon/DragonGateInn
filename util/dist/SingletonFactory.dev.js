"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// 泛型单例工厂
var SingletonFactory = function () {
  // 存储不同类的单例实例
  var instances = new Map();
  return {
    /**
     * 获取指定类的单例实例
     * @param {Function} Class - 目标类
     * @param {...any} args - 类构造函数的参数（仅首次创建时使用）
     * @returns {Object} 该类的单例实例
     */
    getInstance: function getInstance(Class) {
      // 检查 Class 是否为函数（构造函数）
      if (typeof Class !== 'function') {
        throw new Error('First argument must be a constructor function');
      } // 检查 Map 中是否已存在该类的实例


      if (!instances.has(Class)) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // 首次创建实例并存储
        var instance = _construct(Class, args);

        instances.set(Class, instance);
      } // 返回已存储的实例


      return instances.get(Class);
    },

    /**
     * 移除指定类的单例实例（可选）
     * @param {Function} Class - 目标类
     */
    removeInstance: function removeInstance(Class) {
      if (instances.has(Class)) {
        instances["delete"](Class);
      }
    },

    /**
     * 清空所有单例实例（可选）
     */
    clear: function clear() {
      instances.clear();
    }
  };
}();

module.exports = SingletonFactory;