<template>
    <div
    class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
    >
     <img :src="survey.image_url" alt="" class="w-full h-48 object-cover"> 
     <h4 class="mt-4 text-long font-bold">{{ survey.title }}</h4> 
     <div v-html="survey.description" class="overflow-hidden flex-1"></div> 
     <div class="flex justify-between items-center mt-3">
        <div class="flex justify-between items-center">
        <router-link :to="{name:'SurveyView', params:{id:survey.id}}"
        class="flex
        py-2
        px-4
        border border-transparent
        text-sm
        rounded-md
        text-white
        bg-blue-500
        hover:bg-blue-600
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        "
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

            Edit
        </router-link>
        <button :class="{'bg-blue-200':copied}" @click="copyLink" :data-url="`/view/survey/${survey.slug}`" type="button" class="copy_link relative overflow-hidden ml-5 bg-white py-2 px-3
            border border-blue-500 flex items-center rounded-md shadow-sm text-sm leading-4 font-medium
            text-gray hover:bg-blue-50
            ">
                        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            {{text}}
        </button>

        </div>
        <div class="flex items-center">
        <a :href="`/view/survey/${survey.slug}`"
        target="_blank"
         class="h-8 w-8 flex items-center justify-center 
         rounded-full border border-transparent
         text-sm text-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
         "
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>

        </a>
        <button v-if="survey.id"
        type="button"
        @click="emit('delete', survey)"
        class="h-8
        w-8
        flex
        justify-center
        items-center
        rounded-full
        border border-transparent
        text-small text-red-500
        focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        "
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-1 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>

        </button>
        </div>
     </div>
    </div>
</template>
<script setup>
import store from '../store';
import { ref } from 'vue';
const { survey } = defineProps({
    survey: Object
});
const app_path = store.state.app.name;
let copied = ref(false);
let text = ref('Copy link');
const emit = defineEmits(['delete']);
function copyLink(event) {
    text.value = 'Copy link';
    copied.value = false;
    let link = app_path + event.target.getAttribute('data-url');
    let copy = navigator.clipboard.writeText(link);
    if(copy){
        text.value = 'Copied';
        copied.value = true;
    }else {
        text.value = 'Copy link';
        copied.value = false;
    }
}
</script>