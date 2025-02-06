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
            @change="fetchCommissions"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="filter.end_date"
            label="End Date"
            type="date"
            outlined
            dense
            @change="fetchCommissions"
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
      <template v-slot:item.commission_amount="{ item }">
        <b>₱ {{ item.commission_amount || '0.00' }}</b>
      </template>
      <template v-slot:item.gross_sale="{ item }">
        <b>₱ {{ item.gross_sale || '0.00' }}</b>
      </template>
    </v-data-table>
    <div class="text-right py-4 mr-3" max-width="200">
      <v-row>
        <v-col cols="11" md="11">
          Total Commission:
        </v-col>
        <v-col cols="1" md="1">
          <b>₱ {{ totalcom }}</b>
        </v-col>
        <v-col cols="11" md="11">
          Total Gross Sale:
        </v-col>
        <v-col cols="1" md="1">
          <b>₱ {{ totalgross }}</b>
        </v-col>
      </v-row>
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
  const totalcom = ref(0);
  const totalgross = ref(0);
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
      {
      title: "Gross Sale",
      align: "end",
      sortable: false,
      key: "gross_sale",
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
      totalgross.value = response.total_gross
    } catch (error) {
      console.error(error);
    }
  }
  </script>