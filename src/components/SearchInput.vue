<template lang="pug">
.mb-4
    input.bg-gray-50.text-gray-900.text-center.rounded-xl(type='text', class='placeholder:text-center w-3/4 p-2.5 focus:outline-none', placeholder='search city name', v-model='cityName', @keyup.enter='handleOnSearch(cityName)')
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store';

const router = useRouter();
const store = useMainStore();

const cityName = ref('');

const handleOnSearch = async (city: string) => {
    try {
        const response: string = await store.handleCheckErrorRoute(city);

        const isExists = response.length;

        if (isExists) {
            router.push({
                name: 'City',
                params: {
                    cityName: response,
                },
            });
        }

        if (!isExists) {
            alert('City not exist!');
        }
    } catch (err) {
        console.log(err);
    }
};
</script>
