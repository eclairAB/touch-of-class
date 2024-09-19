<template>
    <div class="text-center">
      <v-dialog
        v-model="formDialog.branch.dialog"
        width="auto"
        @afterEnter="dialogOpens"
        @afterLeave="closeDialog"
      >
        <v-card
          class="px-5 pb-4"
          width="700"
          max-width="700"
          prepend-icon="mdi-store"
          text=""
          title="Branch Information"
          flat
        >
          <v-form v-model="form_validate" :readonly="formDisabled()">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="form.name"
                    :counter="10"
                    label="Branch Name"
                    hide-details
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <v-number-input
                    v-model="form.commission_percentage"
                    label="Commission Percentage"
                    hide-details
                    variant="outlined"
                    required
                    min="0"
                  ></v-number-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-number-input
                    v-model="form.price"
                    label="Price"
                    hide-details
                    variant="outlined"
                    required
                    min="0"
                  ></v-number-input>
                </v-col> -->
              </v-row>
            </v-container>
          </v-form>
          <template v-slot:actions>
            <v-btn
              v-if="!create_mode && !formDisabled()"
              class="text-none"
              color="red"
              size="large"
              @click="deleteAction"
              variant="tonal"
            >
              {{ delete_confirmed ? "Click again to confirm" : "Delete Branch" }}
            </v-btn>
            <v-spacer />
            <v-btn
              class="text-none"
              color="red"
              size="large"
              @click="closeDialog"
              variant="tonal"
            >
              Close
            </v-btn>
            <v-btn
              v-if="!formDisabled()"
              class="text-none"
              color="blue"
              size="large"
              @click="submit"
              variant="tonal"
            >
              Submit
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
    <script setup>
  const { $api } = useNuxtApp();
  import { useFormDialogStore } from "@/stores/formDialog";
  import { useAlertStore } from "@/stores/alertDialog";
  
  const formDialog = useFormDialogStore();
  const alertDialog = useAlertStore();
  const emit = defineEmits(["exitDialog"]);
  
  // Form
  const form = ref({});
  const form_validate = ref(false);
  const create_mode = ref(true);
  const delete_confirmed = ref(false);
  
  const formDisabled = () => {
    if (form.value.readonly === true) {
      return true;
    } else {
      return false;
    }
  };
  function submit() {
    if (create_mode.value) {
      createBranch();
    } else {
      updateBranch();
    }
  }
  function dialogOpens() {
    if (formDialog.branch.payload) {
      form.value = formDialog.branch.payload;
      create_mode.value = false;
    } else {
      form.value = {};
      create_mode.value = true;
    }
  }
  function closeDialog() {
    emit("exitDialog");
    delete_confirmed.value = false;
    formDialog.setBranch({ dialog: false });
  }
  function deleteAction() {
    if (delete_confirmed.value) {
      deleteBranch();
    } else {
      delete_confirmed.value = true;
    }
  }
  const createBranch = async () => {
    try {
      const response = await $api.post(`/branches/`, form.value);
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "New Branch Created!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to create Branch.",
      });
    }
  };
  const updateBranch = async () => {
    try {
      const response = await $api.put(`/branches/${form.value.id}`, form.value);
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Branch Updated!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Update Branch.",
      });
    }
  };
  const deleteBranch = async () => {
    try {
      const response = await $api.delete(`/branches/${form.value.id}`);
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Branch Deleted!",
      });
      delete_confirmed.value = false;
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Delete Branch.",
      });
      delete_confirmed.value = false;
    }
  };
  </script>
    