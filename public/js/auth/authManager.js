console.log('authManager模块开始加载');

const AUTH_STORAGE_KEY = 'dragon_gate_inn_user';

class AuthManager {
    constructor() {
        console.log('AuthManager构造函数开始');
        this.currentUser = this.loadFromStorage();
        console.log('当前用户从storage加载:', this.currentUser);
    }

    loadFromStorage() {
        console.log('loadFromStorage开始');
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            console.log('从storage获取的数据:', stored);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Failed to load user from storage:', e);
            return null;
        }
    }

    saveToStorage(user) {
        console.log('saveToStorage被调用, user:', user);
        try {
            if (user) {
                const userJson = JSON.stringify(user);
                console.log('保存到storage的JSON:', userJson);
                localStorage.setItem(AUTH_STORAGE_KEY, userJson);
            } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        } catch (e) {
            console.error('Failed to save user to storage:', e);
        }
    }

    login(userData) {
        console.log('authManager.login()被调用, userData:', userData);
        this.currentUser = userData;
        this.saveToStorage(userData);
        console.log('authManager.login()完成, this.currentUser:', this.currentUser);
    }

    logout() {
        this.currentUser = null;
        this.saveToStorage(null);
    }

    getCurrentUser() {
        console.log('getCurrentUser()被调用, 返回:', this.currentUser);
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getUserType() {
        return this.currentUser ? this.currentUser.type : null;
    }

    isCustomer() {
        return this.getUserType() === 'customer';
    }

    isBranch() {
        return this.getUserType() === 'branch';
    }

    isHeadquarter() {
        return this.getUserType() === 'headquarter';
    }

    getUserId() {
        return this.currentUser ? this.currentUser.id : null;
    }

    getBranchId() {
        return this.currentUser ? this.currentUser.branchId : null;
    }
}

export const authManager = new AuthManager();
export default authManager;