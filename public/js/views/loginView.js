import { authAPI } from '../api/index.js';
import { authManager } from '../auth/index.js';

console.log('loginView模块开始加载');

class LoginView {
    constructor(container) {
        console.log('LoginView构造函数开始, container:', container);
        this.container = container;
        this.currentTab = 'customer';
    }

    render() {
        console.log('LoginView render开始');
        try {
        this.container.innerHTML = `
            <div class="login-container">
                <div class="header" style="margin-bottom: 30px;">
                    <h1>龙门客栈</h1>
                    <p>酒店预定管理系统</p>
                </div>

                <div class="login-tabs">
                    <div class="login-tab ${this.currentTab === 'customer' ? 'active' : ''}" data-tab="customer">
                        顾客登录
                    </div>
                    <div class="login-tab ${this.currentTab === 'branch' ? 'active' : ''}" data-tab="branch">
                        分店登录
                    </div>
                    <div class="login-tab ${this.currentTab === 'headquarter' ? 'active' : ''}" data-tab="headquarter">
                        总部登录
                    </div>
                </div>

                <div id="login-form-container">
                    ${this.renderForm()}
                </div>

                <div id="message-container"></div>
            </div>
        `;

        this.bindEvents();
        } catch (error) {
            console.error('LoginView render错误:', error);
            this.container.innerHTML = `<div class="message error">渲染错误: ${error.message}</div>`;
        }
    }

    renderForm() {
        switch (this.currentTab) {
            case 'customer':
                return this.renderCustomerForm();
            case 'branch':
                return this.renderBranchForm();
            case 'headquarter':
                return this.renderHeadquarterForm();
            default:
                return '';
        }
    }

    renderCustomerForm() {
        return `
            <form id="login-form">
                <div class="form-group">
                    <label for="customerId">手机号</label>
                    <input type="text" id="customerId" name="customerId" required placeholder="请输入手机号">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" required placeholder="请输入密码">
                </div>
                <button type="submit" class="btn">登录</button>
                <p style="text-align: center; margin-top: 20px;">
                    还没有账号? <a href="#" id="register-link">立即注册</a>
                </p>
            </form>
        `;
    }

    renderBranchForm() {
        return `
            <form id="login-form">
                <div class="form-group">
                    <label for="branchId">分店ID</label>
                    <input type="text" id="branchId" name="branchId" required placeholder="请输入分店ID">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" required placeholder="请输入密码">
                </div>
                <button type="submit" class="btn">登录</button>
            </form>
        `;
    }

    renderHeadquarterForm() {
        return `
            <form id="login-form">
                <div class="form-group">
                    <label for="headquarterId">总部ID</label>
                    <input type="text" id="headquarterId" name="headquarterId" required placeholder="请输入总部ID">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" required placeholder="请输入密码">
                </div>
                <button type="submit" class="btn">登录</button>
            </form>
        `;
    }

    renderRegisterForm() {
        return `
            <form id="register-form">
                <div class="form-group">
                    <label for="phone">手机号</label>
                    <input type="text" id="phone" name="phone" required placeholder="请输入手机号">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" required placeholder="请输入密码">
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认密码</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="请确认密码">
                </div>
                <button type="submit" class="btn">注册</button>
                <p style="text-align: center; margin-top: 20px;">
                    已有账号? <a href="#" id="login-link">立即登录</a>
                </p>
            </form>
        `;
    }

    bindEvents() {
        const tabs = this.container.querySelectorAll('.login-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.currentTab = e.target.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('login-form-container').innerHTML = this.renderForm();
                this.bindFormEvents();
            });
        });

        this.bindFormEvents();
    }

    bindFormEvents() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const registerLink = document.getElementById('register-link');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('login-form-container').innerHTML = this.renderRegisterForm();
                this.bindRegisterEvents();
            });
        }

        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('login-form-container').innerHTML = this.renderForm();
                this.bindFormEvents();
            });
        }
    }

    bindRegisterEvents() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        this.showMessage('', '');

        try {
            let response;
            switch (this.currentTab) {
                case 'customer':
                    response = await authAPI.loginCustomer(data.customerId, data.password);
                    break;
                case 'branch':
                    response = await authAPI.loginBranch(data.branchId, data.password);
                    break;
                case 'headquarter':
                    response = await authAPI.loginHeadquarter(data.headquarterId, data.password);
                    break;
            }

            if (response.successBool === true) {
                authManager.login({
                    type: this.currentTab,
                    id: data.customerId || data.branchId || data.headquarterId,
                    branchId: response.branchId,
                    ...response
                });

                this.showMessage('登录成功！正在跳转...', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                this.showMessage(response.error || response.message, 'error');
            }
        } catch (error) {
            this.showMessage(error.message || '登录失败，请稍后重试', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showMessage('两次输入的密码不一致', 'error');
            return;
        }

        this.showMessage('', '');

        try {
            const response = await authAPI.registerCustomer({
                phone: data.phone,
                password: data.password
            });

            if (response.success) {
                this.showMessage('注册成功！请登录', 'success');
                setTimeout(() => {
                    this.currentTab = 'customer';
                    document.querySelector('.login-tab[data-tab="customer"]').click();
                }, 1000);
            } else {
                this.showMessage(response.error || '注册失败', 'error');
            }
        } catch (error) {
            this.showMessage(error.message || '注册失败，请稍后重试', 'error');
        }
    }

    showMessage(message, type) {
        const container = document.getElementById('message-container');
        if (container) {
            container.innerHTML = message ? `<div class="message ${type}">${message}</div>` : '';
        }
    }
}

export default LoginView;
