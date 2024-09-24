<template>
    <dialog class="modal" :id="dialogId" ref="dialog">
        <div class="modal-box">
            <slot/>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    dialogId: string
}>()
const dialog = ref<Element| any>()
defineExpose({
    dialog
})

</script>