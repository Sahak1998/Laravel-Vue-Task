<template>
  <button
      :type="type"
      :disabled="disabled"
      :class="[
      'font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition duration-200',
      {
        'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800': color === 'blue' && !disabled && !error && !success,
        'bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800': color === 'red' && !disabled && !error && !success,
        'bg-gray-400 cursor-not-allowed text-gray-700 dark:bg-gray-600 dark:text-gray-300': disabled,
        'bg-yellow-400 text-white hover:bg-yellow-500': error && !disabled,
        'bg-green-500 text-white hover:bg-green-600': success && !disabled,
        'bg-black text-white hover:bg-gray-800': color === 'black' && !disabled && !error && !success,
      },
    ]"
      @click="onClick"
  >
    <slot>Submit</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'submit',
  },
  color: {
    type: String,
    default: 'blue',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const onClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
</style>
