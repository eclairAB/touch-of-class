<template>
  <v-card class="mx-auto" flat border>
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title><b>Payments</b></v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>
    <!-- <v-data-table-server
      v-if="commissionTable"
      :items-per-page="commissionTable.itemsPerPage"
      :headers="commissionTable.headers"
      :items="commissionTable.serverItems"
      :items-length="commissionTable.totalItems"
      :loading="commissionTable.loading"
      :search="commissionTable.search"
      item-value="name"
      density="compact"
      class="commision-card px-10 py-5"
      @update:options="loadItems"
    ></v-data-table-server> -->
    <v-data-table-server
      :items-per-page="paymentTable.itemsPerPage"
      :headers="paymentTable.headers"
      :items="paymentTable.serverItems"
      :items-length="paymentTable.totalItems"
      :loading="paymentTable.loading"
      :search="paymentTable.search"
      item-value="name"
      density="compact"
      class="commision-card px-10 py-5"
      @update:options="loadItems"
    ></v-data-table-server>
  </v-card>
</template>
<script setup>
const { request } = useNuxtApp().$api;
const { $myObject } = useNuxtApp();

const commissionTable_ = {
  itemsPerPage: 25,
  headers: [
    {
      title: "Payment Amount",
      align: "start",
      sortable: false,
      key: "name",
    },
    { title: "Client Name", key: "calories", align: "end" },
    { title: "Cashier", key: "iron", align: "end" },
    { title: "Branch", key: "branch", align: "end" },
    // { title: "Payment Type", key: "fat", align: "end" },
    { title: "Reference No.", key: "carbs", align: "end" },
    { title: "Date Time", key: "protein", align: "end" },
    // { title: "Iron (%)", key: "iron", align: "end" },
  ],
  search: "",
  serverItems: [],
  loading: true,
  totalItems: 0,
};
const commissionTable = useState(() => {});
const desserts = useState(() => []);

const paymentTable = ref({
  itemsPerPage: 25,
  headers: [
    {
      title: "Payment Amount",
      align: "start",
      sortable: false,
      key: "name",
    },
    { title: "Client Name", key: "calories", align: "end" },
    { title: "Cashier", key: "cashier.first_name", align: "end" },
    { title: "Branch", key: "branch.name", align: "end" },
    { title: "Reference No.", key: "carbs", align: "end" },
    { title: "Date Time", key: "created_at", align: "end" },
  ],
  search: "",
  serverItems: [],
  loading: true,
  totalItems: 0,
});

onMounted(() => {
  commissionTable.value = commissionTable_;
  desserts.value = $myObject.dessert;
});

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const desserts_ = desserts.value;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = desserts_.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

function loadItems({ page, itemsPerPage, sortBy }) {
  paymentTable.value.loading = true;
  fetchRedeems()
}
async function fetchRedeems() {
  try {
    const response = await request("post", `/redeems/`);
    console.log(12, response);
    paymentTable.value.serverItems = response;
    paymentTable.value.loading = false;
  } catch (error) {
    console.error(error)
  }
}
// fetchRedeems();
</script>