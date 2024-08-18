<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto" @afterLeave="closeDialog">
      <v-card
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
      ></v-skeleton-loader>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="closeDialog"></v-btn>
        </template>
      </v-card>

    </v-dialog>
  </div>
</template>
<script setup>
import { useClientStore } from "@/stores/client";
const clientStore = useClientStore();
const client = computed(() => clientStore.client);

const dialog = useState("clientDialog", () => false);

watch(client, (newValue, oldValue) => {
  if (clientStore.client.first_name) {
    dialog.value = true;
  }
});
function closeDialog() {
  clientStore.clearClient();
  dialog.value = false;
}
</script>
