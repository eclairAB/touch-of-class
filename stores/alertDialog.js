import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: {},
  }),
  actions: {
    setAlert(alert) {
      this.alert = alert;
      setTimeout(() => {
        this.hideAlert()    
      }, 5000);
    },
    hideAlert() {
      this.alert = {};
    },
  },
});
