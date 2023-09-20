<template lang="pug">
.rounded-full.bg-blue-950.h-3.flex(class='w-[40%]')
    .h-3.grow(v-for='item in range', :key='item', :class='getClass(item)')
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const getClass = (num: number) => {
    if (num > minVal.value && num < maxVal.value) {
        return 'bg-cyan-500';
    }
    if (num === minVal.value) {
        return 'bg-cyan-500 rounded-l-full';
    }
    if (num === maxVal.value) {
        return 'bg-cyan-500 rounded-r-full';
    }
    return '';
};

const range = computed(() => {
    const numbers = [];
    for (let i = min.value; i <= max.value; i++) {
        numbers.push(i);
    }
    return numbers;
});

const props = defineProps({
    max: { type: Number, required: true },
    min: { type: Number, required: true },
    minVal: { type: Number, required: true },
    maxVal: { type: Number, required: true },
});

const { max, min, minVal, maxVal } = toRefs(props);
</script>
