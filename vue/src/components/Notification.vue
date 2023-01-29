<template>
<div v-if="notification.show">
    <div class="h-screen w-screen py-32">
        <div class="z-20 fixed w-[300px] right-5 top-5 p-6 shadow">
            <div class="rounded-sm py-5 px-6 mb-3 text-base animate-fade-in-down text-white inline-flex items-center" role="alert" :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
            {{ notification.message }}
            </div>
    </div>
    </div>
</div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'; 

const store = useStore();
const notification = computed(() => store.state.notification)
</script>

<style scoped>
</style>