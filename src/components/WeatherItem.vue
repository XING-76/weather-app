<template lang="pug">
.flex.justify-between.rounded-3xl.text-base.p-6.bg-gradient-to-b.cursor-pointer(class='from-[#415d99] to-[#a3a9c1]', v-for='(item, index) in data', :key='index', @click='handleOnClick(item.cityName)')
    div
        .flex.flex-col.items-start.mb-6
            .text-xl {{ item.cityName }}
            time.text-xs {{ item.time }}
            .text-xs {{ item.description }}
    div
        .text-5xl.mb-6 {{ item.temperature }}
        .flex.gap-2.text-xs
            span H:{{ item.maxTemperature }}
            span L:{{ item.minTemperature }}
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CityInformation } from '@/store/types';
import { toRefs, PropType } from 'vue';
import { useMainStore } from '@/store';

const router = useRouter();

const store = useMainStore();

const handleOnClick = (city: string) => {
    store.handleSetWeatherHistoryRecordArray(city);

    router.push({
        name: 'City',
        params: {
            cityName: city,
        },
    });
};

export interface Props {
    data: CityInformation[];
}

const props = defineProps({
    data: { type: Array as PropType<Props['data']>, required: true },
});

const { data } = toRefs(props);
</script>
