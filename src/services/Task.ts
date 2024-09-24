import Api from '@/services/Api';
const api = Api()

export default {
    createTask(payload:any) {
        return  api.post(`/tasks`, payload)
    },
    getTasks() {
        return  api.get(`/tasks`)
    },
    getTaskStat() {
        return  api.get(`/tasks/stats`)
    },
    updateTask(taskId:Number, payload:any) {
        return  api.put(`/tasks/${taskId}`, payload)
    },
    deleteTask(taskId: Number) {
        return  api.delete(`/tasks/${taskId}`)
    },
    completeTask(taskId: Number) {
        return  api.patch(`/tasks/${taskId}/complete`)
    },
}
