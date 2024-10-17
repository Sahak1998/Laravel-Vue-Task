<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th v-for="(column, index) in columns" :key="index" class="px-6 py-3">
          {{ column.label }}
        </th>
        <th class="px-6 py-3">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in data"
          :key="index"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
      >
        <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{ item[column.field] }}
        </td>
        <td class="px-6 py-4">
          <base-button
              @click="editItem(item.id)"
              color="blue"
              class="mr-3"
          >
            Edit
          </base-button>
          <base-button
              @click="deleteItem(item.id)"
              color="red"
          >
            Delete
          </base-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['editItem', 'deleteItem']);
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const editItem = (id) => {
  emit('editItem', id);
}
const deleteItem = (id) => {
  emit('deleteItem', id);
}
</script>

<style scoped>
/* Add additional styling if necessary */
</style>
