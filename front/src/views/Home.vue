<template>
  <div>
    <div class="flex justify-end">
      <base-button
          class="m-4"
          type="submit"
          color="blue"
          @click="$router.push('customer-form')"
      >
        New User
      </base-button>
    </div>
    <base-table
      :columns="columns"
      :data="users"
      @edit-item="openEditModal"
      @delete-item="openDeleteModal"
    />
    <div v-if="!users.length">No Data...</div>

    <base-modal :show="isModalVisible" :on-close="toggleModal">
      <template #content>
        <div class="text-center p-3 flex-auto justify-center leading-6">
          <h2 class="text-2xl font-bold py-4">Edit User Modal</h2>

          <form-input
              id="firstName"
              label="First Name"
              :model-value="editUser.firstName"
          />

          <form-input
              id="lastName"
              label="Last Name"
              :model-value="editUser.lastName"
          />

          <form-input
              id="country"
              label="Country"
              :model-value="editUser.country"
          />

          <date-picker v-model="editUser.dateOfBirth" />

          <select-input
              class="mt-8"
              v-model="editUser.profession"
              :options="professionOptions"
              id="profession"
              label="Profession"
          />

          <form-input
              v-if="editUser.profession"
              v-model="editUser.yearsInProfession"
              label="Years in current profession"
              id="country"
              type="number"
              class="mt-4"
          />
        </div>
      </template>

      <template #footer>
        <base-button
          @click="toggleModal"
          type="submit"
          color="black"
        >
          Close
        </base-button>
        <base-button
          type="submit"
          :success="true"
          @click="updateUser"
        >
          Save
        </base-button>

      </template>
    </base-modal>

    <base-modal :show="isDeleteModalVisible" :on-close="toggleModalDelete">
      <template #content>
        <div class="text-center p-3 flex-auto justify-center leading-6">
          <h2 class="text-2xl font-bold py-4">Delete User</h2>
          Are you sure you want to delete this "{{deletedUser.firstName}} {{deletedUser.lastName}}"?
        </div>
      </template>

      <template #footer>
        <base-button
            @click="toggleModalDelete"
            type="submit"
            color="black"
        >
          Close
        </base-button>
        <base-button
            type="submit"
            color="red"
            @click="deleteUser"
        >
          Delete
        </base-button>

      </template>
    </base-modal>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import BaseTable from "../components/base/BaseTable.vue";
import BaseModal from "../components/base/BaseModal.vue";
import BaseButton from "../components/base/BaseButton.vue";
import FormInput from "../components/forms/FormInput.vue";
import DatePicker from "../components/forms/DatePicker.vue";
import SelectInput from "../components/forms/SelectInput.vue";

const store = useStore();
const users = ref([]);
const isModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const editUser = ref(null);
const deletedUser = ref(null);

const professionOptions = [
  { label: 'Doctor', value: 'Doctor' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Artist', value: 'Artist' },
  { label: 'Teacher', value: 'Teacher' },
];

const columns = [
  { label: 'Last Name', field: 'lastName' },
  { label: 'First Name', field: 'firstName' },
  { label: 'Date Of Birth', field: 'dateOfBirth' },
  { label: 'Country', field: 'country' },
  { label: 'Profession', field: 'profession' },
  { label: 'Years In Profession', field: 'yearsInProfession' },
];

const openEditModal = (id) => {
  editUser.value = users.value.find((user)=>user.id === id);
  editUser.value.dateOfBirth = `${editUser.value.dateOfBirth} 00:00:00`;
  isModalVisible.value = true;
}

const openDeleteModal = (id) => {
  deletedUser.value = users.value.find((user)=>user.id === id);
  isDeleteModalVisible.value = true;
}

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

const toggleModalDelete = () => {
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};

const updateUser = async () => {
  editUser.value.yearsInProfession = editUser.value.yearsInProfession ?? undefined;
  editUser.value.profession = editUser.value.profession ?? undefined;
  const res = await store.dispatch('customerForm/updateUser', {userId: editUser.value.id, userData:  editUser.value});
  if (res) {
    toggleModal();
    await listUsers();
  }
}

const deleteUser = async () => {
  const res = await store.dispatch('customerForm/deleteUser', {userId: deletedUser.value.id});
  if (res) {
    toggleModalDelete();
    await listUsers();
  }
}


const listUsers = async () => {
  users.value = await store.dispatch('customerForm/listUsers') ?? [];
}
onMounted(async () => {
  await listUsers();
});

</script>

<style scoped>

</style>