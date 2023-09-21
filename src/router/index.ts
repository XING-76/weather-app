import { createRouter, createWebHistory } from 'vue-router';
import ApiRequest from '@/service/apiRequest';
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
            async beforeEnter(to) {
                const cityName = to.params.cityName as string;

                try {
                    const response: any = await ApiRequest.searchExist(
                        cityName
                    );

                    const isExists = response.length;

                    if (!isExists) {
                        return { name: 'Home' };
                    }
                } catch (err) {
                    console.log(err);
                    return { name: 'Home' };
                }
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            redirect: () => '/',
        },
    ],
    scrollBehavior() {
        window.scrollTo(0, 0);
    },
});

export default router;
