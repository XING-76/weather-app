<template lang="pug">
.flex.justify-between.items-center.gap-4.text-base.mb-2.p-3(class='md:gap-0 md:text-xl md:p-6', v-for='(item, index) in items', :key='index')
    .basis-14.text-start {{ item.weekDay }}
    .w-10.h-10
        img(:src='item.icon', :alt='item.text')
        span.text-xs.text-sky-500(v-if='item.rainChance')
            | {{
            | item.rainChance
            | }}
    div {{ item.minTemperature }}°
    RangeInput(:min='min', :max='max', :minVal='item.minTemperature', :maxVal='item.maxTemperature')
    div {{ item.maxTemperature }}°
</template>

<script setup lang="ts">
import RangeInput from '@/components/RangeInput.vue';
import { CityForecastListType } from '@/store/types';
import { toRefs, PropType, computed } from 'vue';

export interface Props {
    data: CityForecastListType;
}

const props = defineProps({
    data: { type: Object as PropType<Props['data']>, required: true },
});

const { data } = toRefs(props);

const items = computed(() => data.value.data);
const max = computed(() => data.value.max);
const min = computed(() => data.value.min);
</script>
