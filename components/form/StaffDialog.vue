<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.staff.dialog"
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
        title="Staff Information"
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
              <v-col cols="12" md="12">
                <v-autocomplete
                  v-model="form.role_id"
                  label="Select Role"
                  :items="roles"
                  variant="outlined"
                  item-title="name"
                  item-value="id"
                  chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  placeholder="Enter Password"
                  variant="outlined"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  :type="visible ? 'text' : 'password'"
                  @click:append-inner="visible = !visible"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="" v-if="form.password">
                <v-text-field
                  v-model="form.confirm_password"
                  label="Confirm Password"
                  placeholder="Re-enter Password"
                  variant="outlined"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  :type="visible ? 'text' : 'password'"
                  @click:append-inner="visible = !visible"
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
            {{ delete_confirmed ? "Click again to confirm" : "Delete Staff" }}
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
const roles = ref([]);
const visible = ref(false);

// Form
const form = ref({});
const form_validate = ref(false);
const create_mode = ref(true);
const delete_confirmed = ref(false);

const fetchRoles = async () => {
  try {
    const response = await $api.get(`/staffs/roles/`);
    roles.value = response.data;
  } catch (error) {
    console.error("Failed to fetch roles data:", error);
  }
};
function submit() {
  if (create_mode.value) {
    createStaff();
  } else {
    updateStaff();
  }
}
function dialogOpens() {
  fetchRoles();
  if (formDialog.staff.payload) {
    form.value = formDialog.staff.payload;
    create_mode.value = false;
  } else {
    form.value = {};
    create_mode.value = true;
  }
}
function closeDialog() {
  emit("exitDialog");
  delete_confirmed.value = false;
  formDialog.setStaff({ dialog: false });
}
function deleteAction() {
  if (delete_confirmed.value) {
    deleteStaff();
  } else {
    delete_confirmed.value = true;
  }
}
const createStaff = async () => {
  try {
    const response = await $api.post(`/staffs/`, form.value);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Staff Created!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create staff data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to create Staff.",
    });
  }
};
const updateStaff = async () => {
  try {
    const response = await $api.put(`/staffs/${form.value.id}`, form.value);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Staff Updated!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create staff data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Update Staff.",
    });
  }
};
const deleteStaff = async () => {
  try {
    const response = await $api.delete(`/staffs/${form.value.id}`);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Staff Deleted!",
    });
    closeDialog();
  } catch (error) {
    // console.error("Failed to create staff data:", error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Delete Staff.",
    });
  }
};
</script>
  