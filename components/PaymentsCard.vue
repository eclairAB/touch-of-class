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
    <!-- {{ paymentTable.serverItems }} -->
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
      key: "amount_paid",
    },
    { title: "Client Name", key: "name", align: "end" },
    { title: "Cashier", key: "cashier.first_name", align: "end" },
    { title: "Branch", key: "branch.name", align: "end" },
    { title: "Payment Method", key: "payment_method", align: "end" },
    { title: "Reference No.", key: "reference_no", align: "end" },
    { title: "Milestone", key: "payment_milestone", align: "end" },
    { title: "Date", key: "created_at", align: "end" },
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

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}
function clientName(response) {
  let firstName = "";
  let lastName = "";

  if (response.appointment_package) {
    firstName = response.appointment_package.appointment.client.first_name;
    lastName = response.appointment_package.appointment.client.last_name;
  }
  if (response.appointment_combo) {
    firstName = response.appointment_combo.appointment.client.first_name;
    lastName = response.appointment_combo.appointment.client.last_name;
  }
  if (response.appointment_service) {
    firstName = response.appointment_service.appointment.client.first_name;
    lastName = response.appointment_service.appointment.client.last_name;
  }

  return `${firstName} ${lastName}`;
}

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
  // fetchRedeems()
  fetchPayments();
}
async function fetchRedeems() {
  try {
    const response = await request("post", `/redeems/`);
    console.log(12, response);
    paymentTable.value.serverItems = response;
    paymentTable.value.loading = false;
  } catch (error) {
    console.error(error);
  }
}
async function fetchPayments() {
  try {
    let response = await request("get", `/payments/`);

    for (let i in response) {
      response[i].created_at = formatDate(response[i].created_at);
      response[i].name = clientName(response[i]);

      if (response[i].reference_no == null) {
        response[i].reference_no = "N/A";
      }
    }

    paymentTable.value.serverItems = response;
    paymentTable.value.loading = false;
  } catch (error) {
    console.error(error);
  }
}
// fetchRedeems();
</script>