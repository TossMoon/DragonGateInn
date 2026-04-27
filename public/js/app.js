console.log('app.js开始加载');

import { authManager } from './auth/index.js';
import { LoginView, CustomerView, BranchView, HeadquarterView } from './views/index.js';

console.log('模块导入成功');

class App {
    constructor() {
        console.log('App构造函数开始');
        this.container = document.getElementById('app');
        console.log('container:', this.container);
        this.loginView = null;
        this.customerView = null;
        this.branchView = null;
        this.headquarterView = null;
    }

    init() {
        console.log('init方法开始');
        try {
            this.render();
            console.log('render完成');
        } catch (error) {
            console.error('初始化错误:', error);
            this.container.innerHTML = `<div class="message error">初始化错误: ${error.message}</div>`;
        }
    }

    render() {
        console.log('render方法开始');
        const user = authManager.getCurrentUser();
        console.log('当前用户:', user);

        if (!user) {
            this.renderLogin();
        } else {
            this.renderUserView(user);
        }
    }

    renderLogin() {
        if (!this.loginView) {
            this.loginView = new LoginView(this.container);
        }
        this.loginView.render();
    }

    renderUserView(user) {
        switch (user.type) {
            case 'customer':
                this.renderCustomerView();
                break;
            case 'branch':
                this.renderBranchView();
                break;
            case 'headquarter':
                this.renderHeadquarterView();
                break;
            default:
                this.renderLogin();
                break;
        }
    }

    renderCustomerView() {
        if (!this.customerView) {
            this.customerView = new CustomerView(this.container);
            window.customerView = this.customerView; // 保存到window对象
        }
        this.customerView.render();
    }

    renderBranchView() {
        if (!this.branchView) {
            this.branchView = new BranchView(this.container);
            window.branchView = this.branchView; // 保存到window对象
        }
        this.branchView.render();
    }

    renderHeadquarterView() {
        if (!this.headquarterView) {
            this.headquarterView = new HeadquarterView(this.container);
            window.headquarterView = this.headquarterView; // 保存到window对象
        }
        this.headquarterView.render();
    }

    logout() {
        authManager.logout();
        window.location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;