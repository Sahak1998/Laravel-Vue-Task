<template>
  <div class="relative">
    <label
        :for="id"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform
      -translate-y-6 scale-75 top-0 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
      rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
      peer-focus:-translate-y-6"
    >
      {{ label }}
    </label>

    <vue-tailwind-datepicker
        :id="id"
        v-model="localValue"
        :as-single="true"
        class="mt-8"
    />

    <p v-if="showError" class="text-red-500 text-xs mt-1 text-left">
      This field is required
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Date of Birth',
  },
  id: {
    type: String,
    default: 'date-of-birth',
  },
  required: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);
const showError = ref(false);

const validateInput = (value) => {
  if (props.required) {
    showError.value = !value;
  }
};
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
  validateInput(newValue);
}, { immediate: true });


</script>

<style scoped>
</style>
