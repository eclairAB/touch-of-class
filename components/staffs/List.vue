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
    <v-data-iterator
      v-if="false"
      class="px-5"
      :items="clients"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1
          class="text-h4 font-weight-bold d-flex justify-space-between mb-4 pt-5 align-center"
        >
          <!-- <div class="text-truncate">Most popular mice</div> -->
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
              <span class="text-decoration-underline text-none">See all</span>
            </v-btn>

            <div class="d-inline-flex">
              <v-btn
                :disabled="page === 1"
                class="me-2"
                icon="mdi-arrow-left"
                size="small"
                variant="tonal"
                @click="prevPage"
              ></v-btn>

              <v-btn
                :disabled="page === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                @click="nextPage"
              ></v-btn>
            </div>
          </div>
        </h1>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
            <v-sheet border>
              <v-img
                :gradient="`to top right, rgba(255, 255, 255, .1), rgba(255, 255, 255, .15)`"
                :src="item.raw.img"
                height="150"
                cover
              ></v-img>

              <v-list-item title="Name" density="comfortable" lines="two">
                <template v-slot:title>
                  <strong class="text-h6">
                    {{ item.raw.first_name }} {{ item.raw.last_name }}
                    <v-btn
                      flat
                      color="blue-lighten-5"
                      class="text-none ml-1 mb-1"
                      @click="editClicked(item.raw)"
                      density="comfortable"
                      size="small"
                      icon="mdi-pencil"
                    />
                  </strong>
                </template>
              </v-list-item>

              <v-table class="text-caption" density="compact">
                <tbody>
                  <tr align="right">
                    <th>Payment Balances:</th>

                    <td>₱ {{ item.raw.balances || 0 }}</td>
                  </tr>

                  <tr align="right">
                    <th>Pending Sessions:</th>

                    <td>{{ item.raw.sessions || 0 }}</td>
                  </tr>

                  <tr align="right">
                    <th>Pending Services:</th>

                    <td>{{ item.raw.combo || 0 }}</td>
                  </tr>

                  <tr align="right">
                    <th>Loyalty Card 1:</th>

                    <td>{{ item.raw.loyalty_card_1 || 0 }} redeemed</td>
                  </tr>

                  <tr align="right">
                    <th>Loyalty Card 2:</th>

                    <td>{{ item.raw.loyalty_card_2 || 0 }} redeemed</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount }">
        <v-footer
          class="justify-space-between text-body-2 mt-4"
          color="surface-variant"
        >
          Total clients: {{ clients.length }}

          <div>Page {{ page }} of {{ pageCount }}</div>
        </v-footer>
      </template>
    </v-data-iterator>
    <ClientsSingle />
    <FormStaffDialog @exitDialog="exitDialog" />
  </v-card>
</template>
  <script setup>
const { $api } = useNuxtApp();
import { useFormDialogStore } from "@/stores/formDialog";
const formDialogStore = useFormDialogStore();
const filter = ref({});
const itemsPerPage = ref(4);
const clients = ref([]);
const searchTimeout = ref(0);

const listHeader = ref([
  { title: "Name", key: "name" },
  { title: "email", key: "email" },
  { title: "contact", key: "contact_number" },
  { title: "role", key: "role" },
  { title: "actions", key: "actions" },
]);

const onClickSeeAll = () => {
  itemsPerPage.value = itemsPerPage.value === 4 ? clients.value.length : 4;
};

const fetchUserData = async () => {
  try {
    const payload = filter.value;
    const response = await $api.post(`/staffs/search/`, payload);
    let userArray = response.data;

    //   for (let id in userArray) {
    //     let _combo = 0;
    //     let _session = 0;
    //     let _balance = 0;

    //     if (userArray[id].appointments) {
    //       for (let appointment of userArray[id].appointments) {
    //         if (appointment.combo) _combo++;
    //         if (appointment.package) _session++;
    //       }
    //     }

    //     userArray[id].img = "https://bit.ly/4dnXrBi";
    //     userArray[id].combo = _combo;
    //     userArray[id].session = _session;
    //   }

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
  