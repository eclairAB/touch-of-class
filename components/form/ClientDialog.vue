<template>
  <div class="text-center">
    <v-dialog
      v-model="formDialog.client"
      width="auto"
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
          <v-btn class="ms-auto" text="Ok" @click="closeDialog"></v-btn>
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
const formDialog = useFormDialogStore();

// Form
const form = ref({});
const form_validate = ref(false);

function submit() {
  createClient();
}
function closeDialog() {
  formDialog.setClient(false);
}
const createClient = async () => {
  try {
    const response = await $api.post(`/clients/`, form.value);

    alert('Client created!')
  } catch (error) {
    console.error("Failed to create client data:", error);
  }
};
</script>
