<template>
    <div class="text-center">
      <v-dialog
        v-model="formDialog.deductions.dialog"
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
          :title="`${form.first_name} ${form.last_name} - Deduction`"
          flat
        >
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
                <v-col cols="12" md="12">
                    <v-text-field
                    v-model="deductDate"
                    label="Select Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    @click="datePicker = true"
                    required
                    ></v-text-field>

                    <v-dialog
                    v-model="datePicker"
                    persistent
                    width="320px"
                    >
                    <v-card>
                        <v-date-picker
                        v-model="rawDate"
                        :max="today"
                        @update:model-value="formatDate"
                        ></v-date-picker>
                    </v-card>
                    </v-dialog>
                </v-col>
                <v-col cols="12" md="4">
                    <v-checkbox
                        v-model="isLate"
                        color="red"
                        label="Mark as Late"
                    ></v-checkbox>
                </v-col>
  
                <v-col v-if="isLate" cols="12" md="8">
                  <v-text-field
                    v-model="deduction"
                    :counter="10"
                    label="Deduction"
                    variant="outlined"
                    prepend-icon="mdi-currency-php"
                    placeholder="0.00"
                    @input="sanitizeDeduction"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <template v-slot:actions>
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
  const deductDate = ref("");
  const rawDate = ref(null);
  const datePicker = ref(false);
  const isLate = ref(false);
  const deduction = ref("");
  const today = new Date().toISOString().substr(0, 10);

  deductDate.value = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    }).format(new Date());
  function formatDate(date) {
  if (date) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    deductDate.value = formatter.format(new Date(date));
  }
  datePicker.value = false;
}
  function submit() {
    form.value.isLate = isLate.value;
    form.value.deductDate = deductDate.value;
    form.value.deduction = deduction.value;
    createDeduction();
  }
  function dialogOpens() {
    if (formDialog.deductions.payload) {
      form.value = formDialog.deductions.payload;
    }
  }
  function closeDialog() {
    emit("exitDialog");
    formDialog.setDeduction({ dialog: false });
  }
  function sanitizeDeduction() {
  let value = deduction.value.replace(/[^0-9.]/g, "");
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts[1];
  }
  if (parts[1]?.length > 2) {
    value = `${parts[0]}.${parts[1].substring(0, 2)}`;
  }
  if (value.startsWith(".")) {
    value = "0" + value;
  }
  deduction.value = value;
}
  const createDeduction = async () => {
    try {
      const response = await request("post", `/employees/deduction/`, form.value);
  
      alertDialog.setAlert({
        show: true,
        color: "success",
        content: "Employee Staff Deduction Created!",
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
        content: "Failed to create Staff Deduction.",
      });
    }
  };

  </script>
    