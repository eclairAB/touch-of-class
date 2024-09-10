import { defineStore } from "pinia";

export const useFormDialogStore = defineStore("formDialog", {
  state: () => ({
    client: {
      dialog: false,
      payload: {},
    },
    appointment: {
      dialog: false,
      payload: {},
    },
    package: {
      dialog: false,
      payload: {},
    },
    combo: {
      dialog: false,
      payload: {},
    },
    service: {
      dialog: false,
      payload: {},
    },
  }),
  actions: {
    setClient(state) {
      this.client = state;
    },
    setAppointment(state) {
      this.appointment = state;
    },
    setPackage(state) {
      this.package = state;
    },
    setCombo(state) {
      this.combo = state;
    },
    setService(state) {
      this.service = state;
    },
  },
});
