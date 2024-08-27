import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: {},
  }),
  actions: {
    setClient(alert) {
      this.alert = alert;
      setTimeout(() => {
        this.clearClient()    
      }, 5000);
    },
    clearClient() {
      this.alert = {};
    },
  },
});
