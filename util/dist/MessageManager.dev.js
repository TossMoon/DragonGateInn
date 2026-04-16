"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var assert = require('assert');
/**
 * 观察者
 */


var Observer =
/*#__PURE__*/
function () {
  function Observer(func) {
    _classCallCheck(this, Observer);

    this.func = func;
  }
  /**
   * 触发观察者
   */


  _createClass(Observer, [{
    key: "notify",
    value: function notify() {
      assert(this.func !== null && typeof this.func === 'function');
      this.func.apply(this, arguments);
    }
  }]);

  return Observer;
}();
/**
 * 观察者列表
 */


var ObserverList =
/*#__PURE__*/
function () {
  function ObserverList() {
    _classCallCheck(this, ObserverList);

    this.observers = [];
  }
  /**
   * 添加观察者
   * @param {Observer} observer 观察者
   */


  _createClass(ObserverList, [{
    key: "push",
    value: function push(observer) {
      assert(observer !== null && observer instanceof Observer);
      this.observers.push(observer);
    }
    /**
     * 移除观察者
     * @param {Observer} observer 观察者
     */

  }, {
    key: "remove",
    value: function remove(observer) {
      assert(observer !== null && observer instanceof Observer);
      this.observers.splice(this.observers.indexOf(observer), 1);
    }
    /**
     * 清空所有观察者
     */

  }, {
    key: "clear",
    value: function clear() {
      this.observers = [];
    }
    /**
     * 触发所有观察者
     */

  }, {
    key: "notifyAll",
    value: function notifyAll() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.observers.forEach(function (observer) {
        return observer.notify.apply(observer, args);
      });
    }
  }]);

  return ObserverList;
}();
/**
/**
 * 消息管理器
 */


var MessageManager =
/*#__PURE__*/
function () {
  function MessageManager() {
    _classCallCheck(this, MessageManager);

    this.messageMap = new Map();
  }
  /**
   * 注册消息
   * @param {string} messageName 消息名称
   */


  _createClass(MessageManager, [{
    key: "registerMessage",
    value: function registerMessage(messageName) {
      assert(messageName !== null && typeof messageName === 'string');

      if (this.messageMap.has(messageName) === false) {
        this.messageMap.set(messageName, new ObserverList());
      }
    }
    /**
     * 添加观察者
     * @param {string} messageName 消息名称
     * @param {function} fun 观察者函数
     */

  }, {
    key: "addObserver",
    value: function addObserver(messageName, fun) {
      this.registerObserverByObject(messageName, new Observer(fun));
    }
    /**
     * 注册观察者
     * @param {string} messageName 消息名称
     * @param {Observer} observer 观察者
     */

  }, {
    key: "registerObserverByObject",
    value: function registerObserverByObject(messageName, observer) {
      assert(messageName !== null && typeof messageName === 'string');
      assert(observer !== null && observer instanceof Observer);

      if (this.messageMap.has(messageName) === false) {
        this.messageMap.set(messageName, new ObserverList());
      }

      this.messageMap.get(messageName).push(observer);
    }
    /**
     * 移除观察者
     * @param {string} messageName 消息名称
     * @param {function} func 观察者函数
     */

  }, {
    key: "removeObserver",
    value: function removeObserver(messageName, func) {
      this.removeObserverByObject(messageName, new Observer(func));
    }
    /**
     * 移除观察者
     * @param {string} messageName 消息名称
     * @param {Observer} observer 观察者
     */

  }, {
    key: "removeObserverByObject",
    value: function removeObserverByObject(messageName, observer) {
      assert(messageName !== null && typeof messageName === 'string');
      assert(observer !== null && observer instanceof Observer);

      if (this.messageMap.has(messageName) === false) {
        return;
      }

      this.messageMap.get(messageName).remove(observer);
    }
    /**
     * 移除所有观察者
     * @param {string} messageName 消息名称
     */

  }, {
    key: "removeAllObserve",
    value: function removeAllObserve(messageName) {
      assert(messageName !== null && typeof messageName === 'string');

      if (this.messageMap.has(messageName) === false) {
        return;
      }

      this.messageMap.get(messageName).clear();
    }
    /**
     * 触发所有观察者
     * @param {string} messageName 消息名称
     * @param {...*} args 观察者函数参数
     */

  }, {
    key: "notifyAll",
    value: function notifyAll(messageName) {
      var _this$messageMap$get;

      assert(messageName !== null && typeof messageName === 'string');

      if (this.messageMap.has(messageName) === false) {
        return;
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$messageMap$get = this.messageMap.get(messageName)).notifyAll.apply(_this$messageMap$get, args);
    }
  }]);

  return MessageManager;
}();

module.exports.MessageManager = MessageManager;