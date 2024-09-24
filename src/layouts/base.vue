<template>
    <div class="app-ly">
        <navbar/>
        <div class="main-app default-ctn"> 
            <sidebar/>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts" >
import navbar from '@/components/navbar.vue';
import sidebar from '@/components/sidebar.vue'

</script>