<template>
    <v-card flat border class="w-75">
      <v-toolbar color="orange-lighten-4">
        <v-toolbar-title>
          <b>Expenses</b>
          <v-btn
            class="text-none ml-10"
            size="large"
            @click="addExpense()"
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
          label="Search by expense"
          variant="solo"
          hide-details
          single-line
          flat
          class="mr-5"
        ></v-text-field>
      </v-toolbar>
      <v-data-table :headers="listHeader" :items="clients">
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
      <ClientsSingle />
      <FormExpenseDialog @exitDialog="exitDialog" />
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
  
  const listHeader = ref([
    { title: "Expense Name", key: "expense_name" },
    { title: "Amount", key: "amount" },
    { title: "actions", key: "actions" },
  ]);
  
  const fetchExpenseData = async () => {
    try {
      const payload = filter.value;
      const response = await request("get", `/expenses/`, payload);
  
      clients.value = response;
    } catch (error) {
      console.error("Failed to fetch expense data:", error);
    }
  };
  fetchExpenseData();
  
  function editClicked(client) {
    formDialogStore.setExpense({ dialog: true, payload: client });
  }
  function addExpense() {
    formDialogStore.setExpense({ dialog: true });
  }
  function exitDialog() {
    fetchExpenseData();
  }
  function searchEntry() {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
      // Stopped typing
      fetchExpenseData();
    }, 1000);
  }
  </script>
    