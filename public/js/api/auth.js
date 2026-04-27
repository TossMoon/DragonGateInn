import apiClient from './client.js';

class AuthAPI {
    async loginBranch(branchId, password) {
        return apiClient.post('/login/branch', { branchId, password });
    }

    async loginCustomer(customerId, password) {
        return apiClient.post('/login/customer', { customerId, password });
    }

    async loginHeadquarter(headquarterId, password) {
        return apiClient.post('/login/headquarter', { headquarterId, password });
    }

    async registerBranch(branchData) {
        return apiClient.post('/register/branch', branchData);
    }

    async registerCustomer(customerData) {
        return apiClient.post('/register/customer', customerData);
    }

    async registerHeadquarter(headquarterData) {
        return apiClient.post('/register/headquarter', headquarterData);
    }
}

export default new AuthAPI();
