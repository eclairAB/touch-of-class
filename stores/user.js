import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    username: [],
    role: "",
    branch: {
      select: "",
      dialog: false,
    },
  }),
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setRole(role) {
      this.role = role;
      // localStorage.setItem("role", role);
    },
    setBranch(branch) {
      this.branch = branch;
    },
    checkBranch() {
      if (this.branch.select == "") {
        this.setBranch({
          select: "",
          dialog: true,
        });
      } else {
        return true;
      }
    },
  },
});
