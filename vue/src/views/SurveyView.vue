<template>
<PageComponent>
<template v-slot:header>
    <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ route.params.id ? model.title : 'Create a Survey' }}
        </h1>
        <button v-if="route.params.id"
        @click="deleteSurvey()"
         type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-6 py-3 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition duration-150 ease-in-out">

         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-1 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
         Delete Survey</button>

    </div>
</template>
<div v-if="surveyLoading" class="flex justify-center items-center">
    <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
</div>

<form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down" enctype="multipart/form-data">
<div class="shadow sm:rounded-md sm-overflow-hidden">
    <!-- survey fields -->
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
    <!-- image -->
    <div>
        <label for="" class="block text-sm font-medium text-gray-700">
            Image
        </label>
        <div class="mt-1 flex items-center">
            <img v-if="model.image_url" 
            :src="model.image_url" 
            class="w-64 h-48 object-cover"
            alt="model.title">
            <span v-else class="flex
            items-center justify-center
            w-12 h-12 rounded-full 0verflow-hidden bg-gray-100
            ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
</svg>


            </span>
            <button type="button" class="
            relative overflow-hidden ml-5 bg-white py-2 px-3
            border border-blue-500 flex items-center rounded-md shadow-sm text-sm leading-4 font-medium
            text-gray hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500
            ">
            <input type="file" @change="onImageChoose" class="
            absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer
            ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
</svg>

                Change
            </button>
        </div>
    </div>
    <!-- / image -->

    <!-- title -->
    <div>
        <label for="title" class="text-sm block font-medium text-gray-700">Title</label>
        <input type="text"
        id="title"
        name="title"
        v-model="model.title"
        autocomplete="survey_title"
         class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
    <!-- / title -->

    <!-- description -->
    <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
            Description
        </label>
        <div class="mt-1">
            <textarea name="description"
            autocomplete="survey_description"
            v-model="model.description"
            placeholder="Describe your survey..."
            class="shadow-sm focus:ring-indigo-500 focus:border-500
            mt-1 w-full block sm:text-sm border border-gray-300 rounded-md
            "
             id="description" rows="3">

            </textarea>
        </div>
    </div>
    <!-- / description -->

    <!-- expire date -->
    <div>
        <label for="expire_date" class="text-sm block font-medium text-gray-700">Expire Date</label>
        <input type="date"
        id="expire_date"
        name="expire_date"
        v-model="model.expire_date"
        autocomplete="survey_expire_date"
         class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
    
    <!-- / expire date -->

    <!-- status -->
    <div class="flex items-start">
        <div class="flex items-center h-5">
            <input type="checkbox" name="status"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
             v-model="model.status" id="status">
        </div>
        <div class="ml-3 text-sm">
            <label for="status" class="text-sm block font-medium text-gray-700">Active</label>
        </div>
    </div>
    <!-- / status -->
    </div>
    <!-- / survey fields -->
    <div class="px-4 py-5 bg-white space=y-6 sm:p-6">
        <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions

            <!-- add questions button -->
            <button type="button" @click="addQuestion()" class="
            flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600
            hover:bg-gray-700
            ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            Add Question</button>
            <!-- / add question button -->
        </h3>
        <!-- check for question existence first -->
        <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions set for this survey.
        </div>
        <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor :question="question"
            @change="questionChange"
            @addQuestion="addQuestion"
            @deleteQuestion="deleteQuestion"
             :index="index" />
        </div>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button type="submit" class="inline-flex items-center justify-center py-2 px-4 border border-transparent
        shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600
        focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2
        ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>

            Save
        </button>
    </div>
</div>
</form>
</PageComponent>
</template>
<script setup>
import PageComponent from '../components/PageComponent.vue';
import QuestionEditor from '../components/editor/QuestionEditor.vue';
import { ref, watch, computed, inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import { useRoute, useRouter } from 'vue-router';

const surveyLoading = computed(() => store.state.current_survey.loading);
const Swal = inject('$swal');
const route = useRoute();
const router = useRouter();
const errors = ref({});
let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    image_url: null,
    expire_date: null,
    questions: [],
});

// watch for current survey data change and update as the local one as well
watch(
    () => store.state.current_survey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== 'draft',
        };
    }
);

if(route.params.id) {
    store.dispatch('getSurvey', route.params.id);
}

function onImageChoose(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        // file to send for validation
        model.value.image = reader.result;

        // field to display image
        model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: 'text',
        question: '',
        description: null,
        data: {}
    }

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
    model.value.questions = model.value.questions.map((q) => {
        if(q.id == question.id) {
            return JSON.parse(JSON.stringify(question));
        }
        return q;
    });
}

// save survey function
function saveSurvey() {
    store.dispatch('saveSurvey', model.value)
    .then(({data}) => {
        // store.commit('notify', {
        //         type: 'success',
        //         message: 'Survey Action Successful!'
        //     });
        Swal.fire(
        'Done!',
        'Survey Action Successful',
        'success'
        )
        router.push({
            name: 'SurveyView',
            params: {id: data.data.id}
        });
    })
    .catch((err) => {
        if(err.response.status === 422) {
            let error_text = '';
        if(err.response.data.errors) {
            for (const key in err.response.data.errors) {
            error_text+= `<p>${err.response.data.errors[key]}</p>`;
            }
            Swal.fire({
            icon: 'error',
            title: 'Request Error',
            html: error_text,
            })
            errors.value = err.response.data.errors;
        }else {
            errors.value = err.response.data;
        }
        
    }        
    })

}

// delete survey
function deleteSurvey() {
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
            store.dispatch('deleteSurvey', model.value.id)
        });
    Swal.fire('Deleted!', '', 'success')
    router.push({
                name: 'Survey'
            })
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
});
    // if(confirm('Sure to delete survey? You cannot undo this action')) {
    //     store.dispatch('deleteSurvey', model.value.id)
    //     .then(() => {
    //         store.commit('notify', {
    //             type: 'error',
    //             message: 'Survey Deleted Successfully!'
    //         });
    //         router.push({
    //             name: 'Survey'
    //         })
    //     })
    // }
}
</script>
<style scoped></style>