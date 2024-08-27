<template>
  <div class="mt-10">
    <v-alert
      v-if="alertDialog.alert.show"
      :color="alertDialog.alert.color"
      :icon="`$${alertDialog.alert.color}`"
      theme="dark"
      class="mt-10 mx-8"
      border
      closable  
    >
      {{ alertDialog.alert.content }}
    </v-alert>
  </div>
</template>
<script setup>
import { useAlertStore } from "@/stores/alertDialog";
const alertDialog = useAlertStore();
</script>