<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.package.dialog"
      width="auto"
      @afterEnter="dialogOpens"
      @afterLeave="closeDialog"
    >
      <v-card
        class="px-5 pb-4"
        width="700"
        max-width="700"
        prepend-icon="mdi-package-variant-closed"
        text=""
        title="Package Information"
        flat
      >
        <v-form v-model="form_validate">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  :counter="10"
                  label="Package Name"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-number-input
                  v-model="form.sessions"
                  :counter="10"
                  label="Sessions"
                  hide-details
                  variant="outlined"
                  required
                  min="0"
                ></v-number-input>
              </v-col>
              <v-col cols="12" md="6">
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
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <template v-slot:actions>
          <v-btn
            v-if="!create_mode"
            class="text-none"
            color="red"
            size="large"
            @click="deleteAction"
            variant="tonal"
          >
            {{ delete_confirmed ? "Click again to confirm" : "Delete Package" }}
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
const { request } = useNuxtApp().$api;
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

function submit() {
  if (create_mode.value) {
    createPackage();
  } else {
    updatePackage();
  }
}
function dialogOpens() {
  if (formDialog.package.payload) {
    form.value = formDialog.package.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }
}
function closeDialog() {
  emit("exitDialog");
  delete_confirmed.value = false;
  formDialog.setPackage({ dialog: false });
}
function deleteAction() {
  if (delete_confirmed.value) {
    deletePackage();
  } else {
    delete_confirmed.value = true;
  }
}
const createPackage = async () => {
  try {
    const response = await request("post", `/packages/`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Package Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Package.",
    });
  }
};
const updatePackage = async () => {
  try {
    const response = await request(
      "put",
      `/packages/${form.value.id}`,
      form.value
    );
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Package Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Package.",
    });
  }
};
const deletePackage = async () => {
  try {
    const response = await request("delete", `/packages/${form.value.id}`);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Package Deleted!",
    });
    delete_confirmed.value = false;
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Package.",
    });
    delete_confirmed.value = false;
  }
};
</script>
