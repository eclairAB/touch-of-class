<template>
  <div>
    <v-data-iterator
      class="px-5 mt-10"
      :items="branches"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1
          class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          <div class="text-truncate">Branches</div>
          <v-btn
            class="text-none ml-10"
            size="large"
            @click="addBranch()"
            variant="tonal"
          >
            Add Branch
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
                      color="grey-lighten-3"
                      class="text-none ml-3 mb-1"
                      @click="editClicked(item.raw)"
                      density="comfortable"
                      size="small"
                      icon="mdi-pencil"
                    />
                    <v-btn
                      flat
                      rounded
                      color="grey-lighten-3"
                      class="text-none ml-3 mb-1"
                      size="small"
                      prepend-icon="mdi-download"
                      @click="openDialog(item.raw)"
                    >
                      Generate Report
                    </v-btn>
                    <v-btn
                      flat
                      rounded
                      color="grey-lighten-3"
                      class="text-none ml-3 mb-1"
                      size="small"
                      prepend-icon="mdi-download"
                      @click="generateTodaysReport(item.raw)"
                    >
                      Generate Daily Report
                    </v-btn>
                  </strong>
                </template>
              </v-list-item>

              <v-table class="text-caption" density="compact" v-if="false">
                <tbody>
                  <tr align="right">
                    <th>Stylist Commission:</th>

                    <td>{{ item.raw.commission_percentage || 0 }}%</td>
                  </tr>

                  <tr align="right">
                    <th>Price:</th>

                    <td>₱ {{ item.raw.price || 0 }}</td>
                  </tr>
                </tbody>
              </v-table>
              <!-- <v-btn
                flat
                color="grey-lighten-3"
                class="text-none"
                block
                @click="editClicked(item.raw)"
              >
                Edit
              </v-btn> -->
            </v-sheet>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount }">
        <v-footer
          class="justify-space-between text-body-2 mt-4"
          color="surface-variant"
        >
          Total branches: {{ branches.length }}

          <div>Page {{ page }} of {{ pageCount }}</div>
        </v-footer>
      </template>
    </v-data-iterator>
    <FormBranchDialog @exitDialog="exitDialog" />
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Select Report Period</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
          ></v-select>

          <v-select
            v-model="selectedYear"
            :items="years"
            label="Select Year"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="generateReport">Generate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
  <script setup>
import { useFormDialogStore } from "@/stores/formDialog";
import { useAlertStore } from "@/stores/alertDialog";
import axios from 'axios';
const { request } = useNuxtApp().$api;
const formDialogStore = useFormDialogStore();
const alertDialog = useAlertStore();
const itemsPerPage = ref(8);
const branches = ref([]);
const dialog = ref(false);
const selectedMonth = ref(null);
const selectedYear = ref(null);
const selectedBranch = ref(null);

const months = [
  { title: "January", value: 1 },
  { title: "February", value: 2 },
  { title: "March", value: 3 },
  { title: "April", value: 4 },
  { title: "May", value: 5 },
  { title: "June", value: 6 },
  { title: "July", value: 7 },
  { title: "August", value: 8 },
  { title: "September", value: 9 },
  { title: "October", value: 10 },
  { title: "November", value: 11 },
  { title: "December", value: 12 }
];

const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

function openDialog(branch) {
  selectedBranch.value = branch;
  dialog.value = true;
}
const onClickSeeAll = () => {
  itemsPerPage.value = itemsPerPage.value === 8 ? branches.value.length : 8;
};

const fetchServiceData = async () => {
  try {
    const response = await request("get", `/branches/`);

    branches.value = response;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Branches.",
    });
  }
};
fetchServiceData();

function editClicked(payload) {
  formDialogStore.setBranch({ dialog: true, payload: payload });
}

function addBranch() {
  formDialogStore.setBranch({ dialog: true });
}
function exitDialog() {
  fetchServiceData();
}

async function generateReport(branch) {
  try {
    const config = useRuntimeConfig();
    const params = { month: selectedMonth.value, year: selectedYear.value };
    const response = await axios.get(`${config.public.apiBaseUrl}/reports/branch/${selectedBranch.value.id}`, {
      params,
      responseType: "blob", // Set response type to blob for binary data
    });

    const blobUrl = URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${selectedBranch.value.name}-report.pdf`); // Set the file name
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    dialog.value = false;
  } catch (error) {
    console.error(error);
  }
}

async function generateTodaysReport(branch) {
  try {
    const config = useRuntimeConfig();
    const today = new Date();
    const params = { 
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      day: today.getDate()
    };
    const response = await axios.get(
      `${config.public.apiBaseUrl}/reports/branch/${branch.id}`,
      {
        params,
        responseType: "blob",
      }
    );

    const blobUrl = URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${branch.name}-report-today.pdf`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(error);
  }
}
</script>
