<template>
    <button class="btn btn-spector primary-back-color" @click="emit('onClick')" :type="btnType" :disabled="isDisable">
        <slot/>
    </button>
</template>

<script setup lang="ts">

const emit = defineEmits(['onClick'])
withDefaults(defineProps<{
    btnType?: 'reset' | 'submit' | 'button',
    isDisable?: boolean
}>(), {
    btnType: 'button',
    isDisable: false
})


</script>