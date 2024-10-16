<template>
  <div class="text-center">
    <client-only>
      <v-dialog
        v-model="userStore.branch.dialog"
        width="400"
        persistent
        @afterEnter="fetchBranchData"
      >
        <!-- {{ userStore.branch }} -->
        <v-card class="">
          <v-card-title class="my-5">
            <h5>Select Current Branch</h5>
          </v-card-title>
          <v-autocomplete
            v-model="userStore.branch.select"
            label="Select Branch"
            :items="branches"
            class="mx-4"
            density="comfortable"
            variant="outlined"
            item-title="name"
            :return-object="_true"
          ></v-autocomplete>
          <v-card-actions>
            <v-btn
              :disabled="!userStore.branch.select"
              color="primary"
              text="Save"
              variant="tonal"
              @click="userStore.branch.dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>
<script setup>
const { request } = useNuxtApp().$api;
import { useUserStore } from "@/stores/user";
import { useAlertStore } from "@/stores/alertDialog";
const alertDialog = useAlertStore();
const userStore = useUserStore();

const branches = ref([]);
const _true = ref(true);

const fetchBranchData = async () => {
  try {
    const response = await request("get", `/branches/`);

    branches.value = response;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Branches.",
    });
  }
};
</script>