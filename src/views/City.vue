<template lang="pug">
div(v-if='!isLoading')
    .w-12.h-12.text-white.cursor-pointer(@click='handleClickBack')
        BackIcon
    .sticky.top-0
        CityInformationBox(:isVisible='isVisible')
    .text-white.text-xs.p-6
        .sticky.top-24.mb-4
            CityDayList(:data='cityDayList', :isVisible='isVisible')
        .sticky.top-48.max-h-full.no-scrollbar.overflow-y-scroll
            CityForecastList(:city='city')
    LinkBack
loading(v-if='isLoading')
</template>

<script setup lang="ts">
import BackIcon from '@/components/icons/BackIcon.vue';
import LinkBack from '@/components/LinkBack.vue';
import Loading from '@/components/Loading.vue';
import CityInformationBox from '@/components/CityInformationBox.vue';
import CityDayList from '@/components/CityDayList.vue';
import CityForecastList from '@/components/CityForecastList.vue';
import { CityDayItemType } from '@/store/types';
import { initCityDayItem } from '@/store/data';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const handleClickBack = () => {
    router.push('/');
};

const route = useRoute();

const city = route.params.cityName as string;

const store = useMainStore();

const cityDayList = ref([initCityDayItem] as CityDayItemType[]);

onMounted(() => handleOnSearchDay());

const handleOnSearchDay = async () => {
    store.setLoading();

    try {
        const dayObj = { city: city, day: '10' };

        await store.handleSearchCurrent({ city: city, isList: false });

        store.handleSetWeatherHistoryRecordArray(city);

        await store.handleSearchDays(dayObj);

        cityDayList.value = (await store.handleSearchHour(
            city
        )) as Array<CityDayItemType>;
    } catch (err) {
        console.log(err);
    } finally {
        store.setLoading();
    }
};

const isVisible = ref(true);

const { forecastItemShow, isLoading } = storeToRefs(store);

const handleScroll = () => {
    isVisible.value =
        window.scrollY > 0 && Number(forecastItemShow.value) >= 3
            ? false
            : true;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
