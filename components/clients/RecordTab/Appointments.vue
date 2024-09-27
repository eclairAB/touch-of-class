<template>
  <v-sheet class="appointment-tab pa-5 d-flex flex-wrap ga-2">
    <v-timeline align="start" side="end">
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
        <div v-if="item.variation == 'package'">
          <div>
            <strong>{{ item.name }} </strong>&nbsp;
            <i class="text-grey">- {{ item.variation }}</i>
            <div class="text-caption">
              Sessions: {{ item.claimed }}/{{ item.sessions }}
            </div>
          </div>
        </div>
        <!-- Combo -->
        <div v-if="item.variation == 'combo'">
          <strong>{{ item.name }} </strong>&nbsp;
          <i class="text-grey">- {{ item.variation }}</i>
          <v-timeline align="start" side="end" truncate-line="end">
            <v-timeline-item
              v-for="(service, index1) in item.services"
              :key="index1"
              dot-color="grey"
              size="x-small"
            >
              <div>
                {{ service.service.name }}&nbsp;
                <i class="text-grey">- service</i>
                <div class="text-caption">Unavailed</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
        <!-- Service -->
        <div v-if="item.variation == 'service'">
          <strong>{{ item.name }} </strong>&nbsp;
          <i class="text-grey">- {{ item.variation }}</i>
          <div class="text-caption">Unavailed</div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-sheet>
</template>
  <script setup>
const { $api } = useNuxtApp();
import { useAlertStore } from "@/stores/alertDialog";
const alertDialog = useAlertStore();
const appointments = ref([]);

const fetchAppointmentsData = async () => {
  try {
    const response = await $api.get(`/appointments/`);

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

  appointments.value.push(...result);
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

  appointments.value.push(...result);
}
function insertService(service_redeems) {
  service_redeems.forEach((service) => {
    appointments.value.push({
      variation: "service",
      name: service.service.name,
      claimed: service.branch_id ? 1 : 0,
      created_at: service.created_at,
    });
  });
}
</script>