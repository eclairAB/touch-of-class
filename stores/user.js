import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    username: "",
    // role: localStorage.getItem("role") || "",
    role: "",
  }),
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setRole(role) {
      this.role = role;
      // localStorage.setItem("role", role);
    },
  },
});
