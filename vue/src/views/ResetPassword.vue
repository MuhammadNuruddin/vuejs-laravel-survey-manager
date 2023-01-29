
<template>  

<div class="max-w-lg mx-auto bg-white p-8 rounded-sm shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Reset Your Password.</h1>
        <form class="mt-8 space-y-6" @submit="resetPassword">
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
                <label for="password">
                    <p class="font-medium text-slate-700 pb-2">New Password</p>
                    <input id="password" v-model="user.password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Enter your password">
                </label>
                <label for="password_confirmation">
                    <p class="font-medium text-slate-700 pb-2">Confirm Password</p>
                    <input id="password_confirmation" v-model="user.password_confirmation" name="password_confirmation" type="password" class="w-full py-3 border border-slate-200 rounded-sm px-3 focus:outline-none focus:border-slate-500 " placeholder="Type password again">
                </label>
                <button :disabled="loading" :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-sm border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>


                      <span>Reset</span>
                      <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import store from '../store';
import { useRouter, useRoute } from 'vue-router';
import Alert from '../components/Alert.vue';
import { ref, inject } from 'vue';
const user = {
'password': '',
'password_confirmation': '',
'token': '',
}
const Swal = inject('$swal');
const router = useRouter();
const route = useRoute();
const errors = ref({});
const loading = ref(false);
const token = route.params.token;
function resetPassword(e) {
e.preventDefault();
user.token = token;
loading.value = true;

store.dispatch('resetPassword', user)
.then((res) => {
        console.log(res);
        loading.value = false;
    // store.commit('notify', {
    //                 type: 'success',
    //                 message: 'Password reset successfully!'
    //             });
       Swal.fire(
        'Done!',
        'Password reset successfully!',
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
        if(err.response.data.errors) {
            errors.value = err.response.data.errors;
        }else {
            errors.value = err.response.data;
        }
        
    }
});
}
</script>