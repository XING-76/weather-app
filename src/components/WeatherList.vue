<template lang="pug">
.bg-slate-950.text-white.flex.flex-col.gap-4.py-4.px-6.mb-20.no-scrollbar.overflow-y-scroll.shadow-xl(class='min-h-[300px]', :class="!weatherHistoryRecordList.length ? 'justify-center' : ''")
    .text-xl(v-show='!weatherHistoryRecordList.length')
        | No history...
    WeatherItem(:data='weatherHistoryRecordList')
</template>

<script setup lang="ts">
import WeatherItem from '@/components/WeatherItem.vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { weatherHistoryRecordList } = storeToRefs(store);
</script>
