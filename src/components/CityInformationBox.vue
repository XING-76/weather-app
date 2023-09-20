<template lang="pug">
.flex.flex-col.items-center.text-white.p-6
    .text-2xl.mb-2 {{ cityInformationItem.cityName }}
    div(v-if='!isVisible')
        .text-sm.mb-2
            | {{ cityInformationItem.temperature }} |
            | {{ cityInformationItem.description }}
    div(v-if='isVisible')
        .text-5xl.mb-2
            | {{ cityInformationItem.temperature }}
        .text-xs
            .mb-1 {{ cityInformationItem.description }}
            .flex.justify-center.gap-2
                span H:{{ cityInformationItem.maxTemperature }}
                span L:{{ cityInformationItem.minTemperature }}
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { cityInformationItem } = storeToRefs(store);

const props = defineProps({
    isVisible: { type: Boolean, required: true },
});

const { isVisible } = toRefs(props);
</script>
