<template>
  <div>
    <form class="max-w-md mx-auto" @submit.prevent="submitStep">
      <date-picker v-model="dateOfBirth" />
      <div class="mt-4 flex justify-between">
        <base-button
            @click="backStep"
            type="submit"
            color="black"
        >
          Back
        </base-button>
        <base-button
            type="submit"
            color="blue"
            :disabled="!dateOfBirth.length"
        >
          Next
        </base-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import BaseButton from "../../base/BaseButton.vue";
import DatePicker from "../DatePicker.vue";

const store = useStore();
const emit = defineEmits(['next']);
const dateOfBirth = ref(store.state.customerForm.dateOfBirth);

const submitStep = () => {
  store.dispatch('customerForm/saveStepTwo', { dateOfBirth: dateOfBirth.value });
  emit('next');
};

const backStep = () => {
  emit('back');
};

</script>
