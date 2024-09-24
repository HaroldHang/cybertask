import Api from '@/services/Api';

export default {
    signIn(credentials:any) {
        const api = Api()
        api.defaults.headers.common['Content-Type']= 'application/x-www-from-urlencoded'
        return  api.post(`/login`, credentials)
    },
    
}
