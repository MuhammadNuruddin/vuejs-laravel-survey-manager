
<template>
    <div class="max-w-lg mx-auto bg-white p-8 rounded-sm shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Sign up for free.</h1>
        <form class="mt-8 space-y-6" @submit="register">
          <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
            <div v-for="(field, i) in Object.keys(errors)" :key="i">
              <div v-for="(error, index) in errors[field] || []" :key="index">
                * {{ error }}
              </div>
            </div>
          </Alert>
            <div class="flex flex-col space-y-5">
                <label for="email">
                    <p class="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email" name="email" v-model="user.email" type="email" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Enter email address">
                </label>
                <label for="name">
                    <p class="font-medium text-slate-700 pb-2">Name</p>
                    <input id="name" name="name" v-model="user.name" type="text" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Your name">
                </label>
                <label for="password">
                    <p class="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" v-model="user.password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Enter your password">
                </label>
                <label for="password_confirmation">
                    <p class="font-medium text-slate-700 pb-2">Confirm Password</p>
                    <input id="password_confirmation" v-model="user.password_confirmation" name="password_confirmation" type="password" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Type password again">
                </label>
                <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required="required">
                </div>
                <div class="ml-3 text-sm">
                    <label for="remember" class="font-medium text-gray-900 dark:text-white">I accept the <a href="#" data-modal-target="terms_modal" data-modal-toggle="terms_modal" class="text-primary-700 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                </div>
                <!-- Main modal -->
<div id="terms_modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="terms_modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat laboriosam obcaecati, assumenda eveniet ipsam adipisci ducimus molestiae a nulla, illo atque facilis ex facere minus optio non magnam natus possimus excepturi, nobis odio. Cumque eveniet voluptatem quisquam, incidunt temporibus maxime.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eos nulla praesentium reiciendis quos dicta non quidem nihil molestiae, officia commodi quam voluptas aliquam impedit vitae sapiente iusto, optio accusantium, officiis omnis dolorem fugiat. Dolorum voluptatem debitis qui quibusdam cumque beatae doloremque. Vero, quam et.
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="terms_modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="terms_modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
        </div>
    </div>
</div>
            </div>
                <button :disabled="loading" :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-sm border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>

                      <span>Sign up</span>
                      <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
                </button>
                <p class="text-center">Already have an account? <router-link :to="{name: 'Login'}" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></router-link></p>
            </div>
        </form>
    </div>

  </template>
  
<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import store from '../store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Alert from '../components/Alert.vue';
const user = {
  'name': '',
  'email': '',
  'password': '',
  'password_confirmation': ''
}
const router = useRouter();
const errors = ref({});
const loading = ref(false);
function register(ev){
  ev.preventDefault();
  loading.value = true;
  store
  .dispatch('register', user)
  .then((res) => {
    loading.value = false;
    if(err.response.status === 201) {
    router.push({
      name: 'Dashboard'
    })
    }

  })
  .catch((err) => {
    loading.value = false;
    if(err.response.status === 422) {
      errors.value = err.response.data.errors
    }
  })
}
</script>