<template>
  <v-card flat border width="">
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title><b>Clients Pendings List</b></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-iterator class="ma-7 d-flex" :items="clients">
      <template v-slot:default="{ items }">
        <v-row class="ga-1">
          <template v-for="(item, i) in items" :key="i">
            <v-card class="" flat border v-bind="item.raw">
              <v-col>
                <h5>{{ item.raw.first_name }} {{ item.raw.last_name }}</h5>
                <v-col class="d-flex ga-2">
                  <v-chip
                    class=""
                    color="purple"
                    label
                    v-for="(service, serviceKey) in item.raw.pending_sessions"
                    :key="serviceKey"
                  >
                    {{ service }}
                  </v-chip>
                  <v-chip
                    class=""
                    color="teal"
                    label
                    v-for="(service, serviceKey) in item.raw.pending_services"
                    :key="serviceKey"
                  >
                    {{ service }}
                  </v-chip>
                </v-col>
              </v-col>
            </v-card>
            <br />
          </template>
        </v-row>
      </template>
    </v-data-iterator>
  </v-card>
</template>
<script setup>
const clients = ref([
  {
    img: "https://bit.ly/4dnXrBi",
    first_name: "Mr. Client",
    last_name: "Spender",
    balances: 0,
    email: "client@gmail.com",
    contact: "0987654321",
    pending_sessions: ["Session one", "Session two", "Session three"],
    pending_services: ["haircut", "gluta drip"],
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
    pending_sessions: [],
    pending_services: ["gluta drip"],
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
    pending_sessions: ["Session one", "Session two"],
    pending_services: ["haircut"],
    loyalty_card_1: 5,
    loyalty_card_2: 5,
  },
]);
</script>