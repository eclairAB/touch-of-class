<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.client.dialog"
      width="auto"
      @afterEnter="dialogOpens"
      @afterLeave="closeDialog"
    >
      <v-card
        class="px-5 pb-4"
        width="700"
        max-width="700"
        prepend-icon="mdi-account"
        text=""
        title="Client Information"
        flat
      >
        <v-skeleton-loader
          class="mx-auto w-100"
          max-width="600"
          type="card-avatar, article, actions"
          boilerplate
          v-if="false"
        ></v-skeleton-loader>
        <v-form v-model="form_validate">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.first_name"
                  :counter="10"
                  label="First name"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.last_name"
                  :counter="10"
                  label="Last name"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.contact_number"
                  label="Contact Number"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
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
            {{ delete_confirmed ? "Click again to confirm" : "Delete Client" }}
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

function submit() {
  if (create_mode.value) {
    createClient();
  } else {
    updateClient();
  }
}
function dialogOpens() {
  if (formDialog.client.payload) {
    form.value = formDialog.client.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }
}
function closeDialog() {
  emit("exitDialog");
  formDialog.setClient({ dialog: false });
}
function deleteAction() {
  if (delete_confirmed.value) {
    deleteClient();
  } else {
    delete_confirmed.value = true;
  }
}
const createClient = async () => {
  try {
    const response = await $api.post(`/clients/`, form.value);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Client Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Client.",
    });
  }
};
const updateClient = async () => {
  try {
    const response = await $api.put(`/clients/${form.value.id}`, form.value);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Client Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Client.",
    });
  }
};
const deleteClient = async () => {
  try {
    const response = await $api.delete(`/clients/${form.value.id}`);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Client Deleted!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Client.",
    });
  }
};
</script>
