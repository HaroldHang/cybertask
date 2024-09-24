<!-- Login Page Here -->
<template>
    <div>
        <div class="dark min-h-screen flex flex-col items-center justify-center back-color">
            <div class="header mb-4">
                <h2 class="text-4xl brand-text">Cyber<span>Task</span></h2>
            </div>
            <div class="card w-full max-w-md rounded-lg shadow-md p-6 bg-white">
                <h2 class="text-2xl font-semibold text-center">Login</h2>
                <p class="mt-2 text-center ">Access your account</p>
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
                        <formInput :inputType="'email'" v-model:modelValueText="formData.username" :text-holder="'Email'" >
                            <template #icon>
                                <EnvelopeIcon/>
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
                    <buttonBase class="block w-fit mx-auto " :btnType="'submit'">
                        Se connecter
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

const router = useRouter()
const formData = ref({
    username: '',
    password: '',
})

const formError = ref({
    usernameError: false,
    passwordError: false
})

const  onLogin = async () => {
    console.log(formData.value)
    const formValue = new FormData()
    formValue.append('username', formData.value.username)
    formValue.append('password', formData.value.password)
    Auth.signIn(formValue).then((res) => {
        console.log(res)
        if (res.data && res.data.access_token) {
            sessionStorage.setItem('token', res.data.access_token)
            router.push("/dashboard")
        }
        //return res.data
    })
    .catch((err)=> {
        console.log(err)
    })
    
} 

</script>