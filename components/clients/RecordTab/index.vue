<template>
  <v-dialog
    v-model="formDialog.clientInfo.dialog"
    width="1000"
    @afterEnter="dialogOpens"
    @afterLeave="closeDialog"
    :class="`${tab.current}-dialog`"
  >
    <v-card height="600">
      <v-toolbar color="orange-lighten-4">
        <v-toolbar-title>
          <b>
            {{ fullName() }}
          </b>
        </v-toolbar-title>
        <v-card-actions>
          <v-btn @click="closeDialog" class="text-none">Close</v-btn>
        </v-card-actions>
        <template v-slot:extension>
          <v-tabs
            v-model="tab.current"
            :items="tabs"
            height="60"
            slider-color="#f78166"
            fixed-tabs
          >
            <template v-slot:tab="{ item }">
              <v-tab
                :text="item.text"
                :value="item.value"
                :disabled="tab.status ? item.value != 'tab-4' : false"
                class="text-none"
              ></v-tab>
            </template>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-window v-model="tab.current">
        <v-tabs-window-item
          v-for="(item, index) in tabs"
          :key="index"
          :value="item.value"
          class="pt-2"
        >
          <component
            :is="getComponent(item.component)"
            @childEmit="childEmit"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-dialog>
</template>
<script setup>
import {
  ClientsRecordTabActions,
  ClientsRecordTabAppointments,
  ClientsRecordTabLoyaltyCards,
  ClientsRecordTabFreeServices,
  ClientsRecordTabPayment,
} from "#components";
import { useFormDialogStore } from "@/stores/formDialog";
const formDialog = useFormDialogStore();

const components_ = {
  action: ClientsRecordTabActions,
  appointments: ClientsRecordTabAppointments,
  cards: ClientsRecordTabLoyaltyCards,
  fs: ClientsRecordTabFreeServices,
  payment: ClientsRecordTabPayment,
};

const tab = ref({
  current: "tab-2",
  status: false,
});
const tabs = ref([
  // {
  //   text: "Actions",
  //   value: "tab-1",
  //   component: "action",
  // },
  {
    text: "Appointments",
    value: "tab-2",
    component: "appointments",
  },
  {
    text: "Loyalty Cards",
    value: "tab-3",
    component: "cards",
  },
  {
    text: "Free Services",
    value: "tab-4",
    component: "fs",
  },
]);

const payment_tab = {
  text: "Payment",
  value: "tab-4",
  component: "payment",
};

function getComponent(x) {
  return components_[x];
}

function dialogOpens() {
  tab.value.current = "tab-2";
}
function closeDialog() {
  formDialog.setClientInfo({ dialog: false });
}

const fullName = () => {
  if (formDialog.clientInfo.payload) {
    return `${formDialog.clientInfo.payload.first_name} ${formDialog.clientInfo.payload.last_name}`;
  }
};
function childEmit(children) {
  switch (children) {
    case 1:
      appendPayment();
      break;
    case 2:
      removePayment();
      break;
  }
}
function appendPayment() {
  const alreadyExists = tabs.value.some(
    (tab) => tab.value === payment_tab.value
  );
  if (!alreadyExists) {
    tabs.value.unshift(payment_tab);
    tab.value.current = "tab-4";
    tab.value.status = true;
  }
}

// Function to remove payment from tabs
function removePayment() {
  tabs.value = tabs.value.filter((tab) => tab.value !== payment_tab.value);
  tab.value.current = "tab-2";
  tab.value.status = false;

  setTimeout(() => {
    ClientsRecordTabAppointments.value.fetchAppointmentsData();
  }, 500);
}
</script>
