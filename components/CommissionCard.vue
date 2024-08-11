<template>
  <div>
    <v-data-table-server
      v-if="commissionTable"
      v-model:items-per-page="commissionTable.itemsPerPage"
      :headers="commissionTable.headers"
      :items="commissionTable.serverItems"
      :items-length="commissionTable.totalItems"
      :loading="commissionTable.loading"
      :search="commissionTable.search"
      item-value="name"
      density="compact"
      class="commision-card"
      @update:options="loadItems"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Service Payments</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup>
const { $myObject } = useNuxtApp();

const commissionTable_ = {
  itemsPerPage: 25,
  headers: [
    {
      title: "Dessert (100g serving)",
      align: "start",
      sortable: false,
      key: "name",
    },
    { title: "Calories", key: "calories", align: "end" },
    { title: "Fat (g)", key: "fat", align: "end" },
    { title: "Carbs (g)", key: "carbs", align: "end" },
    { title: "Protein (g)", key: "protein", align: "end" },
    { title: "Iron (%)", key: "iron", align: "end" },
  ],
  search: "",
  serverItems: [],
  loading: true,
  totalItems: 0,
};
const commissionTable = useState(() => {});
const desserts = useState(() => []);

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
  commissionTable.value.loading = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    commissionTable.value.serverItems = items;
    commissionTable.value.totalItems = total;
    commissionTable.value.loading = false;
  });
}
</script>