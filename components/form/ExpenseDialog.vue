<template>
    <div class="text-center">
      <v-dialog
        v-model="formDialog.expense.dialog"
        width="auto"
        @afterEnter="dialogOpens"
        @afterLeave="closeDialog"
      >
        <v-card
          class="px-5 pb-4"
          width="700"
          max-width="700"
          prepend-icon="mdi-database"
          text=""
          title="Expense Information"
          flat
        >
          <v-form v-model="form_validate" :readonly="formDisabled()">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="form.expense_name"
                    :counter="10"
                    label="Expense Name"
                    hide-details
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-number-input
                    v-model="form.amount"
                    label="Amount"
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
              {{ delete_confirmed ? "Click again to confirm" : "Delete Expense" }}
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
      createExpense();
    } else {
      updateExpense();
    }
  }
  function dialogOpens() {
    if (formDialog.expense.payload) {
      console.log(formDialog.expense.payload)
      form.value = formDialog.expense.payload;
      create_mode.value = false;
    } else {
      form.value = {};
      create_mode.value = true;
    }
  }
  function closeDialog() {
    emit("exitDialog");
    delete_confirmed.value = false;
    formDialog.setExpense({ dialog: false });
  }
  function deleteAction() {
    if (delete_confirmed.value) {
      deleteExpense();
    } else {
      delete_confirmed.value = true;
    }
  }
  const createExpense = async () => {
    try {
      const response = await request("post", `/expenses/`, form.value);
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "New Expense Created!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to create Expense.",
      });
    }
  };
  const updateExpense = async () => {
    try {
      const response = await request(
        "put",
        `/expenses/${form.value.id}`,
        form.value
      );
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Expense Updated!",
      });
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Update Expense.",
      });
    }
  };
  const deleteExpense = async () => {
    try {
      const response = await request("delete", `/expenses/${form.value.id}`);
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Expense Deleted!",
      });
      delete_confirmed.value = false;
      closeDialog();
    } catch (error) {
      // console.error("Failed to create client data:", error);
      alertDialog.setAlert({
        show: true,
        color: "error",
        content: "Failed to Delete Expense.",
      });
      delete_confirmed.value = false;
    }
  };
  </script>
      