<template>
    <div class="text-center">
      <v-dialog
        v-model="formDialog.employee.dialog"
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
          title="Employee Information"
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
          <v-form ref="staff_form">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.first_name"
                    :error-messages="form_errors.first_name"
                    :hide-details="!form_errors.first_name"
                    :counter="10"
                    label="First name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
  
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.last_name"
                    :error-messages="form_errors.last_name"
                    :hide-details="!form_errors.last_name"
                    :counter="10"
                    label="Last name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    :error-messages="form_errors.email"
                    :hide-details="!form_errors.email"
                    label="E-mail"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.contact_number"
                    :error-messages="form_errors.contact_number"
                    :hide-details="!form_errors.contact_number"
                    label="Contact Number"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="form.assigned_branch_id"
                    :error-messages="form_errors.assigned_branch_id"
                    :hide-details="!form_errors.assigned_branch_id"
                    label="Assign Branch"
                    :items="branches"
                    variant="outlined"
                    item-title="name"
                    item-value="id"
                    chips
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="">
                  <v-text-field
                    v-model="form.password"
                    :error-messages="form_errors.password"
                    :hide-details="!form_errors.password"
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
                    :error-messages="form_errors.confirm_password"
                    :hide-details="!form_errors.confirm_password"
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
  const { request } = useNuxtApp().$api;
  import { useFormDialogStore } from "@/stores/formDialog";
  import { useAlertStore } from "@/stores/alertDialog";
  import { useUserStore } from "@/stores/user";
  const formDialog = useFormDialogStore();
  const alertDialog = useAlertStore();
  const userStore = useUserStore();
  const emit = defineEmits(["exitDialog"]);
  const roles = ref([]);
  const branches = ref([]);
  const visible = ref(false);
  
  // Form
  const form = ref({});
  const form_errors = ref({});
  const create_mode = ref(true);
  const delete_confirmed = ref(false);
  
  const fetchRoles = async () => {
    try {
      const response = await request("get", `/staffs/roles/`);
      response.forEach((element) => {
        let aa = element.name.charAt(0).toUpperCase() + element.name.slice(1);
        console.log(aa)
      });
      roles.value = response;
    } catch (error) {
      console.error("Failed to fetch roles data:", error);
    }
  };
  const fetchBranches = async () => {
    try {
      const response = await request("get", `/branches/`);
      response.forEach((element) => {
        let aa = element.name.charAt(0).toUpperCase() + element.name.slice(1);
        console.log(aa)
      });
      branches.value = response;
    } catch (error) {
      console.error("Failed to fetch roles data:", error);
    }
  };
  const validateForm = async () => {
    const valid = await $refs.staff_form.validate();
  };
  
  function submit() {
    if (create_mode.value) {
      createEmployee();
    } else {
      updateStaff();
    }
  }
  function dialogOpens() {
    fetchRoles();
    fetchBranches();
    if (formDialog.employee.payload) {
      form.value = formDialog.employee.payload;
      create_mode.value = false;
    } else {
      form.value = {};
      create_mode.value = true;
    }
  }
  function closeDialog() {
    emit("exitDialog");
    delete_confirmed.value = false;
    formDialog.setEmployee({ dialog: false });
    form_errors.value = {};
  }
  function deleteAction() {
    if (delete_confirmed.value) {
      deleteStaff();
    } else {
      delete_confirmed.value = true;
    }
  }
  const createEmployee = async () => {
    try {
      const response = await request("post", `/employees/`, form.value);
  
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "New Employee Created!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create staff data:", error);
      if (error.response.data_) {
        console.error(error.response.data_);
        form_errors.value = error.response.data_.errors;
      }
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to create Staff.",
      });
    }
  };
  const updateStaff = async () => {
    try {
      const response = await request(
        "put",
        `/users/${form.value.id}`,
        form.value
      );
  
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Employee Updated!",
      });
      closeDialog();
    } catch (error) {
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Update Employee.",
      });
    }
  };
  const deleteStaff = async () => {
    try {
      const response = await request("delete", `/employees/${form.value.id}`);
  
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Employee Deleted!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create staff data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Delete Employee.",
      });
    }
  };
  </script>
    