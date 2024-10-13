<template>
  <v-card flat border class="w-75">
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title>
        <b>Staffs</b>
        <v-btn
          class="text-none ml-10"
          size="large"
          @click="addClient()"
          variant="tonal"
        >
          Add Staff
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filter.search"
        @input="searchEntry"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search by name"
        variant="solo"
        hide-details
        single-line
        flat
        class="mr-5"
      ></v-text-field>
    </v-toolbar>
    <v-data-table :headers="listHeader" :items="clients">
      <template v-slot:item.name="{ item }">
        <td>{{ item.first_name }} {{ item.last_name }}</td>
      </template>
      <template v-slot:item.role="{ item }">
        <td>
          {{ item.role.name }}
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <td>
          <v-btn
            flat
            color="grey-lighten-3"
            class="text-none ml-3 mb-1"
            density="comfortable"
            size="small"
            icon="mdi-pencil"
            @click="editClicked(item)"
          />
          <v-btn
            flat
            rounded
            readonly
            color="grey-lighten-3"
            class="text-none ml-3 mb-1"
            size="small"
            prepend-icon="mdi-download"
          >
            Generate Report
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <ClientsSingle />
    <FormStaffDialog @exitDialog="exitDialog" />
  </v-card>
</template>
  <script setup>
const { $api } = useNuxtApp();
import { useFormDialogStore } from "@/stores/formDialog";
const formDialogStore = useFormDialogStore();
const filter = ref({});
const clients = ref([]);
const searchTimeout = ref(0);

const listHeader = ref([
  { title: "Name", key: "name" },
  { title: "email", key: "email" },
  { title: "contact", key: "contact_number" },
  { title: "role", key: "role" },
  { title: "actions", key: "actions" },
]);

const fetchUserData = async () => {
  try {
    const payload = filter.value;
    const response = await $api.post(`/staffs/search/`, payload);

    clients.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
fetchUserData();

function editClicked(client) {
  formDialogStore.setStaff({ dialog: true, payload: client });
}
function addClient() {
  formDialogStore.setStaff({ dialog: true });
}
function exitDialog() {
  fetchUserData();
}
function searchEntry() {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    // Stopped typing
    fetchUserData();
  }, 1000);
}
</script>
  