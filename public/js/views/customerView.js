import { displayRoomAPI, reservationAPI, checkInAPI } from '../api/index.js';
import { authManager } from '../auth/index.js';
import { getReservationStatusClass, getReservationStatusText, canCancelReservation } from '../utils/reservationUtils.js';

class CustomerView {
    constructor(container) {
        this.container = container;
        this.currentSection = 'rooms';
    }

    async render() {
        const user = authManager.getCurrentUser();
        this.container.innerHTML = `
            <div class="header">
                <h1>顾客端 - 龙门客栈</h1>
                <p>欢迎, ${user.phone || user.id}</p>
                <button class="btn btn-secondary" style="margin-top: 10px; width: auto;" onclick="window.customerView.logout()">退出登录</button>
            </div>

            <div class="navigation">
                <ul>
                    <li><a href="#" data-section="rooms" class="${this.currentSection === 'rooms' ? 'active' : ''}">浏览房间</a></li>
                    <li><a href="#" data-section="reservations" class="${this.currentSection === 'reservations' ? 'active' : ''}">我的预约</a></li>
                    <li><a href="#" data-section="checkins" class="${this.currentSection === 'checkins' ? 'active' : ''}">入住记录</a></li>
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

    async renderRooms(container) {
        try {
            const displayRooms = await displayRoomAPI.getAllDisplayRooms();

            container.innerHTML = `
                <div class="stats">
                    <div class="stat-card">
                        <h3>${displayRooms.length}</h3>
                        <p>展示房间</p>
                    </div>
                </div>

                <h2 style="margin-bottom: 20px;">展示房间</h2>
                <div class="grid">
                    ${displayRooms.length === 0 ? '<p>暂无展示房间</p>' :
                        displayRooms.map(room => this.renderDisplayRoomCard(room)).join('')
                    }
                </div>
            `;

            this.bindRoomEvents();
        } catch (error) {
            container.innerHTML = `<div class="message error">加载房间失败: ${error.message}</div>`;
        }
    }

    renderDisplayRoomCard(room) {
        const isActive = room.activeState.activeBool;
        return `
            <div class="item-card">
                <h3>展示房间 - ${room.id}</h3>
                <p>分店: ${room.branchName}</p>
                <p><strong>面积:</strong> ${room.roomLayout?.areaReal || '-'} ㎡</p>
                <p><strong>窗户:</strong> ${room.roomLayout?.windowBool ? '有窗' : '无窗'}</p>
                <p><strong>床铺:</strong> ${room.roomLayout?.bedType ? (room.roomLayout.bedType.typeString || room.roomLayout.bedType) + ' x ' + (room.roomLayout.bedType.numInt || 1) : '-'}</p>
                <p class="price">¥${room.appraisePrice || room.priceReal || 0}</p>
                <span class="status ${isActive ? 'active' : 'inactive'}">
                    ${isActive ? '可预约' : '暂不可预约'}
                </span>
                <button class="btn" style="margin-top: 15px;"
                    onclick="window.customerView.reserveDisplayRoom('${room.id}', '${room.branchId}')"
                    ${!isActive ? 'disabled' : ''}>
                    预约
                </button>
            </div>
        `;
    }

    bindRoomEvents() {
        // 预留事件绑定
    }

    async renderReservations(container) {
        const user = authManager.getCurrentUser();
        try {
            const reservations = await reservationAPI.getReservationsByCustomer(user.id);

            container.innerHTML = `
                <h2 style="margin-bottom: 20px;">我的预约</h2>
                <div class="table-container">
                    ${reservations.length === 0 ? '<p>暂无预约记录</p>' : `
                        <table>
                            <thead>
                                <tr>
                                    <th>预约ID</th>
                                    <th>分店</th>
                                    <th>房间户型</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reservations.map(r => `
                                    <tr>
                                        <td>${r.reservationIdString}</td>
                                        <td>${r.branchName}</td>
                                        <td>
                                             <p><strong>面积:</strong> ${r.roomLayout?.areaReal || '-'} ㎡</p>
                                             <p><strong>窗户:</strong> ${r.roomLayout?.windowBool ? '有窗' : '无窗'}</p>
                                             <p><strong>床铺:</strong> ${r.roomLayout?.bedType ? (r.roomLayout.bedType.typeString || r.roomLayout.bedType) + ' x ' + (r.roomLayout.bedType.numInt || 1) : '-'}</p>
                                        </td>
                                        <td><span class="status ${getReservationStatusClass(r.state.state)}">${getReservationStatusText(r.state.state)}</span></td>
                                        <td>
                                            ${canCancelReservation(r.state.state) ?
                                                `<button class="btn btn-danger" style="width: auto; padding: 5px 10px;" onclick="window.customerView.cancelReservation('${r.reservationIdString}')">取消预约</button>`
                                                : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载预约记录失败: ${error.message}</div>`;
        }
    }

    async renderCheckIns(container) {
        const user = authManager.getCurrentUser();
        try {
            const checkins = await checkInAPI.getCheckInsByCustomer(user.id);

            container.innerHTML = `
                <h2 style="margin-bottom: 20px;">入住记录</h2>
                <div class="table-container">
                    ${checkins.length === 0 ? '<p>暂无入住记录</p>' : `
                        <table>
                            <thead>
                                <tr>
                                    <th>入住ID</th>
                                    <th>分店</th>
                                    <th>房间ID</th>
                                    <th>入住日期</th>
                                    <th>退房日期</th>
                                    <th>消费金额</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${checkins.map(c => `
                                    <tr>
                                        <td>${c.id}</td>
                                        <td>${c.branchId}</td>
                                        <td>${c.roomId}</td>
                                        <td>${c.checkInDate || c.startDate || '未指定'}</td>
                                        <td>${c.checkOutDate || c.endDate || '未退房'}</td>
                                        <td>¥${c.consumeNumber || c.consumeAmount || 0}</td>
                                        <td><span class="status ${c.checkOutDate || c.endDate ? 'inactive' : 'active'}">${c.checkOutDate || c.endDate ? '已退房' : '入住中'}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
            `;
        } catch (error) {
            container.innerHTML = `<div class="message error">加载入住记录失败: ${error.message}</div>`;
        }
    }

    async reserveDisplayRoom(displayRoomId, branchId) {
        try {
            const response = await reservationAPI.createReservation({
                customerId: authManager.getUserId(),
                branchId: branchId,
                displayRoomId: displayRoomId,
            });

            if (response.successBool) {
                this.showReservationSuccessModal(response.resultContent);
                await this.loadContent();
            } else {
                alert('预约失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('预约失败: ' + error.message);
        }
    }

    showReservationSuccessModal(reservation) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>预约成功</h3>
                    <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="padding: 20px; text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <span style="color: #666;">预约ID:</span>
                            <span style="font-weight: bold; margin-left: 10px;">${reservation.reservationIdString || 'N/A'}</span>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <span style="color: #666;">分店ID:</span>
                            <span style="font-weight: bold; margin-left: 10px;">${reservation.branchIdString || 'N/A'}</span>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <span style="color: #666;">展示房间ID:</span>
                            <span style="font-weight: bold; margin-left: 10px;">
                                <p><strong>面积:</strong> ${reservation.roomLayout?.areaReal || '-'} ㎡</p>
                                             <p><strong>窗户:</strong> ${reservation.roomLayout?.windowBool ? '有窗' : '无窗'}</p>
                                             <p><strong>床铺:</strong> ${reservation.roomLayout?.bedType ? (reservation.roomLayout.bedType.typeString || reservation.roomLayout.bedType) + ' x ' + (reservation.roomLayout.bedType.numInt || 1) : '-'}</p>
                            </span>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <span style="color: #666;">状态:</span>
                            <span style="font-weight: bold; margin-left: 10px; color: #28a745;">待确认</span>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <span style="color: #666;">预约时间:</span>
                            <span style="font-weight: bold; margin-left: 10px;">${reservation.createTime || new Date().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" onclick="this.closest('.modal-overlay').remove()">确定</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async cancelReservation(reservationId) {
        if (!confirm('确定要取消此预约吗？')) return;

        try {
            const response = await reservationAPI.cancelReservation({reservationId});

            if (response.successBool) {
                alert('取消预约成功！');
                await this.loadContent();
            } else {
                alert('取消预约失败: ' + (response.error || '未知错误'));
            }
        } catch (error) {
            alert('取消预约失败: ' + error.message);
        }
    }

    logout() {
        if (confirm('确定要退出登录吗？')) {
            authManager.logout();
            window.location.reload();
        }
    }
}

window.customerView = null;
export default CustomerView;
