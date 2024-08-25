import { defineStore } from "pinia";

export const useFormDialogStore = defineStore("formDialog", {
  state: () => ({
    client: false,
    appointment: false,
  }),
  actions: {
    setClient(state) {
      this.client = state;
    },
    setAppointment(state) {
      this.appointment = state;
    },
  },
});
