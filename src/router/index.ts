import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import City from '@/views/City.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/city/:cityName',
            name: 'City',
            component: City,
        },
    ],
    scrollBehavior() {
        window.scrollTo(0, 0);
    },
});

export default router;
