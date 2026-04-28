import apiClient from './client.js';

class RoomAPI {
    async getAllRooms() {
        return apiClient.get('/rooms');
    }

    async getRoomsByBranch(branchId) {
        return apiClient.get(`/rooms/branch/${branchId}`);
    }

    async addRoom(roomData) {
        return apiClient.post('/rooms/add', roomData);
    }

    async disableRoom(roomId) {
        return apiClient.post('/rooms/disable', { roomId });
    }

    async changePrice(priceData) {
        return apiClient.post('/rooms/change-price', priceData);
    }
}

class DisplayRoomAPI {
    async getAllDisplayRooms() {
        return apiClient.get('/display-rooms');
    }

    async getDisplayRoomsByBranch(branchId) {
        return apiClient.get(`/display-rooms/branch/${branchId}`);
    }

    async addDisplayRoom(displayRoomData) {
        return apiClient.post('/display-rooms/add', displayRoomData);
    }

    async disableDisplayRoom(displayRoomId) {
        return apiClient.post('/display-rooms/disable', { displayRoomId });
    }

    async enableDisplayRoom(displayRoomId) {
        return apiClient.post('/display-rooms/enable', { displayRoomId });
    }
}

class ReservationAPI {
    async getAllReservations() {
        return apiClient.get('/reservations');
    }

    async getReservationsByCustomer(customerId) {
        return apiClient.get(`/reservations/customer/${customerId}`);
    }

    async getReservationsByBranch(branchId) {
        return apiClient.get(`/reservations/branch/${branchId}`);
    }

    async createReservation(reservationData) {
        return apiClient.post('/reservations/create', reservationData);
    }

    async cancelReservation(reservationId) {
        return apiClient.post('/reservations/cancel', { reservationId });
    }

    async confirmReservation(reservationId) {
        return apiClient.post('/reservations/confirm', { reservationId });
    }
}

class CheckInAPI {
    async getAllCheckIns() {
        return apiClient.get('/checkins');
    }

    async getCheckInsByBranch(branchId) {
        return apiClient.get(`/checkins/branch/${branchId}`);
    }

    async getCheckInsByCustomer(customerId) {
        return apiClient.get(`/checkins/customer/${customerId}`);
    }

    async createCheckIn(checkInData) {
        return apiClient.post('/checkins/create', checkInData);
    }

    async checkout(checkInId) {
        return apiClient.post('/checkins/checkout', { checkInId });
    }

    async addConsume(checkInId, amount, description) {
        return apiClient.post('/checkins/add-consume', { checkInId, amount, description });
    }
}

class BranchAPI {
    async getAllBranches() {
        return apiClient.get('/branches');
    }

    async getBranchById(branchId) {
        return apiClient.get(`/branches/${branchId}`);
    }

    async updateBranch(branchId, branchData) {
        return apiClient.post(`/branches/update/${branchId}`, branchData);
    }

    async deleteBranch(branchId) {
        return apiClient.post('/branches/delete', { branchId });
    }
}

export const roomAPI = new RoomAPI();
export const displayRoomAPI = new DisplayRoomAPI();
export const reservationAPI = new ReservationAPI();
export const checkInAPI = new CheckInAPI();
export const branchAPI = new BranchAPI();
