<template>
    <layoutBase>
        <main class="content task-page">
    
            <header class="task-header">
                <h3 class="text-2xl">Taches</h3>
                <div>
                    <buttonBase @on-click="()=> createTaskMod.dialog.showModal()">
                        Creer
                    </buttonBase>
                </div>
            </header>
    
            <div class="table-task">
    
                <div class="overflow-x-auto overflow-y-clip table-container">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tache</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <!-- row 1 -->
                            <tr v-for="(task, index) in allTasks" :key="task.title" :class="{'hover': (index % 2 != 0)}">
                                <th> {{ index + 1 }}</th>
                                <td>
                                    {{  task.title }}
                                </td>
                                <td>
                                    {{  task.description }}
                                </td>
                                <td class="status-task">
                                    <span v-if="task.completed" class="done-spot">
                                        Termine
                                    </span>
                                    <span v-else class="progress-spot">
                                        En cours
                                    </span>
                                </td>
                                <td>
                                    <div>
                                        <buttonIcon @on-click="onEdit(index, task.id)">
                                            <PencilIcon/>
                                        </buttonIcon>
                                    </div>
                                    <div>
                                        <buttonIcon @on-click="deleteTask(index, task.id)">
                                            <TrashIcon/>
                                        </buttonIcon>
                                    </div>
                                    <div>
                                        <div class="dropdown dropdown-bottom dropdown-end">
                                            <buttonIcon>
                                                <ChevronDownIcon/>
                                            </buttonIcon>
                                            <!-- <div tabindex="0" role="button" class="btn m-1">Click</div> -->
                                            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li @click="completeTask(index, task.id)"><a>Termine</a></li>
                                                <!-- <li><a>Item 2</a></li> -->
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        <!-- row 2 -->
                            <!-- <tr class="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr> -->
                        <!-- row 3 -->
                            <!-- <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Red</td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
    
            </div>
    
        </main>
        <modal-dialog :dialog-id="'createTaskMod'" ref="createTaskMod">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref="modalCloseBtn">✕</button>
            </form>
            <h3 class="text-lg font-bold">
                <span v-if="isEditing">
                    Modifier {{ aTask.title }}
                </span>
                <span v-else>
                    Creer un tache
                </span>
            </h3>
            <form class="form-size flex flex-col justify-between py-2 gap-3" @submit.prevent="()=> isEditing? updateTask() : addTask()  ">
                <form-input :input-type="'text'" v-model:model-value-text="aTask.title" :text-holder="'title'" />
                <form-input :input-type="'textarea'" v-model:model-value-text="aTask.description" :text-holder="'description'" />
                <form-input :input-type="'date'" v-model:model-value-text="aTask.due_date" :text-holder="'date'" />
                <buttonBase class="w-fit self-center" :btn-type="'submit'" >
                    <span v-if="isEditing">
                        Modifier
                    </span>
                    <span v-else>
                        Ajouter
                    </span>
                </buttonBase>
            </form>
        </modal-dialog>
        <div class="toast toast-top toast-center my-toast" v-show="toastAlert.isActive" >
            <div class="alert" :class="toastAlert.class">
                <span>{{ toastAlert.message }}</span>
            </div>
        </div>

    </layoutBase>
</template>

<script setup lang="ts">
import navbar from '@/components/navbar.vue';
import sidebar from '@/components/sidebar.vue'
import layoutBase from '@/layouts/base.vue'
import buttonBase from "@/components/button/base.vue"
import buttonIcon from "@/components/button/icon.vue"
import modalDialog from "@/components/modal/dialog.vue"
import formInput from "@/components/form/input.vue"
import { PencilIcon, TrashIcon, ChevronDownIcon } from '@heroicons/vue/16/solid'
import Task from '@/services/Task';

import { onBeforeMount, ref } from 'vue';

const allTasks:any = ref([])

const createTaskMod = ref<Element|any>()
const toastAlert = ref({
    isActive: false,
    class: ['alert-info'],
    message: 'Task created'
})
const aTask = ref({
    title: '',
    description: '',
    due_date: ''
})
const currentTaskId = ref(0)
const currentTaskIndex = ref(0)
const isEditing = ref(false)
const modalCloseBtn = ref<Element|any>()

const addTask = ()=> {
    const dateValue = new Date(aTask.value.due_date)
    aTask.value.due_date = dateValue.toISOString()
    console.log(aTask.value)
    Task.createTask(aTask.value).then((res)=> {
        console.log(res)
        if (res.status && res.status == 200) {
            modalCloseBtn.value.click()
            toastAlert.value = {
                isActive : true,
                class: ['alert-success'],
                message: 'Tache cree avec success'
            }
            allTasks.value.push(res.data)
            setTimeout(() => {
                toastAlert.value.isActive = false
            }, 2000)
        }
    })
    .catch((err)=> {
        console.log(err)
    })
}

const getTasks = () => {
    Task.getTasks().then(res=> {
        console.log(res)
        if (res.status && res.status == 200) {
            allTasks.value = res.data
        }
    })
    .catch(err=> {
        console.log(err)
    })
}

const updateTask = () => {
    const dateValue = new Date(aTask.value.due_date)
    aTask.value.due_date = dateValue.toISOString()
    console.log(aTask.value)
    Task.updateTask(currentTaskId.value, aTask.value).then((res)=> {
        console.log(res)
        if (res.status && res.status == 200) {
            if (allTasks.value[currentTaskIndex.value]) {
                allTasks.value[currentTaskIndex.value] = res.data
                modalCloseBtn.value.click()
                toastAlert.value = {
                    isActive : true,
                    class: ['alert-success'],
                    message: 'Tache mise a jour'
                }
                setTimeout(() => {
                    toastAlert.value.isActive = false
                }, 2000)
            }
        }
    })
}

const deleteTask = (taskIndex:any, taskId:any) => {
    if (allTasks.value[taskIndex]) {
        Task.deleteTask(taskId).then(res=> {
            if (res.status && res.status == 200) {
                //
                allTasks.value.splice(taskIndex, 1)
                toastAlert.value = {
                    isActive : true,
                    class: ['alert-success'],
                    message: 'Tache supprime'
                }
                setTimeout(() => {
                    toastAlert.value.isActive = false
                }, 2000)
            }
        })
        .catch(err => console.log(err))
    }
}
const completeTask = (taskIndex:any, taskId:any) => {
    if (allTasks.value[taskIndex]) {
        Task.completeTask(taskId).then(res => {
            
            console.log(res)
            if (res.status && res.status == 200) {
                allTasks.value[taskIndex] = res.data
                toastAlert.value = {
                    isActive : true,
                    class: ['alert-success'],
                    message: 'Tache termine'
                }
                setTimeout(() => {
                    toastAlert.value.isActive = false
                }, 2000)
            }
        })
        .catch(err => console.log(err))
    }
}


const onEdit = (taskIndex:any, taskId:any)=> {
    if (allTasks.value.length != 0) {
        let task = allTasks.value[taskIndex]
        if (task && task.id == taskId) {
            currentTaskIndex.value = taskIndex
            currentTaskId.value = taskId
            aTask.value.title = task.title
            aTask.value.description = task.description
            let newDueDate = new Date(task.due_date)
            aTask.value.due_date = formatToDueDate(newDueDate)
            isEditing.value = true
            createTaskMod.value.dialog.showModal()
        }
    }
}
const formatToDueDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format to "YYYY-MM-DDTHH:MM" for datetime-local input
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate
} 
onBeforeMount(async() => {
    getTasks()
})
</script>