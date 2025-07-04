<template>
  <v-sheet class="appointment-tab pa-5 d-flex flex-wrap ga-2">
    <v-timeline align="start" side="end" truncate-line="start">
      <v-timeline-item
        v-for="(item, index) in appointments"
        :key="index"
        dot-color="pink"
        size="small"
      >
        <!-- {{ item }} -->
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
          <v-row
            v-if="item.claimed < item.sessions"
            class="text-caption ma-1 ga-2"
          >
            <v-chip size="small" color="info">
              Availed sessions: {{ item.claimed }}/{{ item.sessions }}
            </v-chip>
            <v-chip v-if="item.balance != 0" size="small" color="warning">
              Balance: ₱{{ item.balance }}
            </v-chip>
            <v-chip v-else size="small" color="success"> Fully paid </v-chip>
          </v-row>
          <v-card-actions v-if="item.claimed < item.sessions">
            <v-btn
              :disabled="item.canAvail < 1"
              color="blue"
              class="text-none"
              @click="availClicked(item)"
              >Avail</v-btn
            >
            <v-btn
              :disabled="item.balance == 0"
              color="green"
              :class="`text-none package_redeem_${item.package_redeem_id}`"
              @click="
                makePayment(`package_redeem_${item.package_redeem_id}`, item)
              "
              >Make Payment</v-btn
            >
          </v-card-actions>
          <div v-else>
            <v-chip class="mt-2" size="small" color="success"> Availed </v-chip>
          </div>
        </v-card>
        <!-- Combo -->
        <v-card flat border class="py-2 px-4" v-if="item.variation == 'combo'">
          <strong>{{ item.name }} </strong>
          <i class="text-grey text-caption"> - {{ item.variation }}</i>
          <v-row
            v-if="item.services.length > item.claimed"
            class="text-caption ma-1 ga-2"
          >
            <v-chip v-if="item.balance != 0" size="small" color="warning">
              Balance: ₱{{ item.balance }}
            </v-chip>
            <v-chip v-else size="small" color="success"> Fully paid </v-chip>
          </v-row>
          <v-card-actions v-if="item.services.length > item.claimed">
            <v-btn
              :disabled="item.canAvail < 1"
              color="blue"
              class="text-none"
              @click="availClicked(item)"
              >Avail</v-btn
            >
            <v-btn
              :disabled="item.balance == 0"
              color="green"
              :class="`text-none combo_redeem_${item.combo_redeem_id}`"
              @click="makePayment(`combo_redeem_${item.combo_redeem_id}`, item)"
              >Make Payment</v-btn
            >
          </v-card-actions>
          <div v-else class="my-4"></div>
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
                <div>
                  <v-chip
                    v-if="service.branch_id"
                    class="mt-2"
                    size="small"
                    color="success"
                  >
                    Availed on {{ formatDateTime(service.updated_at) }}
                  </v-chip>
                  <v-chip v-else size="small" color="info"> Unavailed </v-chip>
                </div>
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
          <v-row v-if="!item.claimed" class="text-caption ma-1 ga-2">
            <v-chip size="small" color="info"> Unavailed </v-chip>
            <v-chip v-if="item.balance != 0" size="small" color="warning">
              Balance: ₱{{ item.balance }}
            </v-chip>
          </v-row>
          <v-card-actions v-if="!item.claimed">
            <v-btn
              :disabled="item.balance != 0"
              color="blue"
              class="text-none"
              @click="availClicked({ item })"
              >Avail</v-btn
            >
            <v-btn
              :disabled="item.balance == 0"
              color="green"
              :class="`text-none service_redeem_${item.service_redeem_id}`"
              @click="
                makePayment(`service_redeem_${item.service_redeem_id}`, item)
              "
              >Make Payment</v-btn
            >
          </v-card-actions>
          <div v-else>
            <v-chip class="mt-2" size="small" color="success"> Availed </v-chip>
          </div>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-dialog
      v-model="availDialog.status"
      width="500"
      persistent
      @after-leave="availForm = {}"
    >
      <v-card prepend-icon="mdi-content-cut" title="Product avail">
        <v-col class="px-5">
          <v-chip class="mb-4" color="orange">
            <v-icon icon="mdi-alert-circle" start></v-icon>
            Availing in&nbsp;<strong>{{ userStore.branch.select.name }}</strong
            >&nbsp;Branch
          </v-chip>
          <v-chip class="mb-4 ml-1" color="orange">
            <v-icon icon="mdi-alert-circle" start></v-icon>
            Cashiered by&nbsp;<strong>{{
              `${userStore.username[0]} ${userStore.username[1]}`
            }}</strong>
          </v-chip>
          <v-autocomplete
            v-model="availForm.stylist"
            label="Search Catering Stylist"
            :items="stylists"
            density="comfortable"
            variant="outlined"
            :item-title="stylistSelectorTitle"
            item-value="id"
            @input="searchStylistEntry"
            chips
          ></v-autocomplete>
        </v-col>
        <v-card-actions>
          <v-btn
            color="success"
            class="text-none"
            text="confirm avail"
            @click="confirmAvail()"
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
    <clients-record-tab-make-payment-dialog
      :activatorClass="paymentDialog"
      @clearPaymentDialog="closePaymentDialog"
    />
  </v-sheet>
</template>
  <script setup>
const { request } = useNuxtApp().$api;
import { useAlertStore } from "@/stores/alertDialog";
import { useUserStore } from "@/stores/user";
import { useFormDialogStore } from "@/stores/formDialog";
const alertDialog = useAlertStore();
const formDialog = useFormDialogStore();
const userStore = useUserStore();

const appointments = ref([]);
const availDialog = ref({});
const availForm = ref({});
const stylists = ref([]);
const searchStylistTimeout = ref(0);
const paymentDialog = ref([]);
const prevPaymentDialogCounter = ref(0);

const fetchAppointmentsData = async () => {
  try {
    const client_id = formDialog.clientInfo.payload.id;
    const response = await request("get", `/appointments/${client_id}`);
    console.log(response)
    response.forEach((appointment) => {
      if (appointment.appointment_packages.length > 0) {
        insertPackage(appointment.appointment_packages);
      }
      if (appointment.appointment_combos.length > 0) {
        insertCombo(appointment.appointment_combos);
      }
      if (appointment.appointment_services.length > 0) {
        insertService(appointment.appointment_services);
      }
    });
    // appointments.value = response;
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

function formatDateTime(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const datePart = date.toLocaleDateString("en-US", options);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minuteStr = minutes < 10 ? "0" + minutes : minutes;

  return `${datePart} | ${hours}:${minuteStr} ${ampm}`;
}

function insertPackage(package_redeems) {
  const result = package_redeems.reduce((acc, redeem) => {
    // Find the existing package in the result array
    const existingPackage = acc.find((pkg) => pkg.name === redeem.package.name);

    // If package doesn't exist, add it with initial values
    if (!existingPackage) {
      const claims = redeem.package_redeems.filter(
        (item) => item.branch_id
      ).length;
      const unavailedPaid = redeem.package_redeems.filter((item) => {
        return item.branch_id == null && item.paid;
      }).length;
      acc.push({
        package_redeem_id: redeem.id,
        variation: "package",
        name: redeem.package.name,
        sessions: redeem.package.sessions,
        claimed: claims,
        canAvail: unavailedPaid,
        balance: redeem.balance,
        created_at: redeem.created_at,
        product_price: redeem.package.price,
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
      const claims = redeem.combo_redeems.filter(
        (item) => item.branch_id
      ).length;
      const unavailedPaid = redeem.combo_redeems.filter((item) => {
        return item.branch_id == null && item.paid;
      }).length;

      acc.push({
        combo_redeem_id: redeem.id,
        variation: "combo",
        name: redeem.combo.name,
        services: redeem.combo_redeems,
        claimed: claims,
        canAvail: unavailedPaid,
        balance: redeem.balance,
        created_at: redeem.created_at,
        product_price: redeem.combo.price,
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
      service_redeem_id: service.id,
      variation: "service",
      name: service.service.name,
      claimed: service.service_redeems[0].branch_id ? 1 : 0,
      balance: service.balance,
      created_at: service.created_at,
    });
  });
}
function availClicked(product) {
  availDialog.value.status = true;
  availForm.value.form = product;
}
function confirmAvail() {
  const variation =
    availForm.value.form.variation || availForm.value.form.item.variation;
  let payload = {
    branch_id: userStore.branch.select.id,
    stylist_id: availForm.value.stylist,
  };
  switch (variation) {
    case "package":
      payload.id = availForm.value.form.package_redeem_id;
      break;
    case "combo":
      payload.id = availForm.value.form.combo_redeem_id;
      break;
    default:
      payload.id = availForm.value.form.item.service_redeem_id;
      break;
  }
  availPackage(payload, variation);
}
async function availPackage(payload, variation) {
  try {
    await request("post", `/product/avail/${variation}`, payload);
    availDialog.value.status = false;
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: `${variation.toUpperCase()} availed!`,
    });

    appointments.value = [];
    fetchAppointmentsData();
  } catch (error) {
    availDialog.value.status = false;
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: `Failed to avail ${variation}.`,
    });
  }
}
function searchStylistEntry() {
  clearTimeout(searchStylistTimeout.value);
  searchStylistTimeout.value = setTimeout(() => {
    // Stopped typing
    fetchStylistData();
  }, 1000);
}
const fetchStylistData = async () => {
  try {
    const filter = {
      search: availForm.value.stylist,
      role: "stylist",
    };
    const response = await request("get", `/employees/`, filter);

    if (response.length == 0) {
      availForm.stylist = null;
    } else {
      stylists.value = response;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
const stylistSelectorTitle = (item) => {
  if (item.id) {
    return `${item.first_name} ${item.last_name}`;
  } else {
    availForm.value.stylist = "";
  }
};
function makePayment(activatorClass, item) {
  paymentDialog.value = [activatorClass, item];
  setTimeout(() => {
    if (prevPaymentDialogCounter.value < 1) {
      document.querySelector(`.${activatorClass}`).click();
    }
    prevPaymentDialogCounter.value++;
  }, 100);
}
function closePaymentDialog() {
  prevPaymentDialogCounter.value = 0;
  paymentDialog.value = [];

  appointments.value = [];
  fetchAppointmentsData();
}
</script>