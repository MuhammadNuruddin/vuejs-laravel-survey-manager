<template>
    <div class="py-5 px-8">
        <div v-if="surveyLoading" class="flex justify-center items-center">
            <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <form @submit.prevent="submitSurvey" v-else class="container mx-auto">
            <div class="flex flex-col items-center bg-white border border-gray-200 rounded-sm md:flex-row">
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="survey.image_url" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ survey.title }}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="survey.description"></p>
                </div>
            </div>

            <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
                <div class="text-xl mb-3 font-semibold">
                    Thank you for completing this Survey.
                </div>
                <button type="button"
                class="inline-flex justify-center py-2 px-4 border
                border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 @click="submitAnotherResponse">
                Submit Another Response
                </button>
            </div>

            <div v-else>
                <hr class="my-3">
                <div v-for="(question, index) in survey.questions" :key="question.id">
                    <QuestionViewer v-model="answers[question.id]" :question="question" :index="index" />
                </div>

                <button type="submit" class="inline-flex justify-center py-2 px-4 border
                border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ">
                Submit
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import QuestionViewer from '../components/viewer/QuestionViewer.vue';

const route = useRoute();
const store = useStore();
const loading = computed(() => store.state.current_survey.loading);
const survey = computed(() => store.state.current_survey.data);
const surveyFinished = ref(false);
const answers = ref({});

store.dispatch('getSurveyBySlug', route.params.slug);

function submitSurvey() {
    // console.log(JSON.stringify(answers.value, undefined, 2));
    store.dispatch('saveSurveyAnswer', {
        surveyId: survey.value.id,
        answers: answers.value
    })
    .then((response) => {
        if(response.status === 201) {
            surveyFinished.value = true;
        }
    })
}

function submitAnotherResponse() {
    answers.value = {};
    surveyFinished.value = false;
}
</script>
<style scoped>
</style>