<template>
    <div class="input input-bordered flex items-center gap-2 input-base" v-if="inputType == 'text'">
        <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg> -->
        <slot name="icon" />
        <input
            :placeholder="textHolder" class="grow" type="text" v-model="inputValue" ref="inputs" 
        />

    </div>
    <div v-else-if="inputType == 'password'" class="input input-bordered flex items-center gap-2 input-base" :class="{'input-error': isError}" >
        <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg> -->
        <slot name="icon" />
        <input
            :placeholder="textHolder" class="grow" type="password" v-model="inputValue" ref="inputs" 
        />
        <div class="label absolute erro-label" v-show="isError">
            <span class="label-text-alt">
                <slot name="error-message"/>
            </span>
        </div>
    </div>
    <div v-else-if="inputType == 'email'" class="input input-bordered flex items-center gap-2 input-base relative" :class="{'input-error': isError}">
        <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg> -->
        <slot name="icon" />
        <input
            :placeholder="textHolder" class="grow" type="email" v-model="inputValue" ref="inputs" autocomplete="true"
        />
        <div class="label absolute erro-label" v-show="isError">
            <span class="label-text-alt">
                <slot name="error-message"/>
            </span>
        </div>
    </div>
    <div v-else-if="inputType == 'textarea'" class="gap-2">
        <textarea
            :placeholder="textHolder" class="textarea textarea-bordered textarea-sm w-full max-w-lg" v-model="inputValue" 
        >
        </textarea>
    </div>
    <div v-else-if="inputType == 'date'" class="input input-bordered flex items-center gap-2 input-base">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg>
        <input
            :placeholder="textHolder" class="grow" type="date" v-model="inputValue" ref="inputs" 
        />
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = withDefaults(defineProps<{
    inputType?: string,
    textHolder?: string
    modelValueText : string | number,
    validate? : Function
    isError?: boolean
}>(), {
    inputType: 'text',
    textHolder: 'input',
    validate: () => {
        console.log("validation\n")
    },
    isError: false
})

const emit = defineEmits(['update:modelValueText'])
const inputValue = computed({
    get() {
        return props.modelValueText
    },
    set(inputValue) {
        console.log(inputValue)
        
        emit('update:modelValueText', inputValue)
        props.validate()
    }
})

</script>