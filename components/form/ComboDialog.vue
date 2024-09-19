<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.combo.dialog"
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
        title="Combo Information"
        flat
      >
        <v-form v-model="form_validate" :readonly="formDisabled()">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.name"
                  :counter="10"
                  label="Combo Name"
                  hide-details
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-autocomplete
                  v-model="form.services"
                  item-value="id"
                  item-title="name"
                  :items="services"
                  chips
                  closable-chips="true"
                  multiple
                  label="Select Services"
                  variant="outlined"
                  clearable
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :title="item.raw.name"
                      :subtitle="'₱ ' + item.raw.price"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
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
            {{ delete_confirmed ? "Click again to confirm" : "Delete Combo" }}
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

const services = ref({});

const mapServiceId = () => {
  const combo_services = form.value.combo_services;
  let mappedServiceId = [];

  combo_services.map((service) => {
    mappedServiceId.push(service.service_id);
  });
  form.value.services = mappedServiceId;
};
const formDisabled = () => {
  if (form.value.readonly === true) {
    return true;
  } else {
    return false;
  }
};
function submit() {
  if (create_mode.value) {
    createCombo();
  } else {
    updateCombo();
  }
}
function dialogOpens() {
  if (formDialog.combo.payload) {
    form.value = formDialog.combo.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }

  mapServiceId();
}
function closeDialog() {
  emit("exitDialog");
  delete_confirmed.value = false;
  formDialog.setCombo({ dialog: false });
}
function deleteAction() {
  if (delete_confirmed.value) {
    deleteCombo();
  } else {
    delete_confirmed.value = true;
  }
}
const createCombo = async () => {
  try {
    const response = await $api.post(`/combos/`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Combo Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Combo.",
    });
  }
};
const updateCombo = async () => {
  try {
    const response = await $api.put(`/combos/${form.value.id}`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Combo Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Combo.",
    });
  }
};
const deleteCombo = async () => {
  try {
    const response = await $api.delete(`/combos/${form.value.id}`);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Combo Deleted!",
    });
    delete_confirmed.value = false;
    closeDialog();
  } catch (error) {
    // console.error("Failed to create client data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Combo.",
    });
    delete_confirmed.value = false;
  }
};

const fetchServiceData = async () => {
  try {
    const response = await $api.get(`/services/`);

    services.value = response.data;
  } catch (error) {
    alertDialog.setClient({
      show: true,
      color: "error",
      content: "Failed to fetch Services.",
    });
  }
};
fetchServiceData();
</script>
  