import apiService from '../../src/services/api/apiService.js'
import {toast} from "vue3-toastify";

export default {
    namespaced: true,
    state: () => ({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        country: '',
        profession: '',
        yearsInProfession: '',
        error: null,
        loading: false,
    }),
    mutations: {
        SET_STEP_ONE(state, payload) {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
        },
        SET_STEP_TWO(state, payload) {
            state.dateOfBirth = payload.dateOfBirth;
        },
        SET_STEP_THREE(state, payload) {
            state.country = payload.country;
            state.profession = payload.profession;
            state.yearsInProfession = payload.yearsInProfession;
        },
        SET_LOADING(state, payload) {
            state.loading = payload;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
    },
    actions: {
        saveStepOne({ commit }, payload) {
            commit('SET_STEP_ONE', payload);
        },
        saveStepTwo({ commit }, payload) {
            commit('SET_STEP_TWO', payload);
        },
        saveStepThree({ commit }, payload) {
            commit('SET_STEP_THREE', payload);
        },
        async createUser({ commit }, payload) {
            try {
                commit('SET_LOADING', true);
                commit('SET_ERROR', null);
                const res = await apiService.createUser(payload);
                toast.success("User created successfully", {
                    autoClose: 1000,
                });
                return res;
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 1000,
                });
                commit('SET_ERROR', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async listUsers() {
            const res = await apiService.listUsers();
            return res.data.users;
        },

        async updateUser({ commit }, { userId, userData }) {
            try {
                commit('SET_LOADING', true);
                await apiService.updateUser(userId, userData);
                toast.success("User Updated successfully", {
                    autoClose: 1000,
                });
                return true;
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 1000,
                });
                commit('SET_ERROR', error.message);
                return false;
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async deleteUser({ commit }, { userId }) {
            try {
                commit('SET_LOADING', true);
                await apiService.deleteUser(userId);
                toast.success("User deleted successfully", {
                    autoClose: 1000,
                });
                return true;
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 1000,
                });
                commit('SET_ERROR', error.message);
                return false;
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
};
