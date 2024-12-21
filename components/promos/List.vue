<template>
  <v-card flat border class="w-75">
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title>
        <b>Promos</b>
        <v-btn
          class="text-none ml-10"
          size="large"
          @click="addPromo()"
          variant="tonal"
        >
          Add Promo
        </v-btn>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
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
      ></v-text-field> -->
    </v-toolbar>
    <v-data-table :headers="listHeader" :items="promos">
      <!-- <template v-slot:item.name="{ item }">
        <td>{{ item.first_name }} {{ item.last_name }}</td>
      </template> -->
      <template v-slot:item.percentage="{ item }">
        <td>
          {{ item.percentage ? 'Percentage' : 'Fixed amount' }}
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
        </td>
      </template>
    </v-data-table>
    <FormPromoDialog @exitDialog="exitDialog" />
  </v-card>
</template>
  <script setup>
import axios from "axios";
import { useFormDialogStore } from "@/stores/formDialog";
const { request } = useNuxtApp().$api;
const formDialogStore = useFormDialogStore();
const filter = ref({});
const promos = ref([]);
const searchTimeout = ref(0);

const listHeader = ref([
  { title: "Promo Name", key: "discount_name" },
  { title: "Discount type", key: "percentage" },
  { title: "Amount", key: "amount" },
  { title: "actions", key: "actions" },
]);

const fetchUserData = async () => {
  try {
    const response = await request("get", `/discounts/`);

    promos.value = response;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
fetchUserData();

function editClicked(promo) {
  formDialogStore.setPromo({ dialog: true, payload: promo });
}
function addPromo() {
  formDialogStore.setPromo({ dialog: true });
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

// async function generateReport(staff) {
//   try {
//     const config = useRuntimeConfig();
//     const response = await axios.get(
//       `${config.public.apiBaseUrl}/reports/staff/${staff.id}`,
//       {
//         responseType: "blob", // Set response type to blob for binary data
//       }
//     );

//     const blobUrl = URL.createObjectURL(
//       new Blob([response.data], { type: "application/pdf" })
//     );

//     // Create a link and trigger the download
//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.setAttribute("download", `${staff.first_name}-report.pdf`); // Set the file name
//     document.body.appendChild(link);
//     link.click();

//     // Cleanup
//     document.body.removeChild(link);
//     URL.revokeObjectURL(blobUrl);
//   } catch (error) {
//     console.error(error);
//   }
// }
</script>
  