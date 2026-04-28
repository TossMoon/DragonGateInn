import { roomAPI, displayRoomAPI, reservationAPI, checkInAPI, authAPI, branchAPI } from '../api/index.js';
import { authManager } from '../auth/index.js';

class HeadquarterView {
    constructor(container) {
        this.container = container;
        this.currentSection = 'dashboard';
    }

    async render() {
        const user = authManager.getCurrentUser();
        this.container.innerHTML = `
            <div class="header">
                <h1>总部端 - 龙门客栈</h1>
                <p>总部ID: ${user.id}</p>
                <button id="btn-logout" class="btn btn-secondary" style="margin-top: 10px; width: auto;">退出登录</button>
            </div>

            <div class="navigation">
                <ul>
                    <li><a href="#" data-section="dashboard" class="${this.currentSection === 'dashboard' ? 'active' : ''}">总览</a></li>
                    <li><a href="#" data-section="branches" class="${this.currentSection === 'branches' ? 'active' : ''}">分店管理</a></li>
                    <li><a href="#" data-section="rooms" class="${this.currentSection === 'rooms' ? 'active' : ''}">房间统计</a></li>
                    <li><a href="#" data-section="reservations" class="${this.currentSection === 'reservations' ? 'active' : ''}">预约统计</a></li>
                    <li><a href="#" data-section="checkins" class="${this.currentSection === 'checkins' ? 'active' : ''}">入住统计</a></li>
                </ul>
            </div>

            <div id="content-area">
                <div class="loading">加载中</div>
            </div>
        `;

        this.bindNavigationEvents();
        this.bindLogoutEvent();
        await this.loadContent();
    }

    bindNavigationEvents() {
        const navLinks = this.container.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.currentSection = section;

                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                await this.loadContent();
            });
        });
    }

    bindLogoutEvent() {
        const logoutBtn = this.container.querySelector('#btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    async loadContent() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="loading">加载中</div>';

        try {
            switch (this.currentSection) {
                case 'dashboard':
                    await this.renderDashboard(contentArea);
                    break;
                case 'branches':
                    await this.renderBranches(contentArea);
                    break;
                case 'rooms':
                    await this.renderRooms(contentArea);
                    break;
                case 'reservations':
                    await this.renderReservations(contentArea);
                    break;
                case 'checkins':
                    await this.renderCheckIns(contentArea);
                    break;
            }
        } catch (error) {
            contentArea.innerHTML = `<div class="message error">加载失败: ${error.message}</div>`;
        }
    }

    async renderDashboard(container) {
        try {
            const rooms = await roomAPI.getAllRooms();
            const displayRooms = await displayRoomAPI.getAllDisplayRooms();
            const reservations = await reservationAPI.getAllReservations();
            const checkins = await checkInAPI.getAllCheckIns();

            const totalRevenue = checkins.reduce((sum, c) => sum + (c.consumeNumber || c.consumeAmount || 0), 0);
            const emptyRooms = rooms.filter(r => r.roomState === 'EMPTY' || r.roomState === 0);

            container.innerHTML = `
                <div class="stats">
                    <div class="stat-card">
                        <h3>${rooms.length}</h3>
                        <p>房间总数</p>
                    </div>
                    <div class="stat-card">
                        <h3>${emptyRooms.length}</h3>
                        <p>空闲房间</p>
                    </div>
                    <div class="stat-card">
                        <h3>${reservations.length}</h3>
                        <p>预约总数</p>
                    </div>
                    <div class="stat-card">
                        <h3>¥${totalRevenue.toFixed(2)}</h3>
                        <p>总收入</p>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="card">
                        <div class="card-header">最近预约</div>
                        ${reservations.length === 0 ? '<p>暂无预约</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>预约ID</th>
                                        <th>分店</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${reservations.slice(0, 5).map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${r.branchId}</td>
                                            <td>${this.getReservationStatusText(r.state)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>

                    <div class="card">
                        <div class="card-header">最近入住</div>
                        ${checkins.length === 0 ? '<p>暂无入住</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>入住ID</th>
                                        <th>分店</th>
                                        <th>消费</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${checkins.slice(0, 5).map(c => `
                                        <tr>
                                            <td>${c.id}</td>
                                            <td>${c.branchId}</td>
                                            <td>¥${c.consumeNumber || c.consumeAmount || 0}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载数据失败: ${error.message}</div>`;
        }
    }

    async renderBranches(container) {
        try {
            const branches = await branchAPI.getAllBranches();  // 直接获取分店列表
            const rooms = await roomAPI.getAllRooms();
            const reservations = await reservationAPI.getAllReservations();

            const branchStats = {};
             // 先用分店列表初始化
            branches.forEach(b => {
            branchStats[b.idString] = { 
                name: b.branchName,      // 分店名称
                activeState: b.activeState.activeBool,
                totalRooms: 0, 
                emptyRooms: 0, 
                reservations: 0 
                };
            });

            rooms.forEach(r => {
                if (!branchStats[r.branchId]) {
                    branchStats[r.branchId] = { totalRooms: 0, emptyRooms: 0, reservations: 0 };
                }
                branchStats[r.branchId].totalRooms++;
                if (r.roomState === 'EMPTY' || r.roomState === 0) {
                    branchStats[r.branchId].emptyRooms++;
                }
            });

            reservations.forEach(r => {
                if (branchStats[r.branchId]) {
                    branchStats[r.branchId].reservations++;
                }
            });

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        分店列表
                        <button id="btn-add-branch" class="btn" style="width: auto; margin-left: 20px;">添加分店</button>
                    </div>
                    <div class="table-container">
                        ${Object.keys(branchStats).length === 0 ? '<p>暂无分店</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>分店ID</th>
                                        <th>分店名称</th>
                                        <th>房间总数</th>
                                        <th>空闲房间</th>
                                        <th>待处理预约</th>
                                        <th>入住率</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.entries(branchStats).map(([branchId, stats]) => {
                                        const occupancyRate = stats.totalRooms > 0 ?
                                            ((stats.totalRooms - stats.emptyRooms) / stats.totalRooms * 100).toFixed(1) + '%' : '0%';
                                        return `
                                            <tr>
                                                <td>${branchId}</td>
                                                <td>${stats.name}</td>
                                                <td>${stats.totalRooms}</td>
                                                <td>${stats.emptyRooms}</td>
                                                <td>${stats.reservations}</td>
                                                <td>${stats.activeState ? '已启用' : '已禁用'}</td>
                                                <td>${occupancyRate}</td>
                                                <td>
                                                    <button class="btn btn-secondary btn-branch-detail" style="width: auto; padding: 5px 10px;" data-branch-id="${branchId}">详情</button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;

            const addBranchBtn = container.querySelector('#btn-add-branch');
            if (addBranchBtn) {
                addBranchBtn.addEventListener('click', () => this.showAddBranchModal());
            }

            const detailBtns = container.querySelectorAll('.btn-branch-detail');
            detailBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const branchId = e.target.dataset.branchId;
                    this.viewBranchDetail(branchId);
                });
            });
        } catch (error) {
            container.innerHTML = `<div class="message error">加载分店数据失败: ${error.message}</div>`;
        }
    }

    async renderRooms(container) {
        try {
            const rooms = await roomAPI.getAllRooms();

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">所有房间</div>
                    <div class="table-container">
                        ${rooms.length === 0 ? '<p>暂无房间</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>房间ID</th>
                                        <th>分店</th>
                                        <th>户型</th>
                                        <th>价格</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rooms.map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${r.branchId}</td>
                                            <td>${r.roomLayout || '标准'}</td>
                                            <td>¥${r.price || 0}</td>
                                            <td><span class="status ${r.roomState === 'EMPTY' || r.roomState === 0 ? 'active' : 'inactive'}">${this.getRoomStatusText(r.roomState)}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载房间数据失败: ${error.message}</div>`;
        }
    }

    async renderReservations(container) {
        try {
            const reservations = await reservationAPI.getAllReservations();

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">所有预约</div>
                    <div class="table-container">
                        ${reservations.length === 0 ? '<p>暂无预约</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>预约ID</th>
                                        <th>分店</th>
                                        <th>顾客ID</th>
                                        <th>入住日期</th>
                                        <th>退房日期</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${reservations.map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${r.branchId}</td>
                                            <td>${r.customerId}</td>
                                            <td>${r.checkInDate || r.startDate || '未指定'}</td>
                                            <td>${r.checkOutDate || r.endDate || '未指定'}</td>
                                            <td><span class="status ${this.getReservationStatusClass(r.state)}">${this.getReservationStatusText(r.state)}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载预约数据失败: ${error.message}</div>`;
        }
    }

    async renderCheckIns(container) {
        try {
            const checkins = await checkInAPI.getAllCheckIns();

            const totalRevenue = checkins.reduce((sum, c) => sum + (c.consumeNumber || c.consumeAmount || 0), 0);
            const activeCheckins = checkins.filter(c => !c.checkOutDate && !c.endDate);

            container.innerHTML = `
                <div class="stats">
                    <div class="stat-card">
                        <h3>${checkins.length}</h3>
                        <p>入住总数</p>
                    </div>
                    <div class="stat-card">
                        <h3>${activeCheckins.length}</h3>
                        <p>当前入住</p>
                    </div>
                    <div class="stat-card">
                        <h3>¥${totalRevenue.toFixed(2)}</h3>
                        <p>总收入</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">入住记录</div>
                    <div class="table-container">
                        ${checkins.length === 0 ? '<p>暂无入住记录</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>入住ID</th>
                                        <th>分店</th>
                                        <th>房间ID</th>
                                        <th>顾客ID</th>
                                        <th>入住日期</th>
                                        <th>退房日期</th>
                                        <th>消费</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${checkins.map(c => `
                                        <tr>
                                            <td>${c.id}</td>
                                            <td>${c.branchId}</td>
                                            <td>${c.roomId}</td>
                                            <td>${c.customerId}</td>
                                            <td>${c.checkInDate || c.startDate || '未指定'}</td>
                                            <td>${c.checkOutDate || c.endDate || '未退房'}</td>
                                            <td>¥${c.consumeNumber || c.consumeAmount || 0}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载入住数据失败: ${error.message}</div>`;
        }
    }

    getRoomStatusText(state) {
        switch (state) {
            case 'EMPTY':
            case 0:
                return '空闲';
            case 'OCCUPIED':
            case 1:
                return '已占用';
            case 'DISABLED':
            case 2:
                return '已下架';
            default:
                return '未知';
        }
    }

    getReservationStatusClass(state) {
        switch (state) {
            case 'PENDING':
            case 0:
                return 'pending';
            case 'CONFIRMED':
            case 1:
                return 'active';
            case 'CANCELED':
            case 'CANCELLED':
            case 2:
                return 'inactive';
            default:
                return '';
        }
    }

    getReservationStatusText(state) {
        switch (state) {
            case 'PENDING':
            case 0:
                return '待确认';
            case 'CONFIRMED':
            case 1:
                return '已确认';
            case 'CANCELED':
            case 'CANCELLED':
            case 2:
                return '已取消';
            default:
                return '未知';
        }
    }

    showAddBranchModal() {
        console.log('showAddBranchModal called');
        this.container.innerHTML += `
            <div class="modal-overlay" id="add-branch-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h3>添加新分店</h3>
                        <button id="btn-close-modal" class="close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="add-branch-form">
                            <div class="form-group">
                                <label for="branchName">分店名称</label>
                                <input type="text" id="branchName" name="branchName" required placeholder="请输入分店名称">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="btn-cancel" class="btn btn-secondary">取消</button>
                        <button id="btn-confirm-add" class="btn">确认添加</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-close-modal').addEventListener('click', () => {
            document.getElementById('add-branch-modal').remove();
        });

        document.getElementById('btn-cancel').addEventListener('click', () => {
            document.getElementById('add-branch-modal').remove();
        });

        document.getElementById('btn-confirm-add').addEventListener('click', () => {
            this.handleAddBranch();
        });
    }

    async handleAddBranch() {
        console.log('handleAddBranch called');
        const branchName = document.getElementById('branchName').value.trim();
        if (!branchName) {
            alert('请输入分店名称');
            return;
        }
        try {
            const response = await authAPI.registerBranch({ branchName: branchName });

            if (response.success || response.successBool) {
                const newAccount = response.resultContent || response;
                const branchId = newAccount.idString;
                const password = newAccount.passwordString;

                alert(`分店添加成功！\n\n分店ID: ${branchId}\n初始密码: ${password}\n\n请妥善保管账号信息！`);

                document.getElementById('add-branch-modal').remove();
                this.loadContent();
            } else {
                alert('添加失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('添加失败: ' + error.message);
        }
    }

    viewBranchDetail(branchId) {
        alert('查看分店详情功能：请通过API实现');
    }

    logout() {
        if (confirm('确定要退出登录吗？')) {
            authManager.logout();
            window.location.reload();
        }
    }
}

export default HeadquarterView;