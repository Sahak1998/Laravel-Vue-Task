<template>
  <div class="relative mb-4 text-left">
    <select
        v-model="localValue"
        @change="handleChange"
        :id="id"
        :class="[
        'mb-4 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
        {
          'border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500':
            !hasError,
          'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600': hasError,
        },
      ]"
    >
      <option value="">Choose a profession</option>
      <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <label
        :for="id"
        class="peer-focus:font-medium absolute top-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform
        -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
        rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
        peer-focus:-translate-y-6"
    >
      {{ label }}
    </label>

    <p v-if="hasError" class="text-red-500 text-xs mt-1 text-left">This field is required.</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);
const hasError = ref(false);

const handleChange = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
  checkError(value);
};

const checkError = (value) => {
  if (props.required) {
    hasError.value = value === '';
  }
};

watch(
    () => props.modelValue,
    (newValue) => {
      localValue.value = newValue;
      checkError(newValue);
    },
    { immediate: true }
);
</script>

<style scoped>
</style>
