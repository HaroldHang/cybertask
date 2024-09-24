<template>
    <button class="btn btn-spector primary-back-color" @click="emit('onClick')" :type="btnType">
        <slot/>
    </button>
</template>

<script setup lang="ts">

const emit = defineEmits(['onClick'])
withDefaults(defineProps<{
    btnType?: 'reset' | 'submit' | 'button'
}>(), {
    btnType: 'button'
})


</script>