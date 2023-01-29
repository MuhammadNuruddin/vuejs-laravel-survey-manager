<template>
<PageComponent>
<template v-slot:header>
    <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys</h1>
    <router-link
    :to="{name: 'SurveyCreate'}"
    class="py-2 px-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" class="w-4 h-4 -mt-1 inline-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

    Add New Survey</router-link>
</div>
</template>
<!-- loading spinner -->
<div v-if="surveys.loading" class="flex justify-center items-center">
    <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
</div>
<div v-else-if="!surveys.data.length">
    <div class="h-20 bg-gray-400 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">You have no survey, please create some.</p>
      </div>
</div>
<!-- / loading spinner -->
<div v-else>
<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
<SurveyListItem v-for="(survey, index) in surveys.data"
    :key="survey.id" :survey="survey"
    class="opacity-0 animate-fade-in-down"
    :style="{animationDelay: `${index * 0.1}s`}"
     @delete="deleteSurvey(survey)" />
</div>

<div class="flex justify-center mt-5">
<nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm" aria-label="Pagination">
<a v-for="(link, i) in surveys.links"
 v-html="link.label"
 @click="getForPage($event,link)" aria-current="page" 
 class="relative inline-flex items-center px-4 
 py-2 border text-sm font-medium whitespace-no-wrap"
 :class="[
    link.active ?
    'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' :
    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
    i === 0 ? 'rounded-l-md' : '',
    i === surveys.links.length - 1 ? 'rounded-r-md' : '',
 ]"
 :key="i" :disabled="!link.url" href="#"></a>
</nav>
</div>

</div>
</PageComponent>
</template>
  
<script setup>
import store from '../store';
import { computed, inject } from 'vue';
import PageComponent from '../components/PageComponent.vue';
import SurveyListItem from '../components/SurveyListItem.vue';

const surveys = computed(() => store.state.surveys);
const Swal = inject('$swal');
store.dispatch('getSurveys');
function deleteSurvey(survey) {
    Swal.fire({
  title: 'Do you want to delete the selected survey?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Yes',
  denyButtonText: `Don't delete`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    store.dispatch('deleteSurvey', survey.id)
        .then(() => {
            store.dispatch('getSurveys');
        });
    Swal.fire('Deleted!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
});
}

function getForPage(ev,link) {
    ev.preventDefault();
    if(!link.url || link.active) {
        return;
    }

    store.dispatch('getSurveys', { url: link.url });
}


</script>