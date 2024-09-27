<template>
  <v-sheet class="pa-5 justify-center d-flex flex-wrap ga-2">
    <v-card class="w-100" flat>
      <v-card-actions>
        <v-btn
          class="text-none"
          @click="closeTab()"
          variant="tonal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
    Payment
  </v-sheet>
</template>
<script setup>
const emit = defineEmits(["childEmit"]);

function closeTab() {
  emit("childEmit", 2);
}
</script>