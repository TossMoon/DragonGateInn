"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../util/MessageManager'),
    MessageManager = _require.MessageManager;

describe('消息管理器', function () {
  var TestObserver =
  /*#__PURE__*/
  function () {
    function TestObserver() {
      _classCallCheck(this, TestObserver);

      this.message = 'testObserver';
    }

    _createClass(TestObserver, [{
      key: "printLog",
      value: function printLog(num) {
        console.log(this.message, num);
      }
    }]);

    return TestObserver;
  }();

  it('通知观察者', function () {
    var messageName = 'testMessage'; // 创建TestObserver实例

    var testObserver = new TestObserver();
    var curMeessagerManager = new MessageManager();
    curMeessagerManager.addObserver(messageName, testObserver.printLog.bind(testObserver));
    curMeessagerManager.notifyAll(messageName, 100);
    curMeessagerManager.removeObserver(messageName, testObserver.printLog.bind(testObserver));
  });
});