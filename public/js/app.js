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
        console.log('渲染登录视图');
        if (!this.loginView) {
            this.loginView = new LoginView(this.container);
        }
        this.loginView.render();
    }

    renderUserView(user) {
        console.log('渲染用户视图, 用户类型:', user.type);
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
        console.log('渲染顾客视图');
        if (!this.customerView) {
            this.customerView = new CustomerView(this.container);
            window.customerView = this.customerView;
            console.log('customerView已设置到window');
        }
        this.customerView.render();
    }

    renderBranchView() {
        console.log('渲染分店视图');
        if (!this.branchView) {
            this.branchView = new BranchView(this.container);
            window.branchView = this.branchView;
            console.log('branchView已设置到window');
        }
        this.branchView.render();
    }

    renderHeadquarterView() {
        console.log('渲染总部视图');
        if (!this.headquarterView) {
            this.headquarterView = new HeadquarterView(this.container);
            window.headquarterView = this.headquarterView;
            console.log('headquarterView已设置到window');
        }
        this.headquarterView.render();
        console.log('headquarterView实例:', window.headquarterView);
    }

    logout() {
        authManager.logout();
        window.location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded事件触发');
    const app = new App();
    app.init();
});

// 添加全局函数用于调试
window.testHeadquarterView = function() {
    console.log('测试headquarterView:', window.headquarterView);
    if (window.headquarterView && typeof window.headquarterView.showAddBranchModal === 'function') {
        console.log('showAddBranchModal方法存在');
        window.headquarterView.showAddBranchModal();
    } else {
        console.log('showAddBranchModal方法不存在');
    }
};

export default App;