
<template>    
  <div class="max-w-lg mx-auto mt-10 bg-white p-8 rounded-sm shadow shadow-slate-300">
      <h1 class="text-4xl font-medium">Sign in now.</h1>
      <form action="" class="mt-8 space-y-6" @submit="login">
        <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
            <div v-if="!('error' in errors)">
                <div v-for="(field, i) in Object.keys(errors)" :key="i">
              <div v-for="(error, index) in errors[field] || []" :key="index">
                * {{ error }}
              </div>
            </div>
            </div>
            <div v-else>
                * {{ errors.error }}
            </div>

          </Alert>
          <div class="flex flex-col space-y-5">
              <label for="email">
                  <p class="font-medium text-slate-700 pb-2">Email address</p>
                  <input id="email" name="email" v-model="user.email" type="email" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Enter email address">
              </label>
              <label for="password">
                  <p class="font-medium text-slate-700 pb-2">Password</p>
                  <input id="password" v-model="user.password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Enter your password">
              </label>
              <div class="flex flex-row justify-between">
                  <div>
                      <label for="remember" class="">
                          <input type="checkbox" v-model="user.remember" id="remember" class="w-4 h-4 border-slate-200 focus:bg-indigo-600">
                          Remember me
                      </label>
                  </div>
                  <div>
                      <router-link :to="{name: 'ForgotPassword'}" class="font-medium text-indigo-600">Forgot Password?</router-link>
                  </div>
              </div>
              <button :disabled="loading" :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-sm border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
              </button>
              <p class="text-center">Not registered yet? <router-link :to="{name: 'Register'}" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
import Alert from '../components/Alert.vue';
import { ref } from 'vue';
const user = {
'email': '',
'password': '',
'remember': false,
}
const router = useRouter();
const errors = ref({});
const loading = ref(false);
function login(e) {
e.preventDefault();
loading.value = true;
store.dispatch('login', user)
.then(() => {
loading.value = false;
router.push({
  name: 'Dashboard'
})
})
.catch(err => {
    loading.value = false;
    if(err.response.status === 422) {
        if(err.response.data.errors) {
            errors.value = err.response.data.errors;
        }else {
            errors.value = err.response.data;
        }
        
    }
});
}
</script>
<style scoped>
</style>
