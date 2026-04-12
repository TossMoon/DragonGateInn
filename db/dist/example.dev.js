"use strict";

var OracleAccessLayer = require('./OracleAccessLayer');

function main() {
  var config, db, columns, insertResult, updateResult;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 数据库连接配置
          config = {
            user: 'username',
            password: 'password',
            connectString: 'localhost:1521/orcl'
          }; // 创建Oracle数据库访问实例

          db = new OracleAccessLayer(config);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(db.connect());

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(db.getTableColumns('USERS'));

        case 7:
          columns = _context.sent;
          console.log('表USERS的列信息:', columns); // 2. 向表中写入数据

          _context.next = 11;
          return regeneratorRuntime.awrap(db.insertData('USERS', {
            ID: 1,
            NAME: '张三',
            AGE: 30,
            CREATED_DATE: new Date()
          }));

        case 11:
          insertResult = _context.sent;
          console.log('插入数据结果:', insertResult, '行受影响'); // 3. 修改表中的数据

          _context.next = 15;
          return regeneratorRuntime.awrap(db.updateData('USERS', {
            AGE: 31
          }, {
            ID: 1
          }));

        case 15:
          updateResult = _context.sent;
          console.log('更新数据结果:', updateResult, '行受影响');
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](2);
          console.error('操作失败:', _context.t0);

        case 22:
          _context.prev = 22;
          _context.next = 25;
          return regeneratorRuntime.awrap(db.disconnect());

        case 25:
          return _context.finish(22);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 19, 22, 26]]);
} // 运行示例


main();