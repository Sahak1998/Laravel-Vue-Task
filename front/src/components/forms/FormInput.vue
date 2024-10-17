<template>
  <div class="relative z-0 w-full mb-5 group text-left">
    <input
        :value="modelValue"
        @input="handleInput"
        :type="type"
        :name="id"
        :id="id"
        :class="[
        'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none peer focus:outline-none focus:ring-0',
        {
          'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500': !isInvalid,
          'border-red-500 focus:border-red-500 dark:border-red-600 dark:focus:border-red-600': isInvalid,
        },
        inputClass,
      ]"
        :required="required"
        placeholder=""
    />
    <label
        :for="id"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform
        -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
        rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
        peer-focus:-translate-y-6"
    >
      {{ label }}
    </label>
    <!-- Error message for required field -->
    <p v-if="isInvalid" class="text-red-500 text-xs mt-1">
      This field is required
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: '',
  },
});

// Reactive state
const isInvalid = ref(false);

// Handle input event
const emit = defineEmits(['update:modelValue']);
const handleInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);

  // Check if the field is required and empty
  isInvalid.value = props.required && !value;
};

// Watch for initial empty state
watch(
    () => props.modelValue,
    (newValue) => {
      isInvalid.value = props.required && !newValue;
    },
    { immediate: true }
);
</script>

<style scoped>
/* Add additional styles for the input if needed */
</style>
