<template>
    <div class="flex flex-col items-center text-white p-6">
        <div class="text-2xl mb-2">{{ cityInformation.cityName }}</div>

        <div v-if="!isVisible">
            <div class="text-sm mb-2">
                {{ cityInformation.temperature }} |
                {{ cityInformation.description }}
            </div>
        </div>

        <div v-if="isVisible">
            <div class="text-5xl mb-2">{{ cityInformation.temperature }}</div>

            <div class="text-xs">
                <div class="mb-1">{{ cityInformation.description }}</div>
                <div class="flex justify-center gap-2">
                    <span>H:{{ cityInformation.maxTemperature }}</span>
                    <span>L:{{ cityInformation.minTemperature }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, reactive } from 'vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();

const { cityInformationItem } = storeToRefs(store);

const cityInformation = reactive(cityInformationItem);

const props = defineProps({
    isVisible: { type: Boolean, required: true },
});

const { isVisible } = toRefs(props);
</script>
