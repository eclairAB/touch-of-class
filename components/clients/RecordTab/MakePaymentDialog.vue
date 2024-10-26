<template>
  <v-col cols="12" md="6">
    <v-dialog
      @afterEnter="form = {}"
      @afterLeave="$emit('clearPaymentDialog')"
      :activator="`.${activatorClass[0]}`"
      max-width="800"
      persistent
      v-model="dialog"
    >
      <template v-slot:default="{ isActive }">
        <v-card
          prepend-icon="mdi-cash-multiple"
          :text="`Making payment for ${activatorClass[1].name}`"
          title="Payment"
        >
          <v-form class="mx-9">
            <v-row class="ga-2">
              <v-chip
                size="small"
                color="warning"
                class="mb-4"
                @click="form.amount_paid = Number(activatorClass[1].balance)"
              >
                Balance: ₱{{ activatorClass[1].balance }}
              </v-chip>
              <!-- <v-chip
                v-if="!activatorClass[1].service_redeem_id"
                size="small"
                color="green"
                class="mb-4"
                @click="form.amount_paid = minNextSession(activatorClass[1])"
              >
                To avail next session: ₱{{ minNextSession(activatorClass[1]) }}
              </v-chip> -->
            </v-row>
            <v-row>
              <v-number-input
                v-model="form.amount_paid"
                label="Payment Amount"
                density="comfortable"
                variant="outlined"
                :min="0"
              />
            </v-row>
          </v-form>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ml-auto"
              text="Submit"
              @click="submitPressed(activatorClass)"
            ></v-btn>
            <v-btn
              class="ml-auto"
              text="Close"
              @click="isActive.value = false"
            ></v-btn>
          </template>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script setup>
import { useAlertStore } from "@/stores/alertDialog";
const alertDialog = useAlertStore();
const { request } = useNuxtApp().$api;

const props = defineProps({
  activatorClass: Array, // receives: [ querySelector, The Payload ]
});

const form = ref({});
const dialog = ref(false);

const minNextSession = (item) => {
  if (item.combo_redeem_id) {
    const sessionPrice = item.product_price / item.services.length;
    const clientBalance = item.balance;

    // Calculate how many full sessions are covered by the balance
    // const fullSessions = Math.floor(clientBalance / sessionPrice); // 2

    // Calculate the remaining balance toward the next session
    const remainingBalance = clientBalance % sessionPrice; // 50

    // Amount still needed for the 3rd session
    const amountToPayForThirdSession = sessionPrice - remainingBalance; // 75

    console.log([
      amountToPayForThirdSession,
      sessionPrice,
      clientBalance,
      remainingBalance,
    ]);
    return amountToPayForThirdSession;
  } else if (item.package_redeem_id) {
    return (item.balance / item.sessions).toFixed(2);
  }
};

const submitPressed = (x) => {
  submitPayment(x);
};
const submitPayment = async (x) => {
  let payload = {
    amount: form.value.amount_paid,
  };

  if (x[1].package_redeem_id) {
    payload.package_redeem_id = x[1].package_redeem_id;
  }
  if (x[1].combo_redeem_id) {
    payload.combo_redeem_id = x[1].combo_redeem_id;
  }
  if (x[1].service_redeem_id) {
    payload.service_redeem_id = x[1].service_redeem_id;
  }

  try {
    const response = await request("post", `/product/payment/create/`, payload);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "Added Payment!",
    });
    dialog.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>
