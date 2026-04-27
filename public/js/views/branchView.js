import { roomAPI, displayRoomAPI, reservationAPI, checkInAPI } from '../api/index.js';
import { authManager } from '../auth/index.js';

class BranchView {
    constructor(container) {
        this.container = container;
        this.currentSection = 'dashboard';
    }

    async render() {
        const user = authManager.getCurrentUser();
        this.container.innerHTML = `
            <div class="header">
                <h1>分店端 - 龙门客栈</h1>
                <p>分店ID: ${user.branchId || user.id}</p>
                <button class="btn btn-secondary" style="margin-top: 10px; width: auto;" onclick="window.branchView.logout()">退出登录</button>
            </div>

            <div class="navigation">
                <ul>
                    <li><a href="#" data-section="dashboard" class="${this.currentSection === 'dashboard' ? 'active' : ''}">总览</a></li>
                    <li><a href="#" data-section="rooms" class="${this.currentSection === 'rooms' ? 'active' : ''}">房间管理</a></li>
                    <li><a href="#" data-section="displayRooms" class="${this.currentSection === 'displayRooms' ? 'active' : ''}">展示房间</a></li>
                    <li><a href="#" data-section="reservations" class="${this.currentSection === 'reservations' ? 'active' : ''}">预约管理</a></li>
                    <li><a href="#" data-section="checkins" class="${this.currentSection === 'checkins' ? 'active' : ''}">入住管理</a></li>
                </ul>
            </div>

            <div id="content-area">
                <div class="loading">加载中</div>
            </div>
        `;

        this.bindNavigationEvents();
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

    async loadContent() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="loading">加载中</div>';

        try {
            switch (this.currentSection) {
                case 'dashboard':
                    await this.renderDashboard(contentArea);
                    break;
                case 'rooms':
                    await this.renderRooms(contentArea);
                    break;
                case 'displayRooms':
                    await this.renderDisplayRooms(contentArea);
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
        const branchId = authManager.getBranchId() || authManager.getUserId();
        try {
            const rooms = await roomAPI.getRoomsByBranch(branchId);
            const displayRooms = await displayRoomAPI.getDisplayRoomsByBranch(branchId);
            const reservations = await reservationAPI.getReservationsByBranch(branchId);
            const checkins = await checkInAPI.getCheckInsByBranch(branchId);

            const emptyRooms = rooms.filter(r => r.roomState === 'EMPTY' || r.roomState === 0);
            const occupiedRooms = rooms.filter(r => r.roomState === 'OCCUPIED' || r.roomState === 1);

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
                        <h3>${occupiedRooms.length}</h3>
                        <p>已入住房间</p>
                    </div>
                    <div class="stat-card">
                        <h3>${reservations.length}</h3>
                        <p>待处理预约</p>
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
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${reservations.slice(0, 5).map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${this.getReservationStatusText(r.state)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>

                    <div class="card">
                        <div class="card-header">入住情况</div>
                        ${checkins.length === 0 ? '<p>暂无入住</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>入住ID</th>
                                        <th>房间</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${checkins.slice(0, 5).map(c => `
                                        <tr>
                                            <td>${c.id}</td>
                                            <td>${c.roomId}</td>
                                            <td>${c.checkOutDate ? '已退房' : '入住中'}</td>
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

    async renderRooms(container) {
        const branchId = authManager.getBranchId() || authManager.getUserId();
        try {
            const rooms = await roomAPI.getRoomsByBranch(branchId);

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        房间列表
                        <button class="btn" style="width: auto; margin-left: 20px;" onclick="window.branchView.showAddRoomModal()">添加房间</button>
                    </div>
                    <div class="table-container">
                        ${rooms.length === 0 ? '<p>暂无房间</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>房间ID</th>
                                        <th>户型</th>
                                        <th>价格</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rooms.map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${r.roomLayout || '标准'}</td>
                                            <td>¥${r.price || 0}</td>
                                            <td><span class="status ${r.roomState === 'EMPTY' || r.roomState === 0 ? 'active' : 'inactive'}">${this.getRoomStatusText(r.roomState)}</span></td>
                                            <td>
                                                ${r.roomState === 'EMPTY' || r.roomState === 0 ?
                                                    `<button class="btn btn-danger" style="width: auto; padding: 5px 10px;" onclick="window.branchView.disableRoom('${r.id}')">下架</button>`
                                                    :
                                                    `<button class="btn btn-secondary" style="width: auto; padding: 5px 10px;" onclick="window.branchView.enableRoom('${r.id}')">上架</button>`
                                                }
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载房间失败: ${error.message}</div>`;
        }
    }

    async renderDisplayRooms(container) {
        const branchId = authManager.getBranchId() || authManager.getUserId();
        try {
            const displayRooms = await displayRoomAPI.getDisplayRoomsByBranch(branchId);

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        展示房间列表
                        <button class="btn" style="width: auto; margin-left: 20px;" onclick="window.branchView.showAddDisplayRoomModal()">添加展示房间</button>
                    </div>
                    <div class="grid">
                        ${displayRooms.length === 0 ? '<p>暂无展示房间</p>' :
                            displayRooms.map(room => `
                                <div class="item-card">
                                    <h3>展示房间 - ${room.id}</h3>
                                    <p>户型: ${room.roomLayout || '标准'}</p>
                                    <p>价格: ¥${room.appraisePrice || room.price || 0}</p>
                                    <span class="status ${room.activeState === 'ACTIVE' || room.activeState === 1 ? 'active' : 'inactive'}">
                                        ${room.activeState === 'ACTIVE' || room.activeState === 1 ? '已上架' : '已下架'}
                                    </span>
                                    <div style="margin-top: 15px;">
                                        ${room.activeState === 'ACTIVE' || room.activeState === 1 ?
                                            `<button class="btn btn-danger" style="width: auto;" onclick="window.branchView.disableDisplayRoom('${room.id}')">下架</button>`
                                            :
                                            `<button class="btn btn-secondary" style="width: auto;" onclick="window.branchView.enableDisplayRoom('${room.id}')">重新上架</button>`
                                        }
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载展示房间失败: ${error.message}</div>`;
        }
    }

    async renderReservations(container) {
        const branchId = authManager.getBranchId() || authManager.getUserId();
        try {
            const reservations = await reservationAPI.getReservationsByBranch(branchId);

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">预约管理</div>
                    <div class="table-container">
                        ${reservations.length === 0 ? '<p>暂无预约</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>预约ID</th>
                                        <th>顾客ID</th>
                                        <th>房间户型</th>
                                        <th>入住日期</th>
                                        <th>退房日期</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${reservations.map(r => `
                                        <tr>
                                            <td>${r.id}</td>
                                            <td>${r.customerId}</td>
                                            <td>${r.roomType || '标准'}</td>
                                            <td>${r.checkInDate || r.startDate || '未指定'}</td>
                                            <td>${r.checkOutDate || r.endDate || '未指定'}</td>
                                            <td><span class="status ${this.getReservationStatusClass(r.state)}">${this.getReservationStatusText(r.state)}</span></td>
                                            <td>
                                                ${r.state === 'PENDING' || r.state === 0 ?
                                                    `<button class="btn" style="width: auto; padding: 5px 10px;" onclick="window.branchView.confirmReservation('${r.id}')">确认</button>
                                                     <button class="btn btn-danger" style="width: auto; padding: 5px 10px;" onclick="window.branchView.rejectReservation('${r.id}')">拒绝</button>`
                                                    : ''}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载预约失败: ${error.message}</div>`;
        }
    }

    async renderCheckIns(container) {
        const branchId = authManager.getBranchId() || authManager.getUserId();
        try {
            const checkins = await checkInAPI.getCheckInsByBranch(branchId);
            const rooms = await roomAPI.getRoomsByBranch(branchId);
            const emptyRooms = rooms.filter(r => r.roomState === 'EMPTY' || r.roomState === 0);

            container.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        入住管理
                        <button class="btn" style="width: auto; margin-left: 20px;" onclick="window.branchView.showCheckInModal()">办理入住</button>
                    </div>
                    <div class="table-container">
                        ${checkins.length === 0 ? '<p>暂无入住记录</p>' : `
                            <table>
                                <thead>
                                    <tr>
                                        <th>入住ID</th>
                                        <th>房间ID</th>
                                        <th>顾客ID</th>
                                        <th>入住日期</th>
                                        <th>退房日期</th>
                                        <th>消费</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${checkins.map(c => `
                                        <tr>
                                            <td>${c.id}</td>
                                            <td>${c.roomId}</td>
                                            <td>${c.customerId}</td>
                                            <td>${c.checkInDate || c.startDate || '未指定'}</td>
                                            <td>${c.checkOutDate || c.endDate || '未退房'}</td>
                                            <td>¥${c.consumeNumber || c.consumeAmount || 0}</td>
                                            <td>
                                                ${!c.checkOutDate && !c.endDate ?
                                                    `<button class="btn" style="width: auto; padding: 5px 10px;" onclick="window.branchView.addConsume('${c.id}')">加消费</button>
                                                     <button class="btn btn-secondary" style="width: auto; padding: 5px 10px;" onclick="window.branchView.checkout('${c.id}')">退房</button>`
                                                    : ''}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载入住记录失败: ${error.message}</div>`;
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

    showAddRoomModal() {
        alert('添加房间功能：请通过API实现');
    }

    async disableRoom(roomId) {
        if (!confirm('确定要下架此房间吗？')) return;

        try {
            const response = await roomAPI.disableRoom(roomId);
            if (response.success) {
                alert('房间已下架');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    async enableRoom(roomId) {
        try {
            const response = await roomAPI.addRoom({ roomId, state: 'EMPTY' });
            if (response.success) {
                alert('房间已上架');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    showAddDisplayRoomModal() {
        alert('添加展示房间功能：请通过API实现');
    }

    async disableDisplayRoom(displayRoomId) {
        if (!confirm('确定要下架此展示房间吗？')) return;

        try {
            const response = await displayRoomAPI.disableDisplayRoom(displayRoomId);
            if (response.success) {
                alert('展示房间已下架');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    async enableDisplayRoom(displayRoomId) {
        try {
            const response = await displayRoomAPI.enableDisplayRoom(displayRoomId);
            if (response.success) {
                alert('展示房间已重新上架');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    async confirmReservation(reservationId) {
        try {
            const response = await reservationAPI.confirmReservation(reservationId);
            if (response.success) {
                alert('预约已确认');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    async rejectReservation(reservationId) {
        if (!confirm('确定要拒绝此预约吗？')) return;

        try {
            const response = await reservationAPI.cancelReservation(reservationId);
            if (response.success) {
                alert('预约已拒绝');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    showCheckInModal() {
        alert('办理入住功能：请通过API实现');
    }

    async addConsume(checkInId) {
        const amount = prompt('请输入消费金额:');
        if (!amount) return;

        const description = prompt('请输入消费说明:');
        if (!description) return;

        try {
            const response = await checkInAPI.addConsume(checkInId, parseFloat(amount), description);
            if (response.success) {
                alert('消费已添加');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    async checkout(checkInId) {
        if (!confirm('确定要为此入住办理退房吗？')) return;

        try {
            const response = await checkInAPI.checkout(checkInId);
            if (response.success) {
                alert('退房成功');
                await this.loadContent();
            } else {
                alert('操作失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('操作失败: ' + error.message);
        }
    }

    logout() {
        if (confirm('确定要退出登录吗？')) {
            authManager.logout();
            window.location.reload();
        }
    }
}

window.branchView = null;
export default BranchView;
