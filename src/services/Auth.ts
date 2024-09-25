import Api from '@/services/Api';
import axios from 'axios';

export default {
    signIn(credentials:any) {
        //const api = Api()
        const api = axios.create({ 
            baseURL : `${import.meta.env.VITE_APP_URL}`
        })
        api.defaults.headers.common['Content-Type']= 'application/x-www-from-urlencoded'
        return  api.post(`/login`, credentials)
    },
    
}
