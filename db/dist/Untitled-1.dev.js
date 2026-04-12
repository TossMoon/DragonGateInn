"use strict";

// db/testOracle.js
var OracleAccessLayer = require('./OracleAccessLayer');

function testOracleConnection() {
  var config, db, columns, insertResult, updateResult;
  return regeneratorRuntime.async(function testOracleConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 数据库连接配置
          config = {
            user: 'your_username',
            password: 'your_password',
            connectString: 'localhost:1521/orcl'
          };
          db = new OracleAccessLayer(config);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(db.connect());

        case 5:
          console.log('连接成功'); // 测试获取表列

          _context.next = 8;
          return regeneratorRuntime.awrap(db.getTableAllColumns('USERS'));

        case 8:
          columns = _context.sent;
          console.log('表列信息:', columns); // 测试插入数据

          _context.next = 12;
          return regeneratorRuntime.awrap(db.insertData('USERS', {
            ID: 1,
            NAME: '测试用户',
            AGE: 25,
            CREATED_DATE: new Date()
          }));

        case 12:
          insertResult = _context.sent;
          console.log('插入结果:', insertResult, '行受影响'); // 测试更新数据

          _context.next = 16;
          return regeneratorRuntime.awrap(db.updateData('USERS', {
            AGE: 26
          }, {
            ID: 1
          }));

        case 16:
          updateResult = _context.sent;
          console.log('更新结果:', updateResult, '行受影响');
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](2);
          console.error('测试失败:', _context.t0);

        case 23:
          _context.prev = 23;
          _context.next = 26;
          return regeneratorRuntime.awrap(db.disconnect());

        case 26:
          console.log('连接已断开');
          return _context.finish(23);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 20, 23, 28]]);
} // 运行测试


testOracleConnection();