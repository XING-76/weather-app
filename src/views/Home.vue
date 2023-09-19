<template>
    <div v-if="!isLoading">
        <div class="text-white text-2xl pt-16 pb-6 px-6">Weather Forecast</div>
        <SearchInput />
        <WeatherList />
        <LinkBack />
    </div>
    <Loading v-if="isLoading" />
</template>

<script setup lang="ts">
import LinkBack from '@/components/LinkBack.vue';
import Loading from '@/components/Loading.vue';
import SearchInput from '@/components/SearchInput.vue';
import WeatherList from '@/components/WeatherList.vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { isLoading } = storeToRefs(store);
</script>
