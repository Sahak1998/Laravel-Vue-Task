<template>
  <ol class="flex items-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
    <li v-for="(step, index) in steps" :key="index" class="flex items-center" :class="{ 'text-blue-600 dark:text-blue-500': currentStep >= index + 1 }">
      <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{
          'border-blue-600 dark:border-blue-500': currentStep >= index + 1,
          'border-gray-500 dark:border-gray-400': currentStep < index + 1
        }"
      >
        {{ index + 1 }}
      </span>
      <span>
        {{ step.label }}<span v-if="step.subLabel" class="hidden sm:inline-flex sm:ms-2">{{ step.subLabel }}</span>
      </span>
      <svg
          v-if="index < steps.length - 1"
          class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
      >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
        />
      </svg>
    </li>
  </ol>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true,
    default: 1,
  },
});
</script>

<style scoped>
/* Add any custom styling here */
</style>
