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
              v-model="form.username"
              label="Username"
              placeholder="Enter Username"
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
              @click="loginClicked('/admin')"
              prepend-icon="mdi-key"
              variant="tonal"
            >
              Login as admin
            </v-btn>
            <v-btn
              class="text-none mx-2"
              color="#c6811b"
              size="large"
              @click="loginClicked('/cashier')"
              prepend-icon="mdi-key"
              variant="tonal"
            >
              Login as cashier
            </v-btn>
            <v-btn
              class="text-none mt-3"
              color="#c6811b"
              size="large"
              @click="loginClicked('/beautician')"
              prepend-icon="mdi-key"
              variant="tonal"
            >
              Login as beautician
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-sheet>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const form = {};
const visible = useState('value', () => { false });

function loginClicked(route) {
  userStore.setUsername(form.username);
  navigateTo(route);
}
</script>