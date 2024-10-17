import { createStore } from 'vuex';
import customerForm from './modules/customerForm';

const store = createStore({
    modules: {
        customerForm,
    },
});

export default store;
