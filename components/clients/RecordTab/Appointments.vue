<template>
  <v-sheet class="appointment-tab pa-5 d-flex flex-wrap ga-2">
    <v-timeline align="start" side="end" truncate-line="start">
      <v-timeline-item
        v-for="(item, index) in appointments"
        :key="index"
        dot-color="pink"
        size="small"
      >
        <template v-slot:opposite>
          <strong class="me-4">{{ formatDate(item.created_at) }}</strong>
        </template>
        <!-- Package -->
        <v-card
          flat
          border
          class="py-2 px-4"
          v-if="item.variation == 'package'"
        >
          <strong>{{ item.name }} </strong>
          <i class="text-grey text-caption"> - {{ item.variation }}</i>
          <div class="text-caption">
            Availed sessions: {{ item.claimed }}/{{ item.sessions }}
          </div>
          <v-card-actions>
            <v-btn color="blue" class="text-none" @click="availClicked(item)"
              >Avail</v-btn
            >
            <v-btn color="green" class="text-none">Make Payment</v-btn>
          </v-card-actions>
        </v-card>
        <!-- Combo -->
        <v-card flat border class="py-2 px-4" v-if="item.variation == 'combo'">
          <strong>{{ item.name }} </strong>
          <i class="text-grey text-caption"> - {{ item.variation }}</i>
          <v-card-actions>
            <v-btn color="blue" class="text-none" @click="availClicked(item)"
              >Avail</v-btn
            >
            <v-btn color="green" class="text-none">Make Payment</v-btn>
          </v-card-actions>
          <v-timeline align="start" truncate-line="end">
            <v-timeline-item
              v-for="(service, index1) in item.services"
              :key="index1"
              dot-color="grey"
              size="x-small"
            >
              <div>
                {{ service.service.name }}
                <i class="text-grey text-caption"> - service</i>
                <div class="text-caption">Unavailed</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
        <!-- Service -->
        <v-card
          flat
          border
          class="py-2 px-4"
          v-if="item.variation == 'service'"
        >
          <strong>{{ item.name }} </strong>
          <i class="text-grey text-caption"> - {{ item.variation }}</i>
          <div class="text-caption">Unavailed</div>
          <v-card-actions>
            <v-btn
              color="blue"
              class="text-none"
              @click="availClicked({ item })"
              >Avail</v-btn
            >
            <v-btn color="green" class="text-none">Make Payment</v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-dialog v-model="availDialog.status" width="500" persistent>
      <v-card prepend-icon="mdi-content-cut" title="Product avail">
        <v-col class="px-5">
          <v-chip class="mb-4" color="orange">
            <v-icon icon="mdi-alert-circle" start></v-icon>
            Availing in&nbsp;<strong>{{ userStore.branch.select.name }}</strong
            >&nbsp;Branch
          </v-chip>
          <v-autocomplete
            v-model="availForm.stylist_id"
            label="Select Catering Stylist"
            :items="[]"
            density="comfortable"
            variant="outlined"
            item-value="id"
            chips
          ></v-autocomplete>
          <!-- {{ availForm }} -->
        </v-col>
        <v-card-actions>
          <v-btn
            color="success"
            class="text-none"
            text="confirm avail"
            @click="availDialog.status = false"
          ></v-btn>
          <v-btn
            color="error"
            class="text-none"
            text="cancel"
            @click="availDialog.status = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
  <script setup>
const { $api } = useNuxtApp();
import { useAlertStore } from "@/stores/alertDialog";
import { useUserStore } from "@/stores/user";
import { useFormDialogStore } from "@/stores/formDialog";
const alertDialog = useAlertStore();
const formDialog = useFormDialogStore();
const userStore = useUserStore();

const appointments = ref([]);
const availDialog = ref({});
const availForm = ref({});

const fetchAppointmentsData = async () => {
  try {
    const client_id = formDialog.clientInfo.payload.id;
    const response = await $api.get(`/appointments/${client_id}`);

    response.data.forEach((appointment) => {
      if (appointment.package_redeems.length > 0) {
        insertPackage(appointment.package_redeems);
      }
      if (appointment.combo_redeems.length > 0) {
        insertCombo(appointment.combo_redeems);
      }
      if (appointment.service_redeems.length > 0) {
        insertService(appointment.service_redeems);
      }
    });
    // appointments.value = response.data;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch appointments.",
    });
  }
};
fetchAppointmentsData();

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}

function insertPackage(package_redeems) {
  const result = package_redeems.reduce((acc, redeem) => {
    // Find the existing package in the result array
    const existingPackage = acc.find((pkg) => pkg.name === redeem.package.name);

    // If package doesn't exist, add it with initial values
    if (!existingPackage) {
      acc.push({
        variation: "package",
        name: redeem.package.name,
        sessions: redeem.package.sessions,
        claimed: redeem.branch_id ? 1 : 0,
        created_at: redeem.created_at,
      });
    } else {
      // If the package exists, increment claimed if branch_id is not null
      if (redeem.branch_id) {
        existingPackage.claimed++;
      }
    }

    return acc;
  }, []);

  appointments.value.unshift(...result);
}
function insertCombo(combo_redeems) {
  const result = combo_redeems.reduce((acc, redeem) => {
    // Find the existing package in the result array
    const existingCombo = acc.find((cmb) => cmb.name === redeem.combo.name);

    // If package doesn't exist, add it with initial values
    if (!existingCombo) {
      acc.push({
        variation: "combo",
        name: redeem.combo.name,
        services: redeem.combo.combo_services,
        claimed: redeem.branch_id ? 1 : 0,
        created_at: redeem.created_at,
      });
    } else {
      // If the package exists, increment claimed if branch_id is not null
      if (redeem.branch_id) {
        existingCombo.claimed++;
      }
    }

    return acc;
  }, []);

  appointments.value.unshift(...result);
}
function insertService(service_redeems) {
  service_redeems.forEach((service) => {
    appointments.value.unshift({
      variation: "service",
      name: service.service.name,
      claimed: service.branch_id ? 1 : 0,
      created_at: service.created_at,
    });
  });
}
function availClicked(product) {
  availDialog.value.status = true;
  availForm.value.form = product;
}
</script>