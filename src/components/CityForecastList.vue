<template>
    <div class="flex flex-col rounded-3xl bg-[#415d99] mb-2 p-6">
        <div class="flex items-center justify-between text-gray-300 mb-2">
            <div class="flex">
                <div class="w-3 h-3 mr-1"><CalendarIcon /></div>
                <div>10-DAY FORECAST</div>
            </div>

            <div>
                <select
                    class="text-center text-white bg-zinc-600 focus:outline-none appearance-none rounded p-1"
                    @change="handleOnChangeDays"
                >
                    <option value="" hidden>天數(選單)</option>
                    <option v-for="index in 10" :value="index">
                        {{ index }} 天
                    </option>
                </select>
            </div>
        </div>

        <hr class="h-px bg-gray-300 border-0 mb-2" />

        <CityForecastItem :data="forecastList" />
    </div>
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
