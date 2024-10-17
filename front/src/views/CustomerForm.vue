<template>
  <div class="p-4">

    <div class="w-full flex justify-center">
      <steps-progress
          class="mb-4"
          :current-step="step"
          :steps="steps"
      />
    </div>

    <div v-if="step === 1">
      <step-one @next="goToNextStep" />
    </div>
    <div v-if="step === 2">
      <step-two @next="goToNextStep" @back="goToPreviousStep" />
    </div>
    <div v-if="step === 3">
      <step-three @back="goToPreviousStep" @submit="submitForm" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import StepOne from "../components/forms/steps/StepOne.vue";
import StepTwo from "../components/forms/steps/StepTwo.vue";
import StepThree from "../components/forms/steps/StepThree.vue";
import StepsProgress from '../components/forms/steps/StepsProgress.vue'

const store = useStore();
const router = useRouter();
const step = ref(1);
const steps = [
  { label: 'Personal Info', subLabel: '' },
  { label: 'Date of Birth', subLabel: '' },
  { label: 'Country/Profession' }
];

const goToNextStep = () => {
  step.value += 1;
};

const goToPreviousStep = () => {
  step.value -= 1;
};

const submitForm = async () => {
  const res = await store.dispatch('customerForm/createUser', store.state.customerForm);
  if (res.data.user) {
    router.back()
  }
};

</script>
