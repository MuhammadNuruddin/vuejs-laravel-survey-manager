
<template>  
 <div class="max-w-lg mx-auto bg-white p-8 rounded-sm shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Forgot Password?</h1>
        <form class="mt-8 space-y-6" @submit="forgotPassword">
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
                <button :disabled="loading" :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-sm border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                      <span>Continue</span>
                      <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
                </button>
                <p class="text-center">Back to Login <router-link :to="{name: 'Login'}" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></router-link></p>
            </div>
        </form>
    </div>  
</template>

<script setup>
import store from '../store';
import { useRouter, useRoute } from 'vue-router';
import Alert from '../components/Alert.vue';
import Notification from '../components/Notification.vue';
import { ref, inject } from 'vue';
const user = {
'email': '',
'route': ''
}
const Swal = inject('$swal');
const router = useRouter();
const route = useRoute();
const errors = ref({});
const loading = ref(false);
const app_path = store.state.app.name;
user.route = app_path + '/reset-password';
function forgotPassword(e) {
e.preventDefault();
loading.value = true;
store.dispatch('forgotPassword', user)
.then(() => {
  loading.value = false;
  // store.commit('notify', {
  //               type: 'success',
  //               message: 'Password reset link sent successfully!'
  //           });
  Swal.fire(
        'Done!',
        'Password reset link sent successfully!',
        'success'
        )
  setTimeout(() => {
    router.push({
    name: 'Login'
  })
  },3000);

})
.catch(err => {
    loading.value = false;
    if(err.response.status === 422) {
      errors.value = err.response.data.errors
    }
});
}
</script>