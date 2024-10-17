import apiClient from '../axios/axios.js';

export default {
    createUser(userData) {
        return apiClient.post('/users', userData);
    },
    listUsers() {
        return apiClient.get('/users');
    },
    async updateUser(userId, userData) {
        return apiClient.put(`/users/${userId}`, userData);
    },

    async deleteUser(userId) {
        return apiClient.delete(`/users/${userId}`);
    },
};
