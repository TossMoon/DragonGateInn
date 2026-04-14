"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 随机分配8位数字ID的模块
var randomIdGenerator =
/*#__PURE__*/
function () {
  function randomIdGenerator() {
    _classCallCheck(this, randomIdGenerator);

    this.idGenerator = new Set();
  }
  /**
   * 占用ID,可以显式指定占用一些ID
   * @param {string} id 要占用的ID
   */


  _createClass(randomIdGenerator, [{
    key: "occupyId",
    value: function occupyId(id) {
      this.idGenerator.add(id);
    }
    /**
     * 生成一个指定位数的随机数字ID
     * @param {number} digits 要生成的ID位数，默认8位
     * @returns {string} 指定位数的数字ID
     */

  }, {
    key: "generateId",
    value: function generateId() {
      var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

      if (digits < 1) {
        throw new Error('位数必须大于0');
      }

      var id;
      var min = Math.pow(10, digits - 1);
      var max = Math.pow(10, digits) - 1; // 确保生成的ID是唯一的

      do {
        // 生成指定范围内的随机数
        id = Math.floor(min + Math.random() * (max - min + 1)).toString();
      } while (this.idGenerator.has(id)); // 记录已生成的ID


      this.idGenerator.add(id);
      return id;
    }
    /**
     * 检查ID是否已存在
     * @param {string} id 要检查的ID
     * @returns {boolean} 如果ID已存在返回true，否则返回false
     */

  }, {
    key: "isIdExists",
    value: function isIdExists(id) {
      return this.idGenerator.has(id);
    }
    /**
     * 清除所有已生成的ID记录
     */

  }, {
    key: "clearIds",
    value: function clearIds() {
      this.idGenerator.clear();
    }
  }]);

  return randomIdGenerator;
}();

module.exports = randomIdGenerator;