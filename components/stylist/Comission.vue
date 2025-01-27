<template>
    <v-card class="mx-auto" flat border>
      <v-toolbar color="orange-lighten-4">
        <v-toolbar-title><b>Commissions</b></v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <v-btn icon="mdi-magnify" variant="text" @click="fetchCommissions"></v-btn>
      </v-toolbar>
      <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="filter.start_date"
            label="Start Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="filter.end_date"
            label="End Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
      <v-data-table
        :headers="comHeader"
        :items="commissions"
        item-value="commission_amount"
        class="elevation-1"
      >
    </v-data-table>
    <div class="text-right py-4 mr-3">
      <b>Total Commission:</b> {{ totalcom }}
    </div>
    </v-card>
  </template>
  <script setup>
  const { request } = useNuxtApp().$api;
  const filter = ref({
    start_date: null,
    end_date: null,
  });
  const commissions = ref([]);
  const totalcom = ref(null);
  const comHeader = ref([
      { title: "Client Name", key: "client" },
      { title: "Package", key: "package" },
      { title: "Combo", key: "combo" },
      { title: "Service", key: "services" },
      { title: "Cashier", key: "cashier" },
      { title: "Date and Time", key: "created_at" },
      {
      title: "Commission",
      align: "end",
      sortable: false,
      key: "commission_amount",
      },
  ])
  const commissionTable = useState(() => {});
  
  onMounted(() => {
    fetchCommissions()
  });
  async function fetchCommissions() {
    try {
      const payload = filter.value;
      const response = await request("post", `/staffs/stylist/commissions`, payload);
      commissions.value = response.data
      totalcom.value = response.total_commission
    } catch (error) {
      console.error(error);
    }
  }
  </script>