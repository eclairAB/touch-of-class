<template>
  <div>
    <v-data-iterator
      class="px-5"
      :items="combos"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1
          class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          <div class="text-truncate">Combos</div>
          <v-btn
            class="text-none ml-10"
            size="large"
            @click="addCombo()"
            variant="tonal"
          >
            Add Combo
          </v-btn>
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
              <span class="text-decoration-underline text-none">See all</span>
            </v-btn>

            <div class="d-inline-flex">
              <v-btn
                :disabled="page === 1"
                class="me-2"
                icon="mdi-arrow-left"
                size="small"
                variant="tonal"
                @click="prevPage"
              ></v-btn>

              <v-btn
                :disabled="page === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                @click="nextPage"
              ></v-btn>
            </div>
          </div>
        </h1>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
            <v-sheet border>
              <v-list-item title="Name" density="comfortable" lines="two">
                <template v-slot:title>
                  <strong class="text-h6">
                    {{ item.raw.name }}
                    <v-btn
                      flat
                      color="blue-lighten-5"
                      class="text-none ml-1 mb-1"
                      @click="editClicked(item.raw)"
                      density="comfortable"
                      size="small"
                      icon="mdi-pencil"
                    />
                  </strong>
                </template>
              </v-list-item>

              <v-table class="text-caption" density="compact">
                <tbody>
                  <tr align="right">
                    <th>Services:</th>
                    <td>
                      <v-chip-group>
                        <v-spacer></v-spacer>
                        <v-chip
                          v-for="(service, serviceIndex) in item.raw
                            .combo_services"
                          :key="serviceIndex"
                          size="small"
                          @click="peekService(service)"
                        >
                          {{ service.service.name }}

                          <v-tooltip activator="parent" location="top">
                            Click to preview
                          </v-tooltip>
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  <!-- <tr align="right">
                    <th>Stylist Commission:</th>

                    <td>{{ item.raw.commission_percentage || 0 }}%</td>
                  </tr> -->

                  <tr align="right">
                    <th>Price:</th>

                    <td>₱ {{ item.raw.price || 0 }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount }">
        <v-footer
          class="justify-space-between text-body-2 mt-4"
          color="surface-variant"
        >
          Total combos: {{ combos.length }}

          <div>Page {{ page }} of {{ pageCount }}</div>
        </v-footer>
      </template>
    </v-data-iterator>
    <FormComboDialog @exitDialog="exitDialog" />
    <FormServiceDialog @exitDialog="exitDialog" />
  </div>
</template>
<script setup>
const { $api } = useNuxtApp();
import { useFormDialogStore } from "@/stores/formDialog";
import { useAlertStore } from "@/stores/alertDialog";
const formDialogStore = useFormDialogStore();
const alertDialog = useAlertStore();
const itemsPerPage = ref(4);
const combos = ref([]);

const onClickSeeAll = () => {
  itemsPerPage.value = itemsPerPage.value === 4 ? combos.value.length : 4;
};

const fetchServiceData = async () => {
  try {
    const response = await $api.get(`/combos/`);

    combos.value = response.data;
  } catch (error) {
    alertDialog.setClient({
      show: true,
      color: "error",
      content: "Failed to fetch Combos.",
    });
  }
};
fetchServiceData();

function editClicked(payload) {
  formDialogStore.setCombo({ dialog: true, payload: payload });
}

function addCombo() {
  formDialogStore.setCombo({ dialog: true });
}
function exitDialog() {
  fetchServiceData();
}

function peekService(payload) {
  let service = payload.service;
  service.readonly = true;
  formDialogStore.setService({ dialog: true, payload: service });
}
</script>
