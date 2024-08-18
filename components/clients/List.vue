<template>
  <v-card flat border>
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title><b>Clients</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>
    <v-data-iterator
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
                  </strong>
                </template>
              </v-list-item>

              <v-table class="text-caption" density="compact">
                <tbody>
                  <tr align="right">
                    <th>Payment Balances:</th>

                    <td>₱ {{ item.raw.balances }}</td>
                  </tr>

                  <tr align="right">
                    <th>Pending Sessions:</th>

                    <td>{{ item.raw.pending_sessions }}</td>
                  </tr>

                  <tr align="right">
                    <th>Pending Services:</th>

                    <td>{{ item.raw.pending_services }}</td>
                  </tr>

                  <tr align="right">
                    <th>Loyalty Card 1:</th>

                    <td>{{ item.raw.loyalty_card_1 }} redeemed</td>
                  </tr>

                  <tr align="right">
                    <th>Loyalty Card 2:</th>

                    <td>{{ item.raw.loyalty_card_2 }} redeemed</td>
                  </tr>
                </tbody>
              </v-table>
              <v-btn
                flat
                color="grey-lighten-3"
                class="text-none"
                block
                @click="moreInfoClicked(item.raw)"
              >
                More info
              </v-btn>
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
  </v-card>
</template>
<script setup>
import { useClientStore } from "@/stores/client";
const clientStore = useClientStore();
const itemsPerPage = ref(4);
const clients = ref([
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Client",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Generous",
    last_name: "Spender",
    balances: 5000,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",
    first_name: "Mrs. Ford",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Zeus",
    last_name: "Spender",
    balances: 10000,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",
    first_name: "Mrs. Fashion",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Client",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Generous",
    last_name: "Spender",
    balances: 5000,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
  {
    img: "https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",
    first_name: "Mrs. Ford",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: 4,
    pending_services: 2,
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
]);

const onClickSeeAll = () => {
  itemsPerPage.value = itemsPerPage.value === 4 ? clients.value.length : 4;
};

function moreInfoClicked(client) {
  // console.log(clientStore);
  clientStore.setClient(client);
}
</script>
