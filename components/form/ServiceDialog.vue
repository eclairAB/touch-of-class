<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.service.dialog"
      width="auto"
      @afterEnter="dialogOpens"
      @afterLeave="closeDialog"
    >
      <v-card
        class="px-5 pb-4"
        width="700"
        max-width="700"
        prepend-icon="mdi-shopping"
        text=""
        title="Service Information"
        flat
      >
        <v-form v-model="form_validate" :readonly="formDisabled()">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.name"
                  :counter="10"
                  label="Service Name"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
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
            v-if="!create_mode && !formDisabled()"
            class="text-none"
            color="red"
            size="large"
            @click="deleteAction"
            variant="tonal"
          >
            {{ delete_confirmed ? "Click again to confirm" : "Delete Service" }}
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

const formDisabled = () => {
  if (form.value.readonly === true) {
    return true;
  } else {
    return false;
  }
};
function submit() {
  if (create_mode.value) {
    createService();
  } else {
    updateService();
  }
}
function dialogOpens() {
  if (formDialog.service.payload) {
    form.value = formDialog.service.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }
}
function closeDialog() {
  emit("exitDialog");
  delete_confirmed.value = false;
  formDialog.setService({ dialog: false });
}
function deleteAction() {
  if (delete_confirmed.value) {
    deleteService();
  } else {
    delete_confirmed.value = true;
  }
}
const createService = async () => {
  try {
    const response = await request("post", `/services/`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Service Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Service.",
    });
  }
};
const updateService = async () => {
  try {
    const response = await request(
      "put",
      `/services/${form.value.id}`,
      form.value
    );
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Service Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Service.",
    });
  }
};
const deleteService = async () => {
  try {
    const response = await request("delete", `/services/${form.value.id}`);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Service Deleted!",
    });
    delete_confirmed.value = false;
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Service.",
    });
    delete_confirmed.value = false;
  }
};
</script>
  