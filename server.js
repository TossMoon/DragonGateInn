const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 导入事务类
const branchRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/branchRegisterTransaction');
const customerRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/customerRegisterTransaction');
const headquarterRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/headquarterRegisterTransaction');
const loginBranchTransaction = require('./transaction/accountTransaction/loginTransaction/loginBranchTransaction');
const loginCustomerTransaction = require('./transaction/accountTransaction/loginTransaction/loginCustomerTransaction');
const loginHeadquarterTransaction = require('./transaction/accountTransaction/loginTransaction/loginHeadquarterTransaction');
const customerReservateTransaction = require('./transaction/reservationTransaction/customerReservateTransaction');
const cancelReservationTransaction = require('./transaction/reservationTransaction/cancelReservationTransaction');
const confirmReservationTransaction = require('./transaction/reservationTransaction/confirmReservationTransaction');
const branchAddRoomTransaction = require('./transaction/roomTransaction/branchAddRoomTransaction');
const branchDisableRoomTransaction = require('./transaction/roomTransaction/branchDisableRoomTransaction');
const branchAddDisplayRoomTransaction = require('./transaction/displayRoomTransaction/branchAddDisplayRoomTransaction');
const branchDisableDisplayRoomTransaction = require('./transaction/displayRoomTransaction/branchDisableDisplayRoomTransaction');
const branchEnableDisplayRoomTransaction = require('./transaction/displayRoomTransaction/branchEnableDisplayRoomTransaction');
const createCheckInTransaction = require('./transaction/checkInTransaction/createCheckInTransaction');
const checkoutTransaction = require('./transaction/checkInTransaction/checkoutTransaction');
const addConsumeTransaction = require('./transaction/checkInTransaction/addConsumeTransaction');

// 导入管理器
const allRoomManager = require('./branchResource/room/allRoomManager');
const allReservationManager = require('./branchResource/reservation/allReservationManager');
const allCheckInManager = require('./branchResource/checkIn/allCheckInManager');
const allDisplayRoomManager = require('./branchResource/displayRoom/allDisplayRoomManager');

const SingletonFactory = require('./util/SingletonFactory');

/**
 * 启动服务器
 */
async function start() {
    // 中间件配置
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 静态文件服务
    app.use(express.static(path.join(__dirname, 'public')));

    // 路由配置
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // 健康检查
    app.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    // 账户相关接口
    app.post('/api/register/branch', async (req, res) => {
        try {
            const transaction = new branchRegisterTransaction();
            const result = await transaction.execute(req.body.branchName);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/register/customer', async (req, res) => {
        try {
            const transaction = new customerRegisterTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/register/headquarter', async (req, res) => {
        try {
            const transaction = new headquarterRegisterTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/login/branch', async (req, res) => {
        try {
            const transaction = new loginBranchTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/login/customer', async (req, res) => {
        try {
            const transaction = new loginCustomerTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/login/headquarter', async (req, res) => {
        try {
            const transaction = new loginHeadquarterTransaction();
            const result = transaction.execute(req.body.headquarterId, req.body.password);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 房间相关接口
    app.get('/api/rooms', async (req, res) => {
        try {
            const rooms = await SingletonFactory.getInstance(allRoomManager).getAllRooms();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/rooms/branch/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const rooms = await SingletonFactory.getInstance(allRoomManager).getRoomsByBranchId(branchId);
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/rooms/add', async (req, res) => {
        try {
            const transaction = new branchAddRoomTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/rooms/disable', async (req, res) => {
        try {
            const transaction = new branchDisableRoomTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 展示房间相关接口
    app.get('/api/display-rooms', async (req, res) => {
        try {
            const displayRooms = await SingletonFactory.getInstance(allDisplayRoomManager).getAllDisplayRooms();
            res.json(displayRooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/display-rooms/branch/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const displayRooms = await SingletonFactory.getInstance(allDisplayRoomManager).getDisplayRoomsByBranchId(branchId);
            res.json(displayRooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/display-rooms/add', async (req, res) => {
        try {
            const transaction = new branchAddDisplayRoomTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/display-rooms/disable', async (req, res) => {
        try {
            const transaction = new branchDisableDisplayRoomTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/display-rooms/enable', async (req, res) => {
        try {
            const transaction = new branchEnableDisplayRoomTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 预约相关接口
    app.get('/api/reservations', async (req, res) => {
        try {
            const reservations = await SingletonFactory.getInstance(allReservationManager).getAllReservations();
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/reservations/customer/:customerId', async (req, res) => {
        try {
            const { customerId } = req.params;
            const reservations = await SingletonFactory.getInstance(allReservationManager).getReservationsByCustomerId(customerId);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/reservations/branch/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const reservations = await SingletonFactory.getInstance(allReservationManager).getReservationsByBranchId(branchId);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/create', async (req, res) => {
        try {
            const transaction = new customerReservateTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/cancel', async (req, res) => {
        try {
            const transaction = new cancelReservationTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/confirm', async (req, res) => {
        try {
            const transaction = new confirmReservationTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 入住相关接口
    app.get('/api/checkins', async (req, res) => {
        try {
            const checkins = await SingletonFactory.getInstance(allCheckInManager).getAllCheckIns();
            res.json(checkins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/checkins/branch/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const checkins = await SingletonFactory.getInstance(allCheckInManager).getCheckInsByBranchId(branchId);
            res.json(checkins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/checkins/customer/:customerId', async (req, res) => {
        try {
            const { customerId } = req.params;
            const checkins = await SingletonFactory.getInstance(allCheckInManager).getCheckInsByCustomerId(customerId);
            res.json(checkins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/checkins/create', async (req, res) => {
        try {
            const transaction = new createCheckInTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/checkins/checkout', async (req, res) => {
        try {
            const transaction = new checkoutTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/checkins/add-consume', async (req, res) => {
        try {
            const transaction = new addConsumeTransaction(req.body);
            const result = await transaction.execute();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 启动服务器
    return new Promise((resolve, reject) => {
        const server = app.listen(PORT, () => {
            console.log(`服务器运行在 http://localhost:${PORT}`);
            resolve(server);
        });

        server.on('error', (error) => {
            reject(error);
        });
    });
}

// 导出start函数
module.exports = { start };

// 如果直接运行此文件，则启动服务器
if (require.main === module) {
    start().then(() => {
        console.log('应用启动成功');
    }).catch((error) => {
        console.error('应用启动失败:', error);
    });
}