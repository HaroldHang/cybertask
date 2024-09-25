<!-- Login Page Here -->
<template>
    <div>
        <div class="dark min-h-screen flex flex-col items-center justify-center back-color">
            <div class="header mb-4">
                <a class="text-4xl brand-text" href="/">Cyber<span>Task</span></a>
            </div>
            <div class="card w-5/6 lg:w-full max-w-md rounded-lg shadow-md p-6 bg-white">
                <h2 class="text-2xl font-semibold text-center">Login</h2>
                <p class="mt-2 text-center ">Accedez a votre compte</p>
                <form class="mt-4" @submit.prevent="onLogin">
                    <div class="flex flex-col mb-7">
                        <!-- <Label htmlFor="login" class="text-gray-300">
                        Login
                        </Label>
                        <Input
                        id="login"
                        type="text"
                        class="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your login"
                        required
                        /> -->
                        <formInput :inputType="'email'" v-model:modelValueText="formData.username" :text-holder="'Email'" :is-error="formError.usernameError" >
                            <template #icon>
                                <EnvelopeIcon/>
                            </template>
                            <template #error-message>
                                {{ formErrorMessage.user }}
                            </template>
                        </formInput>
                    </div>
                    <div class="flex flex-col mb-6">
                        <formInput v-model:modelValueText="formData.password" :text-holder="'Password'" :inputType="'password'" >
                            <template #icon>
                                <KeyIcon/>
                            </template>
                        </formInput>
                        
                    </div>

                    <!-- <Button type="submit" class="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        Sign in
                    </Button>
                    <Button type="button" class="w-full mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600">
                        Register
                    </Button> -->
                    <buttonBase class="flex w-fit mx-auto " :btnType="'submit'" :is-disable="isLogin" >
                        <span class="loading loading-spinner" v-if="isLogin"></span>
                        <span>
                            Se connecter
                        </span>
                    </buttonBase>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import formInput from "@/components/form/input.vue"
import buttonBase from "@/components/button/base.vue"
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/16/solid'
import Auth from '@/services/Auth';
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";

const tokenStore = useTokenStore()

const router = useRouter()
const formData = ref({
    username: '',
    password: '',
})

const formError = ref({
    usernameError: false,
    passwordError: false
})
const formErrorMessage = ref({
    user: '',
    password: ''
})

const isLogin = ref(false)

const  onLogin = async () => {
    console.log(formData.value)
    const formValue = new FormData()
    formValue.append('username', formData.value.username)
    formValue.append('password', formData.value.password)
    isLogin.value = true
    Auth.signIn(formValue).then((res) => {
        console.log(res)
        //return
        if (res.status && res.status == 200) {
            if (res.data && res.data.access_token) {
                sessionStorage.setItem('token', res.data.access_token)
                //tokenStore.setToken(res.data.access_token)
                isLogin.value = false
                setTimeout(()=> {
                    //router.push("/dashboard")
                    window.location.href = "/dashboard"
                }, 500)
            }
        }
        //return res.data
    })
    .catch((err)=> {
        console.log(err)
        if (err.status == 401) {
            let error = err.response.data.detail
            if (error == "Invalid credentials") {
                //
                formError.value.usernameError = true
                formErrorMessage.value.user = "Identifiant invalide"
                isLogin.value = false
            }
        }
    })
    
} 

</script>