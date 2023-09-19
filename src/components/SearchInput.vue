<template>
    <div class="mb-4">
        <input
            type="text"
            class="bg-gray-50 text-gray-900 text-center placeholder:text-center rounded-xl w-3/4 p-2.5 focus:outline-none"
            placeholder="search city name"
            v-model="cityName"
            @keyup.enter="handleOnSearch(cityName)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiRequest from '@/service/apiRequest';

const router = useRouter();

const cityName = ref('');

const handleOnSearch = async (city: string) => {
    try {
        const response: any = await ApiRequest.searchExist(city);

        if (response.length) {
            const cityName = response[0].name;

            router.push({
                name: 'City',
                params: {
                    cityName: cityName,
                },
            });
        }

        if (!response.length) {
            alert('City not exist!');
        }
    } catch (err) {
        console.log(err);
    }
};
</script>
