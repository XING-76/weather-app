<template lang="pug">
.flex.flex-col.rounded-3xl.mb-2.p-6(class='bg-[#415d99]')
    .flex.items-center.justify-between.text-gray-300.mb-2
        .flex
            .w-3.h-3.mr-1
                CalendarIcon
            div 10-DAY FORECAST
        div
            select.text-center.text-white.bg-zinc-600.appearance-none.rounded.p-1(class='focus:outline-none', @change='handleOnChangeDays')
                option(value='', hidden) 天數(選單)
                option(v-for='index in 10', :value='index') {{ index }} 天
    hr.h-px.bg-gray-300.border-0.mb-2
    CityForecastItem(:data='forecastList')
</template>

<script setup lang="ts">
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import CityForecastItem from '@/components/CityForecastItem.vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { forecastList } = storeToRefs(store);

const handleOnChangeDays = async (e: Event) => {
    const day = (e.target as HTMLSelectElement).value;
    const dayObj = { city: city, day: day };

    store.handleSetDaysItemShow(day);
    await store.handleSearchDays(dayObj);
};

const props = defineProps({
    city: { type: String, required: true },
});

const { city } = props;
</script>
