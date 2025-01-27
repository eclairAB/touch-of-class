<template>
    <div class="w-100 h-100 d-flex justify-center align-center px-10 py-15">
      <v-col class="h-100">
        <v-row class="mx-10 px-10 ga-5 h-100">
          <div class="flex-grow-1 h-100">
            <StylistComission />
          </div>
        </v-row>
      </v-col>
    </div>
  </template>
  <script setup>
import { useUserStore } from "@/stores/user";
  const userStore = useUserStore();
  // userStore.checkBranch();
  </script>