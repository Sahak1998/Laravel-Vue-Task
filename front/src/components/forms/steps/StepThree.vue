<template>
  <div>
    <form class="max-w-md mx-auto" @submit.prevent="submitStep">
      <div class="my-8">
        <form-input
            v-model="country"
            label="Country"
            id="country"
            required

        />
      </div>
      <div class="mt-8">
        <select-input
            class="mt-4"
            v-model="profession"
            :options="professionOptions"
            id="profession"
            label="Profession"
        />
      </div>
      <div v-if="profession">
        <form-input
            v-model="yearsInProfession"
            label="Years in current profession"
            id="country"
            type="number"
            class="mt-4"
        />
      </div>
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
            :success="true"
            :disabled="!country.length || loading"
        >
          Save
        </base-button>
        <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import FormInput from "../FormInput.vue";
import BaseButton from "../../base/BaseButton.vue";
import SelectInput from "../SelectInput.vue";

const store = useStore();
const emit = defineEmits(['submit']);

const country = ref(store.state.customerForm.country);
const profession = ref(store.state.customerForm.profession);
const yearsInProfession = ref(store.state.customerForm.yearsInProfession);
const loading = ref(store.state.customerForm.loading);
const errorMessage = ref(store.state.customerForm.error?.message);

const professionOptions = [
  { label: 'Doctor', value: 'Doctor' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Artist', value: 'Artist' },
  { label: 'Teacher', value: 'Teacher' },
];

const submitStep = () => {
  store.dispatch('customerForm/saveStepThree', {
    country: country.value,
    profession: profession.value,
    yearsInProfession: yearsInProfession.value,
  });
  emit('submit');
};



const backStep = () => {
  emit('back');
};

</script>
