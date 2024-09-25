<template>
    <layoutBase>
        <main class="content dash-page">
            <header class="dash-header">
                <h3 class="text-2xl">Tableau de Bord</h3>
                <!-- <div>
                    <buttonBase @on-click="()=> createTaskMod.dialog.showModal()">
                        Creer
                    </buttonBase>
                </div> -->
            </header>
            <div class="dash-content">

                <div class="chart-container">
                    <Bar id="chart-id" :options="chartOptions" :data="chartData"
                        aria-label="Task on today" :style="chartStyle"
                    />
                </div>

            </div>
        </main>
    </layoutBase>
</template>

<script setup lang="ts">

import layoutBase from '@/layouts/base.vue'
import { onBeforeMount, onMounted, ref, computed, watch } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import Task from '@/services/Task';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const taskStats: any = ref(null)
const chartData = ref ({
    labels: [ 'Total Tasks', 'Completed Tasks', 'Incompleted Tasks', 'Completed on Time', 'Remaining Tasks' ],
    datasets: [ {
        
        data: [0,0,0,0,0] 
    } ]
})
const chartOptions = ref ({
    responsive: true
})
const chartStyle = computed (()=> {
    return {
        height: `50vh`,
        marginTop: `50px`
    }
})
onBeforeMount(()=> {
    Task.getTaskStat().then((res)=> {
        console.log(res)
        if (res.status && res.status == 200) {
            taskStats.value = res.data
        }
    })
    /*setTimeout(()=> {
    }, 1000)*/
})

watch(taskStats, (newTasksStats:any, oldTasksStats:any)=> {
    if (newTasksStats) {
        console.log(newTasksStats)
        let data = [
            newTasksStats.total_tasks,
            newTasksStats.completed_tasks,
            newTasksStats.incompleted_tasks,
            newTasksStats.completed_on_time,
            newTasksStats.remaining_tasks,
        ]
        let newChartData = {
            type: 'line',
            labels: [ 'Total Tasks', 'Completed Tasks', 'Incompleted Tasks', 'Completed on Time', 'Remaining Tasks' ],
            datasets: [ {
                label: 'Taches d\'Aujourdhui',
                backgroundColor: '#4BD1B9',
                data: data 
            } ]
        }
        chartData.value = newChartData
    }
})

</script>