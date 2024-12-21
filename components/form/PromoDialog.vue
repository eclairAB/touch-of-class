<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.promo.dialog"
      width="auto"
      @afterEnter="dialogOpens"
      @afterLeave="closeDialog"
    >
      <v-card
        class="px-5 pb-4"
        width="700"
        max-width="700"
        prepend-icon="mdi-sale"
        text=""
        title="Promo Information"
        flat
      >
        <!-- {{ form.id }} : {{ userStore }} -->
        <v-skeleton-loader
          class="mx-auto w-100"
          max-width="600"
          type="card-avatar, article, actions"
          boilerplate
          v-if="false"
        ></v-skeleton-loader>
        <v-form ref="promo_form">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.discount_name"
                  :error-messages="form_errors.first_name"
                  :hide-details="!form_errors.first_name"
                  :counter="10"
                  label="Promo name"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-number-input
                  v-model="form.amount"
                  :error-messages="form_errors.email"
                  :hide-details="!form_errors.email"
                  label="Promo amount"
                  variant="outlined"
                  required
                ></v-number-input>
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="form.percentage"
                  color="green"
                  label="Is the promo in a form of percentage?"
                  hide-details
                  inset
                ></v-switch>
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
            {{ delete_confirmed ? "Click again to confirm" : "Delete Promo" }}
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
const roles = ref([]);
const visible = ref(false);

// Form
const form = ref({});
const form_errors = ref({});
const create_mode = ref(true);
const delete_confirmed = ref(false);

function submit() {
  if (create_mode.value) {
    createPromo();
  } else {
    updatePromo();
  }
}
function dialogOpens() {
  if (formDialog.promo.payload) {
    form.value = formDialog.promo.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }
}
function closeDialog() {
  emit("exitDialog");
  delete_confirmed.value = false;
  formDialog.setPromo({ dialog: false });
  form_errors.value = {};
}
function deleteAction() {
  if (delete_confirmed.value) {
    deletePromo();
  } else {
    delete_confirmed.value = true;
  }
}
const createPromo = async () => {
  try {
    const response = await request("post", `/discounts/`, form.value);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Promo Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create promo data:", error);
    if (error.response.data_) {
      console.error(error.response.data_);
      form_errors.value = error.response.data_.errors;
    }
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Promo.",
    });
  }
};
const updatePromo = async () => {
  try {
    const response = await request(
      "put",
      `/discounts/${form.value.id}`,
      form.value
    );

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Promo Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create promo data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Promo.",
    });
  }
};
const deletePromo = async () => {
  try {
    const response = await request("delete", `/discounts/${form.value.id}`);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Promo Deleted!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create promo data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Promo.",
    });
  }
};
</script>
  