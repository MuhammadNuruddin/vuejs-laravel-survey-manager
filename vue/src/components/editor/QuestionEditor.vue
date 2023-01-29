<template>
<!-- question wrapper -->
<div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
        {{ index + 1 }}. {{ model.question }}
    </h3>

    <div class="mt-1 flex items-center">
        <!-- add new question -->
        <button @click="addQuestion()"
        type="button"
        class="flex
        items-center
        test-xs py-1 px-2 mr-2 
        rounded-sm text-white bg-gray-600 hover:bg-gray-700
        "
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
    </button>
        <!-- / add new question -->

        <!-- delete question -->
        <button type="button" @click="deleteQuestion()" class="flex
        items-center py-1 px-3 rounded rounded-sm border border-transparent
        text-red-500 hover:text-red-600
        ">
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>

        </button>
        <!-- / delete question -->
    </div>
</div>
<!-- / question wrapper -->

<div class="grid gap-3 grid-cols-12">
<!-- question -->
<div class="mt-3 col-span-9">
    <span class="text-sm block font-medium text-gray-700" :for="'question_text_' + model.data">
        Question Text
    </span>
    <input type="text" :name="'question_text_' + model.data"
    v-model="model.question" 
    :id="'question_text' + model.data"
    @change="dataChange"
    class="mt-1 
    focus:ring-indigo-500 focus:border-indigo-500
    block w-full shadow-sm sm:text-sm border-gray-300 rounded-md
    "
    >
</div>
<!-- / question -->

<!-- question type -->
<div class="mt-3 col-span-3">
    <label for="question_type" class="block text-sm font-medium text-gray-700">Select Question Type</label>
    <select name="question_type" id="question_type" 
    @change="typeChange"
    class="
    mt-1 block w-full py-2 px-3 border border-gray-300 
    bg-white rounded-md shadow-sm focus:outline-none focus:indigo-500 
    focus:border-indigo-500 sm:text-sm
    "
    v-model="model.type">
    <option v-for="question_type in questionTypes" :key="question_type" :value="question_type">
    {{ upperCaseFirst(question_type) }}
    </option>
    </select>
</div>
<!-- / question type -->
</div>

<!-- question description -->
<div class="mt-3 col-span-9">
    <label 
    class="block text-sm font-medium text-gray-700"
     :for="'question_description_' + model.id">Description</label>
     <textarea
     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 
     block w-full sm:text-smn shadow-sm border-gray-300 rounded-md
     "
     v-model="model.description"
     @change="dataChange"
     :id="'question_description_' + model.id"
      :name="'question_description_' + model.id"></textarea>
</div>
<!-- / question description -->

<!-- question data -->
<div>
    <div v-if="shouldHaveOptions()" class="mt-2">
        <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
            Options
            <!-- add new option -->
            <button type="button" 
            class="
            flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700
            "
             @click="addOption()">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
             Add Option
            </button>
            <!-- / add new option -->
        </h4>
        <div v-if="!model.data.options.length" class="text-xs text-gray-600 py-3 text-center">
            You don't have any option defined
        </div>
        <!-- option list -->
        <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
            <span class="w-6 font-sm">{{ index + 1 }}.</span>
            <input type="text" v-model="option.text"
            class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
             @change="dataChange">

            <!-- delete option -->
            <button type="button"
            class="w-6 h-6 rounded-full
            border border-transparent 
            transition-colors hover:border-red-100
             flex items-center justify-center"
             @click="removeOption(option)">

             <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
            </button>
            <!-- / delete option -->
        </div>
        <!-- / option list -->
    </div>
</div>
<!-- / question data -->

<hr class="my-4">
</template>
<script setup>
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

const props = defineProps({
question: Object,
index: Number
});

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

// recreate whole model to avoid reference issue
const model = ref(JSON.parse(JSON.stringify(props.question)));

// get question types
const questionTypes = computed(() => store.state.questionTypes);

// functons
function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// check if the questions should have options - ['checkbox', 'radio', 'select']
function shouldHaveOptions() {
    return ['select', 'radio', 'checkbox'].includes(model.value.type);
}

function getOptions() {
    return model.value.data.options;
}

function setOptions(options) {
    model.value.data.options = options
}

// add option
function addOption() {
    setOptions([
    ...getOptions(),
    {'uuid': uuidv4(), 'text': ''},
    ]);
    dataChange();
}

// remove option
function removeOption(op) {
    setOptions(getOptions().filter((opt) => opt !== op));
    dataChange();
}

function typeChange() {
    if(shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

// emit data change
function dataChange() {
    const data = JSON.parse(JSON.stringify(model.value));
    if(!shouldHaveOptions()){
        delete data.data.options;
    }

    emit('change', data);
}

function addQuestion() {
    emit('addQuestion', props.index + 1);
}

function deleteQuestion() {
    emit('deleteQuestion', props.question);
}
</script>
<style scoped></style>