<template lang="pug">
.flex.flex-col.items-center.gap-3.p-4(v-for='(item, index) in data', :key='index')
    div {{ item.time }}
    .w-5.h-5
        img(:src='item.icon', :alt='item.text')
    div {{ item.temperature }}
</template>

<!-- <template>
    <div
        class="flex flex-col items-center gap-3 p-4"
        v-for="(item, index) in data"
        :key="index"
    >
        <div>{{ item.time }}</div>
        <div class="w-5 h-5">
            <img :src="item.icon" :alt="item.text" />
        </div>
        <div>{{ item.temperature }}</div>
    </div>
</template> -->

<script setup lang="ts">
import { CityDayItemType } from '@/store/types';
import { toRefs, PropType } from 'vue';

export interface Props {
    data: CityDayItemType[];
}

const props = defineProps({
    data: { type: Array as PropType<Props['data']>, required: true },
});

const { data } = toRefs(props);
</script>
