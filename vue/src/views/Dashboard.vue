<template>
    <PageComponent title="Dashboard">
      <div v-if="loading" class="flex justify-center items-center">
            <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

<!-- wrapper -->
<div v-else-if="!data.totalSurveys && !data.totalAnswers && !data.latestSurvey">
  <div class="h-20 bg-gray-400 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">You have no survey data, please create some.</p>
        <router-link
    :to="{name: 'SurveyCreate'}"
    class="py-2 px-3 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" class="w-4 h-4 -mt-1 inline-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

    Add New Survey</router-link>
      </div>
</div>
<div class="container mx-auto" v-else> 
<!---===================== FIRST ROW CONTAINING THE  STATS CARD STARTS HERE =============================-->
<div class="container flex justify-center bg-gray-100 py-10 p-14">
    <!---== First Stats Container ====--->
  <div class="container mx-auto pr-4">
    <div class="bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div class="h-20 bg-red-400 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">SURVEYS</p>
      </div>
      <div class="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p class="py-4 text-3xl ml-5">{{data.totalSurveys}}</p>
      <!-- <hr > -->
    </div>
  </div>
      <!---== First Stats Container ====--->

    <!---== Second Stats Container ====--->
  <div class="container mx-auto pr-4">
    <div class="bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div class="h-20 bg-blue-500 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">ANSWERS</p>
      </div>
      <div class="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p class="py-4 text-3xl ml-5">{{data.totalAnswers}}</p>
      <!-- <hr > -->
    </div>
  </div>
    <!---== Second Stats Container ====--->

  <!---== Third Stats Container ====--->
  <div class="container mx-auto pr-4">
    <div class="bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div class="h-20 bg-purple-900 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">LOREM</p>
      </div>
      <div class="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p class="py-4 text-3xl ml-5">11,240</p>
      <!-- <hr > -->
    </div>
  </div>
  <!---== Third Stats Container ====--->

  <!---== Fourth Stats Container ====--->
  <div class="container mx-auto">
    <div class="bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div class="h-20 bg-purple-900 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">IPSUM</p>
      </div>
      <div class="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p class="py-4 text-3xl ml-5">80</p>
      <!-- <hr > -->
    </div>
  </div>
  <!---== Fourth Stats Container ====--->
</div>
<!---===================== FIRST ROW CONTAINING THE  STATS CARD ENDS HERE =============================-->

<!------===================== SECOND ROW CONTAINING THE TABLE STATS STARTS HERE =============================-->
<div class="flex justify-center bg-gray-100">
  <!--==== frist div begins here ====--->
  <div class="container mr-5 ml-2 mx-auto bg-white shadow-xl">
    <div class="w-11/12 mx-auto">
      <div class="h-20 my-2 bg-purple-900 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">LATEST SURVEY</p>
      </div>
      <div class="bg-white my-2">
        <img :src="data.latestSurvey.image_url" class="w-full mx-auto" alt="">
          <h3 class="font-bold text-xs my-1">{{ data.latestSurvey.title }}</h3>
          <div class="flex justify-between text-sm mb-1">
            <div>
              Create Date:
            </div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
        
          <div class="flex justify-between text-sm mb-1">
            <div>
              Expire Date:
            </div>
            <div>{{ data.latestSurvey.expire_date }}</div>
          </div>

          <div class="flex justify-between text-sm mb-1">
            <div>
              Answers:
            </div>
            <div>{{ data.latestSurvey.answers }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>
              Questions:
            </div>
            <div>{{ data.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>
              Status:
            </div>
            <div>{{ data.latestSurvey.status ? 'Active' : 'Draft' }}</div>
          </div>
          <div class="flex justify-between mt-2">
            <router-link :to="{name: 'SurveyView', params:{id:data.latestSurvey.id}}" 
            class="flex
        py-2
        px-4
        border border-transparent
        text-sm
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
              Edit Survey
            </router-link>
            <button
        type="button"
        class="flex
        py-2
        px-4
        border border-transparent
        text-sm
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        "
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        View Answers
        </button>
          </div>
      </div>
      </div>
        </div>
    <!--==== frist div ends here ====--->

    <!--==== Second div begins here ====--->
    <div class="container mr-5 mx-auto bg-white shadow-xl">
      <div class="w-11/12 mx-auto">
      <div class="h-20 my-2 bg-gray-600 flex items-center justify-between">
        <p class="mr-0 text-white text-lg pl-5">LATEST ANSWERS</p>
        <a href="javascript:void(0)" class="text-sm py-2
        px-4
        border border-transparent
        text-sm
        rounded-md
        text-white
        bg-gray-700
        hover:bg-gray-800
        focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 mr-2">View All</a>
      </div>
      <ol class="relative border-l border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ml-6" v-for="answer in data.latestAnswers" :key="answer.id">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ answer.survey.title }} <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Answer made at:</span></h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ answer.end_date }}</time>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">See More...</p>
    </li>
</ol>

      </div>
          </div>
      <!--==== Second div ends here ====--->
    </div>
<!---------===================== SECOND ROW CONTAINING THE TABLE STATS ENDS HERE =============================-->
</div>
<!-- / wrapper -->
    </PageComponent>
  </template>
  
  <script setup>
  import PageComponent from '../components/PageComponent.vue';
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  const store = useStore();
  const loading = computed(() => store.state.dashboard.loading);
  const data = computed(() => store.state.dashboard.data);

  store.dispatch('getDashboardData')
  </script>
  <style scoped></style>