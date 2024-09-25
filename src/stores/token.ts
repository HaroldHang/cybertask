import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token = ref("")
    const getToken = computed(() => token.value)
    /*function increment() {
        count.value++
    }*/
    function setToken(token:any) {
        token.value = token
    }

    return { token, getToken, setToken }
})
