const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 导入事务类
const branchRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/branchRegisterTransaction');
const customerRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/customerRegisterTransaction');
const headquarterRegisterTransaction = require('./transaction/accountTransaction/registerTransaction/headquarterRegisterTransaction');

const loginBranchTransaction = require('./transaction/accountTransaction/loginTransaction/loginBranchTransaction');
const loginCustomerByPhoneTransaction = require('./transaction/accountTransaction/loginTransaction/loginCustomerByPhoneTransaction');
const loginHeadquarterTransaction = require('./transaction/accountTransaction/loginTransaction/loginHeadquarterTransaction');

const customerReservateTransaction = require('./transaction/reservationTransaction/customerReservateTransaction');
const reservateByDisplayRoomTransaction = require('./transaction/reservationTransaction/reservateByDisplayRoomTransaction');
const cancelReservationTransaction = require('./transaction/reservationTransaction/cancelReservationTransaction');
const confirmReservationTransaction = require('./transaction/reservationTransaction/confirmReservationTransaction');


const branchAddRoomTransaction = require('./transaction/roomTransaction/branchAddRoomTransaction');
const branchDisableRoomTransaction = require('./transaction/roomTransaction/branchDisableRoomTransaction');
const branchEnableRoomTransaction = require('./transaction/roomTransaction/branchEnableRoomTransaction');
const branchChangePriceTransaction = require('./transaction/roomTransaction/barnchChangePriceTanscation');
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
const allBranchManager = require('./accountManager/branchAccountManager');

const SingletonFactory = require('./util/SingletonFactory');

/**
 * 启动服务器
 */
async function start() {
    // 中间件配置
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 路由配置 - 放在静态文件服务之前，确保 API 路由优先处理
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // 健康检查
    app.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    //获取所有分店列表
    app.get('/api/branches',(req,res)=>{
        console.log('收到 /api/branches 请求');
        try {
            const manager = SingletonFactory.getInstance(allBranchManager);
            console.log('manager:', manager);
            const branches = manager.getAllAccountList();
            console.log('分店数据:', branches);
            res.json(branches);
        } catch (error) {
            console.error('获取分店数据失败:', error);
            res.status(500).json({ error: error.message });
        }
    })

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
            const transaction = new customerRegisterTransaction();
            const result = await transaction.execute(req.body.phone, req.body.password);
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
            const transaction = new loginBranchTransaction();
            const result = await transaction.execute(req.body.branchId, req.body.password);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/login/customer', async (req, res) => {
        try {
            const transaction = new loginCustomerByPhoneTransaction();
            const result = await transaction.execute(req.body.customerId, req.body.password);
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
            const { branchId, roomId, area, window, bedType, bedNum, price } = req.body;
            const { room, RoomLayout, BedInRoom } = require('./branchResource/room/room');
            const bed = new BedInRoom(bedType || '单人床', bedNum || 1);
            const layout = new RoomLayout(area || 20, window || false, bed);
            const roomInstance = new room(roomId, branchId, layout);
            roomInstance.setPrice(price || 0);
            const transaction = new branchAddRoomTransaction();
            const result = transaction.execute(branchId, roomInstance);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/rooms/enable',async(req,res)=>{
        try{
            const transaction = new branchEnableRoomTransaction();
            const result = await transaction.execute(req.body.branchId, req.body.roomId);
            res.json(result);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/rooms/available/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const rooms = await SingletonFactory.getInstance(allRoomManager).getRoomsByBranchId(branchId);
            const availableRooms = rooms.filter(room => room.isEmptyBool === true && room.activeState.activeBool === true);
            res.json(availableRooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    // 预约相关接口
    app.get('/api/reservations/pending/:branchId', async (req, res) => {
        try {
            const { branchId } = req.params;
            const reservations = await SingletonFactory.getInstance(allReservationManager).getReservationsByBranchId(branchId);
            const pendingReservations = reservations.filter(r => r.state.state == 'pending');
            res.json(pendingReservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.post('/api/rooms/disable', async (req, res) => {
        try {
            const transaction = new branchDisableRoomTransaction();
            const result = transaction.execute(req.body.branchId, req.body.roomId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/rooms/change-price', async (req, res) => {
        try {
            const { branchId, roomId, price } = req.body;
            const transaction = new branchChangePriceTransaction();
            const result = transaction.execute(branchId, roomId, price);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 展示房间相关接口
    app.get('/api/display-rooms', async (req, res) => {
        try {
            const displayRooms = await SingletonFactory.getInstance(allDisplayRoomManager).getAllActiveDisplayRoom();
            displayRooms.forEach(room => {
                room.branchName=SingletonFactory.getInstance(allBranchManager).getOneAccountByID(room.branchId).getBranchName();
            });

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
            const { branchId, area, windowBool, typeString, numId, appraisePrice } = req.body;

            const transaction = new branchAddDisplayRoomTransaction();
            const result = await transaction.execute(branchId,{area,windowBool,typeString,numId},appraisePrice);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/display-rooms/disable', async (req, res) => {
        try {
            const transaction = new branchDisableDisplayRoomTransaction();
            const result = await transaction.execute(req.body.branchId, req.body.displayRoomId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/display-rooms/enable', async (req, res) => {
        try {
            const transaction = new branchEnableDisplayRoomTransaction();
            const result = await transaction.execute(req.body.branchId, req.body.displayRoomId);
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
            const reservations = await SingletonFactory.getInstance(allReservationManager).getReservationByCustomerPhone(customerId);
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

    app.get('/api/reservations/pending/branch/:branchId',async (req, res) => {
        try {
            const { branchId } = req.params;
            const reservations = await SingletonFactory.getInstance(allReservationManager).getPendingReservationsByBranchId(branchId);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/create', async (req, res) => {
        try {
            const transaction = new reservateByDisplayRoomTransaction();
            const result = await transaction.execute(req.body.branchId,req.body.customerId,req.body.displayRoomId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/cancel', async (req, res) => {
        try {
            const transaction = new cancelReservationTransaction();
            const result = await transaction.execute(req.body.reservationId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/reservations/confirm', async (req, res) => {
        try {
            const transaction = new confirmReservationTransaction();
            const result = await transaction.execute(req.body.reservationId);
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
            const { branchId, roomId,persons,reservationId } = req.body;

            const transaction = new createCheckInTransaction();
            const result = await transaction.execute(
                branchId,
                roomId,
                persons,
                reservationId || null
            );
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

    // 静态文件服务 - 放在所有 API 路由之后，确保 API 请求不会被静态文件中间件拦截
    app.use(express.static(path.join(__dirname, 'public')));

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
    start().then((server) => {
        console.log('应用启动成功');
        console.log('服务器状态:', server.address());
        // 保持进程运行
        process.stdin.resume();
    }).catch((error) => {
        console.error('应用启动失败:', error);
        process.exit(1);
    });
}