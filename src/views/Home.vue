<template lang="pug">
div(v-if='!isLoading')
    .text-white.text-2xl.pt-16.pb-6.px-6 Weather Forecast
    SearchInput
    WeatherList
    LinkBack
Loading(v-if='isLoading')
</template>

<script setup lang="ts">
import LinkBack from '@/components/LinkBack.vue';
import Loading from '@/components/Loading.vue';
import SearchInput from '@/components/SearchInput.vue';
import WeatherList from '@/components/WeatherList.vue';
import { useMainStore } from '@/store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { isLoading, weatherHistoryRecordArray } = storeToRefs(store);

onMounted(() => handleOnSearchHistoryRecord());

const handleOnSearchHistoryRecord = async () => {
    store.setLoading();

    try {
        store.handleCheckIfExpired();

        const data = weatherHistoryRecordArray.value;

        await store.handleSetWeatherHistoryRecordList(data);
    } catch (err) {
        console.log(err);
    } finally {
        store.setLoading();
    }
};
</script>
