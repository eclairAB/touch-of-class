<template>
  <v-sheet class="pa-5 justify-center d-flex flex-wrap ga-2">
    <v-btn
      class="text-none"
      color="#c6811b"
      size="large"
      @click="makePaymentClicked()"
      variant="tonal"
    >
      Make Payment
    </v-btn>
  </v-sheet>
</template>
<script setup>
const emit = defineEmits(['childEmit']);

function makePaymentClicked() {
  emit("childEmit", 1);
}
</script>