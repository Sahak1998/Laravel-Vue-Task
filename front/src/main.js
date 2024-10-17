import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '../store'
import VueTailwindDatepicker from "vue-tailwind-datepicker"
import router from './router'
import 'vue3-toastify/dist/index.css';

createApp(App).use(router).use(store).use(VueTailwindDatepicker).mount('#app')
