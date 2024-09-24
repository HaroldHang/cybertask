<template>
    <button class="btn btn-square btn-icon" @click="emit('onClick')">
        <slot/>
    </button>
</template>

<script setup lang="ts">

const emit = defineEmits(['onClick'])



</script>