import axios from 'axios';

export default() => {
    const axiosInstance = axios.create({ 
        baseURL : `${import.meta.env.VITE_APP_URL}`
    })

    const token = sessionStorage.getItem('token')
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log(response)
            return response
        },
        (error) => {
            console.log(error)
            if (!error.response) {
                sessionStorage.removeItem('token')
                location.reload()
            }
            if (error.response.status && error.response.status === 401) {
                sessionStorage.removeItem('token')
                //sessionStorage.removeItem('user')
                location.reload()
            }
            return Promise.reject(error)
        }
    )

    return axiosInstance
}