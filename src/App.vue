<template lang="pug">
.bg-gradient-to-b.mx-auto.text-center.font-bold(class='from-[#415d99] to-[#a3a9c1] md:my-6 md:w-[85%]')
    RouterView
#container
</template>

<!-- <template>
    <div
        class="bg-gradient-to-b from-[#415d99] to-[#a3a9c1] mx-auto md:my-6 md:w-[85%] text-center font-bold"
    >
        <RouterView />
    </div>
    <div id="container"></div>
</template> -->

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
