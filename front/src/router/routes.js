export const routes = [
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'), // Use relative path
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/Home.vue'), // Use relative path
            },
            {
                path: '/customer-form',
                name: 'Customer Form',
                component: () => import('../views/CustomerForm.vue'), // Use relative path
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'), // Use relative path
    },
];
