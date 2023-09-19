<!-- <template lang="pug">
.text-2xl.p-6 Weather Forecast
LinkBack
</template> -->

<template>
    <div
        class="bg-gradient-to-b from-[#415d99] to-[#a3a9c1] mx-auto md:my-6 md:w-[85%] text-center font-bold"
    >
        <RouterView />
    </div>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
