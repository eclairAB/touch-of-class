<template>
  <div class="d-flex ga-5">
    <v-card flat border class="w-50 h-100 px-5 pb-5">
      <v-card-title class="my-5">
        <h3>New Appointment</h3>
      </v-card-title>
      <v-form class="pt-3 px-5 h-100">
        <v-row class="ga-3">
          <v-autocomplete
            v-model="form.client_id"
            label="Select Client"
            :items="clients"
            density="comfortable"
            variant="outlined"
            :item-title="clientSelectorTitle"
            item-value="id"
            chips
          ></v-autocomplete>
          <v-btn
            class="text-none"
            color="blue-darken-4"
            size="large"
            @click="addClient"
            variant="tonal"
          >
            Add Client
          </v-btn>
        </v-row>
        <v-row class="ga-3">
          <v-combobox
            :closable-chips="_true"
            v-model="form.packages"
            :items="packages"
            chips
            multiple
            label="Select Packages"
            density="comfortable"
            variant="outlined"
            item-title="name"
            clearable
            @update:modelValue="form.amount_paid = grandTotal() / 2"
          ></v-combobox>
        </v-row>
        <v-row class="ga-3">
          <v-combobox
            :closable-chips="_true"
            v-model="form.combos"
            :items="combos"
            chips
            multiple
            label="Select Combos"
            density="comfortable"
            variant="outlined"
            item-title="name"
            clearable
            @update:modelValue="form.amount_paid = grandTotal() / 2"
          ></v-combobox>
        </v-row>
        <v-row>
          <v-combobox
            :closable-chips="_true"
            v-model="form.services"
            :items="services"
            chips
            multiple
            label="Select Services"
            density="comfortable"
            variant="outlined"
            item-title="name"
            clearable
            @update:modelValue="form.amount_paid = grandTotal() / 2"
          ></v-combobox>
        </v-row>
      </v-form>
    </v-card>
    <v-card flat border class="w-50 h-100 px-5 pb-5">
      <v-card-title class="my-5">
        <h3>Payment Information</h3>
      </v-card-title>
      <v-card flat border class="pa-5 h-100">
        <v-col>
          <v-autocomplete
            v-model="form.payment_type"
            :items="['Cash', 'Online', 'Card']"
            chips
            label="Select Payment Type"
            density="comfortable"
            variant="outlined"
            item-title="name"
            clearable
          />
          <v-sheet v-if="form.payment_type == 'Online' || form.payment_type == 'Card'">
            <v-text-field
              v-model="form.biller"
              label="Biller name"
              :hint="form.payment_type == 'Online' ? `( Gcash, Paymaya, etc. )` : `( Credit, Debit )` "
              density="comfortable"
              variant="outlined"
            />
            <v-text-field
              v-model="form.reference"
              label="Reference No."
              density="comfortable"
              variant="outlined"
            />
          </v-sheet>
          <v-number-input
            v-model="form.amount_paid"
            label="Amount Paid"
            density="comfortable"
            variant="outlined"
            :min="grandTotal() / 2"
          />
        </v-col>
      </v-card>
      <v-card
        v-if="form.packages || form.services"
        flat
        border
        class="mt-5 py-5 px-10"
      >
        <v-row class="ga-3 align-self-end">
          <v-col>
            <div
              v-for="(item, index) in form.packages"
              :key="index"
              class="d-flex text-medium-emphasis"
            >
              <span>
                {{ item.name }}
              </span>
              <v-spacer></v-spacer>
              <span> ₱ {{ formatNumber(item.price) }} </span>
            </div>
            <div
              v-for="(item, index) in form.combos"
              :key="index"
              class="d-flex text-medium-emphasis"
            >
              <span>
                {{ item.name }}
              </span>
              <v-spacer></v-spacer>
              <span> ₱ {{ formatNumber(item.price) }} </span>
            </div>
            <div
              v-for="(item, index) in form.services"
              :key="index"
              class="d-flex text-medium-emphasis"
            >
              <span>
                {{ item.name }}
              </span>
              <v-spacer></v-spacer>
              <span> ₱ {{ formatNumber(item.price) }} </span>
            </div>
            <v-divider
              :thickness="2"
              class="border-opacity-25 my-2"
            ></v-divider>
            <div class="d-flex justify-end font-weight-bold">
              <span> Grand Total </span>
              <v-spacer></v-spacer>
              <span> ₱ {{ formatNumber(grandTotal()) }} </span>
            </div>
            <v-sheet v-if="form.amount_paid">
              <div class="d-flex justify-end text-medium-emphasis">
                <span> Amount paid </span>
                <v-spacer></v-spacer>
                <span>
                  <h4>₱ {{ formatNumber(form.amount_paid) }}</h4>
                </span>
              </div>
            </v-sheet>
          </v-col>
          <v-col v-if="grandTotal() != form.amount_paid">
            <v-chip class="ma-2" color="orange-darken-3" label>
              <v-icon icon="mdi-cash-multiple" start></v-icon>
              {{ formatNumber(grandTotal() - form.amount_paid) }}

              <v-tooltip activator="parent" location="end"
                >Payment Balance</v-tooltip
              >
            </v-chip>
          </v-col>
        </v-row>
        <v-col class="d-flex justify-center align-center mt-5">
          <v-btn
            :disabled="!form.client_id"
            class="text-none"
            color="blue"
            size="large"
            @click="createAppointment"
            variant="tonal"
          >
            Create Appointment
          </v-btn>
        </v-col>
      </v-card>
    </v-card>
    <FormClientDialog @exitDialog="exitDialog" />
  </div>
</template>
<script setup>
const { $api } = useNuxtApp();
import { useUserStore } from "@/stores/user";
import { useFormDialogStore } from "@/stores/formDialog";
import { useAlertStore } from "@/stores/alertDialog";
const userStore = useUserStore();
const formDialogStore = useFormDialogStore();
const alertDialog = useAlertStore();
const clients = ref([]);
const packages = ref([]);
const combos = ref([]);
const services = ref([]);

const form = ref({});

const _true = ref(true);
const _false = ref(false);

const grandTotal = () => {
  let total = 0;

  if (form.value.packages) {
    form.value.packages.forEach((element) => {
      total += parseInt(element.price);
    });
  }
  if (form.value.combos) {
    form.value.combos.forEach((element) => {
      total += parseInt(element.price);
    });
  }
  if (form.value.services) {
    form.value.services.forEach((element) => {
      total += parseInt(element.price);
    });
  }
  return total;
};
const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
const clientSelectorTitle = (item) => {
  if (item.id) {
    return `${item.first_name} ${item.last_name}`;
  } else {
    form.value.client_id = "";
  }
};
function addClient() {
  formDialogStore.setClient({ dialog: true });
}
function exitDialog() {
  fetchUserData();
}
const fetchUserData = async () => {
  try {
    const response = await $api.get(`/clients/`);
    clients.value = response.data;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Clients.",
    });
  }
};
const fetchPackageData = async () => {
  try {
    const response = await $api.get(`/packages/`);

    packages.value = response.data;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Packages.",
    });
  }
};
const fetchComboData = async () => {
  try {
    const response = await $api.get(`/combos/`);

    combos.value = response.data;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Combos.",
    });
  }
};
const fetchServiceData = async () => {
  try {
    const response = await $api.get(`/services/`);

    services.value = response.data;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Services.",
    });
  }
};
fetchUserData();
fetchPackageData();
fetchComboData();
fetchServiceData();
const createAppointment = async () => {
  try {
    let payload = form.value;
    payload.package_id = payload.packages ? payload.packages.id : null;
    payload.combo_id = payload.combos ? payload.combos.id : null;
    payload.service_id = payload.services ? payload.services.id : null;
    payload.branch_id = userStore.branch.select.id;
    payload.amount_payable = grandTotal();

    const response = await $api.post(`/appointments/`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Appointment Created!",
    });
    form.value = {};
  } catch (error) {
    console.error(error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Create Appointment.",
    });
  }
};
</script>