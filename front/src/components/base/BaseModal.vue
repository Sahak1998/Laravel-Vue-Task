<template>
  <transition name="fade">
    <div
        v-if="show"
        class="fixed inset-0 flex justify-center items-center z-50"
    >
      <div @click="onClose" class="absolute bg-black opacity-70 inset-0 z-0"></div>

      <transition name="modal-body-fade">
        <div class="w-full max-w-2xl p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-10">
          <slot name="content">
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <h2 class="text-2xl font-bold py-4">Default Modal Title</h2>
              <p class="text-md text-gray-500 px-8">
                This is the default modal content.
              </p>
            </div>
          </slot>
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <slot name="footer">
              <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100">
                Cancel
              </button>
              <button
                  @click="onClose"
                  class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
              >
                Close
              </button>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.modal-body-fade-enter-active,
.modal-body-fade-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s;
}
.modal-body-fade-enter, .modal-body-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
