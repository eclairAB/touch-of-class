<template>
  <v-sheet class="pa-5 justify-center d-flex flex-wrap ga-2">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="view-loyalty-card-container"
    >
      <img :src="card.url" alt="Loyalty Card" @click="() => showImg(index)" />
      <br>
      <small>
        {{ card.upload_date }}
      </small>
    </div>
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="cards"
      :index="indexRef"
      @hide="onHide"
    />
  </v-sheet>
</template>
<script setup>
import { useAlertStore } from "@/stores/alertDialog";
import { useFormDialogStore } from "@/stores/formDialog";
const { request } = useNuxtApp().$api;
const alertDialog = useAlertStore();
const formDialog = useFormDialogStore();

const cards = ref([]);
const visibleRef = ref(false);
const indexRef = ref(0);

async function fetchCards() {
  try {
    const client_id = formDialog.clientInfo.payload.id;
    const response = await request(
      "get",
      `/product/fetch_loyalty_card/${client_id}`
    );
    Object.values(response).forEach((card) => {
      cards.value.push(card);
    });
  } catch (error) {
    console.error(error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Loyalty Card Images.",
    });
  }
}
fetchCards();

const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);
</script>