"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.args = args;
  }
  /**
   * 触发观察者
   */


  _createClass(Observer, [{
    key: "notify",
    value: function notify() {
      assert(this.func !== null && typeof this.func === 'function');
      this.func.apply(this, _toConsumableArray(this.args));
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
      this.observers.forEach(function (observer) {
        return observer.notify();
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
   * 注册观察者
   * @param {string} messageName 消息名称
   * @param {Observer} observer 观察者
   */


  _createClass(MessageManager, [{
    key: "registerObserver",
    value: function registerObserver(messageName, observer) {
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
     * @param {Observer} observer 观察者
     */

  }, {
    key: "removeObserver",
    value: function removeObserver(messageName, observer) {
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
     */

  }, {
    key: "notifyAll",
    value: function notifyAll(messageName) {
      assert(messageName !== null && typeof messageName === 'string');

      if (this.messageMap.has(messageName) === false) {
        return;
      }

      this.messageMap.get(messageName).notifyAll();
    }
  }]);

  return MessageManager;
}();