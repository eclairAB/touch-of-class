<template>
    <v-card flat border class="w-75">
      <v-toolbar color="orange-lighten-4">
        <v-toolbar-title>
          <b>Employee</b>
          <v-btn
            class="text-none ml-10"
            size="large"
            @click="addEmployee()"
            variant="tonal"
          >
            Add
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
        <template v-slot:item.branch="{ item }">
          <td><strong>{{ item.branch ? item.branch.name : '' }}</strong></td>
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
              color="red-lighten-3"
              class="text-none ml-3 mb-1"
              density="comfortable"
              size="small"
              icon="mdi-minus"
              @click="deductClicked(item)"
            />
            <v-btn
              flat
              rounded
              color="grey-lighten-3"
              class="text-none ml-3 mb-1"
              size="small"
              prepend-icon="mdi-download"
              @click="openDialog(item)"
            >
              Generate Report
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <ClientsSingle />
      <FormEmployeeDialog @exitDialog="exitDialog" />
      <FormEmployeeDeduction @exitDialog="exitDialog" />
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title>Select Date Range</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-menu v-model="startMenu" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      label="Start Date"
                      :model-value="formattedStartDate"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" @update:model-value="startMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12">
                <v-menu v-model="endMenu" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      label="End Date"
                      :model-value="formattedEndDate"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" @update:model-value="endMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="generateReport">Generate</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
    <script setup>
  import axios from "axios";
  import { useFormDialogStore } from "@/stores/formDialog";
  const { request } = useNuxtApp().$api;
  const formDialogStore = useFormDialogStore();
  const filter = ref({});
  const clients = ref([]);
  const searchTimeout = ref(0);
  const dialog = ref(false);
  const startDate = ref(null);
  const endDate = ref(null);
  const selectedStaff = ref(null);
  const startMenu = ref(false);
  const endMenu = ref(false);
  
  function openDialog(staff) {
    selectedStaff.value = staff;
    dialog.value = true;
  }
  const formattedStartDate = computed(() =>
    startDate.value
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(startDate.value))
      : ""
  );
  const formattedEndDate = computed(() =>
    endDate.value
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(endDate.value))
      : ""
  );
  const listHeader = ref([
    { title: "Name", key: "name" },
    { title: "Branch", key: "branch" },
    { title: "email", key: "email" },
    { title: "contact", key: "contact_number" },
    { title: "actions", key: "actions" },
  ]);
  
  const fetchEmployeeData = async () => {
    try {
      const payload = filter.value;
      const response = await request("get", `/employees/`, payload);
  
      clients.value = response;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  fetchEmployeeData();
  
  function editClicked(client) {
    formDialogStore.setEmployee({ dialog: true, payload: client });
  }
  function deductClicked(client) {
    console.log(client)
    formDialogStore.setDeduction({ dialog: true, payload: client });
  }
  function addEmployee() {
    formDialogStore.setEmployee({ dialog: true });
  }
  function exitDialog() {
    fetchEmployeeData();
  }
  function searchEntry() {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
      // Stopped typing
      fetchEmployeeData();
    }, 1000);
  }
  
  async function generateReport(staff) {
    if (!startDate.value || !endDate.value) {
      alert("Please select both start and end dates.");
      return;
    }

    dialog.value = false;
    try {
      const config = useRuntimeConfig();
      const response = await axios.get(
        `${config.public.apiBaseUrl}/reports/staff/${selectedStaff.value.id}`,
        {
          params: {
            start_date: formattedStartDate.value,
            end_date: formattedEndDate.value,
          },
          responseType: "blob",
        }
      );
  
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
  
      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${selectedStaff.value.first_name}-report.pdf`); // Set the file name
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
    }
  }
  </script>
    