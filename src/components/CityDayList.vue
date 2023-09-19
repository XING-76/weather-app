<template>
    <div
        class="flex overflow-x-scroll scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent rounded-3xl bg-[#415d99]"
    >
        <div
            class="flex items-center text-gray-300 mb-2 p-4 transition-all delay-150"
            v-if="!isVisible"
        >
            <div class="w-3 h-3 mr-1"><ClockIcon /></div>
            <div>HOURLY FORECAST</div>
        </div>
        <CityDayItem :data="data" v-if="isVisible" />
    </div>
</template>

<script setup lang="ts">
import CityDayItem from '@/components/CityDayItem.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import { CityDayItemType } from '@/store/types';
import { toRefs, PropType } from 'vue';

export interface Props {
    isVisible: boolean;
    data: CityDayItemType[];
}

const props = defineProps({
    isVisible: { type: Boolean, required: true },
    data: { type: Array as PropType<Props['data']>, required: true },
});

const { isVisible, data } = toRefs(props);
</script>

<style scoped>
.scrollbar-container::-webkit-scrollbar-thumb {
    border-radius: 24px;
}
</style>
