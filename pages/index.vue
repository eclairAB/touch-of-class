<template>
  <div class="h-100 w-100 d-flex justify-center align-center">
    <v-sheet
      class="pa-10 align-content-center"
      :height="600"
      :width="600"
      border
      rounded
    >
      <v-col>
        <v-img aspect-ratio="16/9" cover src="/logo.JPG"></v-img>
      </v-col>
      <v-col>
        <v-form @submit.prevent>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.email"
              label="Email"
              placeholder="Enter Email"
              variant="outlined"
              prepend-inner-icon="mdi-account-outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
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
          <v-row class="d-flex justify-center">
            <v-btn
              class="text-none mx-2"
              color="#c6811b"
              size="large"
              @click="loginClicked()"
              prepend-icon="mdi-key"
              variant="tonal"
            >
              Sign in
            </v-btn>
          </v-row>
          <v-radio-group v-model="inputFill" @update:modelValue="setFields">
            <v-radio label="Fill Admin" value="1"></v-radio>
            <v-radio label="Fill Cashier" value="2"></v-radio>
            <v-radio label="Fill Stylist" value="3"></v-radio>
          </v-radio-group>
        </v-form>
      </v-col>
    </v-sheet>
  </div>
</template>
<script setup>
const { $api, $authState } = useNuxtApp();
import { useUserStore } from "@/stores/user";
import { useAlertStore } from "@/stores/alertDialog";

const inputFill = ref(null);
const alertDialog = useAlertStore();
const userStore = useUserStore();
const form = ref({});
const visible = useState("value", () => {
  false;
});

function loginClicked() {
  authenticate();
}
function setFields() {
  switch (inputFill.value) {
    case "1":
      form.value = {
        email: 'admin@example.com',
        password: 'secret'
      }
      break;
    case "2":
      form.value = {
        email: 'cashier@example.com',
        password: 'secret'
      }
      break;
    case "3":
      form.value = {
        email: 'stylist@example.com',
        password: 'secret'
      }
      break;

    default:
      break;
  }
}

const authenticate = async () => {
  try {
    const payload = form.value;
    const response = await $api.post(`/login/`, payload);

    $authState().setAuthToken(response.data.token);

    const route = response.data.role.name;
    userStore.setUsername([response.data.first_name, response.data.last_name]);
    userStore.setRole(route);
    navigateTo(`/${route}`);

    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Login Successful.",
    });
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: error.response.data,
    });
  }
};
</script>