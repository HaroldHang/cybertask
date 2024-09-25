
<template>
  <div class="home-page">
    <navbar/>
    <div class="my-hero default-ctn">
      <h2 class="brand-text text-6xl lg:text-7xl hero-brand">Cyber
        <div class="hero-box">
          <span>Plan</span>
          <span>Task</span>
          <span>Done</span>
        </div>
      </h2>
      <p class="text-xl">Gerez vos taches en toute simplicite</p>
      <a href="/login" class="btn btn-spector primary-back-color get-started" >
        Commencez <ArrowRightIcon/>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import navbar from '@/components/navbar.vue';
import { ArrowRightIcon } from '@heroicons/vue/16/solid'

</script>