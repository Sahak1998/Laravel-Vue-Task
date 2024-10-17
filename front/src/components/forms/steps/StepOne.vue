<template>
  <div>
    <form @submit.prevent="submitStep" class="max-w-md mx-auto">
      <form-input
          v-model="firstName"
          label="First Name"
          id="firstName"
          required
      />
      <form-input
          v-model="lastName"
          label="Last Name"
          id="lastName"
          required
      />

      <base-button
          type="submit"
          color="blue"
          :disabled="!lastName.length || !firstName.length"
      >
        Next
      </base-button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import FormInput from "../FormInput.vue";
import BaseButton from "../../base/BaseButton.vue";
const store = useStore();

const emit = defineEmits(['next']);

const firstName = ref(store.state.customerForm.firstName);
const lastName = ref(store.state.customerForm.lastName);

const submitStep = () => {
  console.log({ firstName: firstName.value, lastName: lastName.value })
  store.dispatch('customerForm/saveStepOne', { firstName: firstName.value, lastName: lastName.value });
  emit('next');
};

</script>

<style scoped>

</style>
