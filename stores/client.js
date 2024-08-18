import { defineStore } from "pinia";

export const useClientStore = defineStore("client", {
  state: () => ({
    client: {},
  }),
  actions: {
    setClient(client) {
      this.client = client;
    },
    clearClient() {
      this.client = {};
    },
  },
});
