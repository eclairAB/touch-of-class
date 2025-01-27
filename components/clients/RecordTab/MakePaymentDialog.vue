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
                <v-sheet
                  v-if="form.payment_type == 'Online' || form.payment_type == 'Card'"
                >
                  <v-text-field
                    v-model="form.biller"
                    label="Biller name"
                    :hint="
                      form.payment_type == 'Online'
                        ? `( Gcash, Paymaya, etc. )`
                        : `( Credit, Debit )`
                    "
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
                  :disabled="
                    (form.combos == null ? false : form.combos.length > 0) ||
                    (form.services == null ? false : form.services.length > 0)
                  "
                />
                <!-- <v-autocomplete
                  v-model="form.discounts"
                  label="Select Discount"
                  :items="discounts"
                  density="comfortable"
                  variant="outlined"
                  item-title="discount_name"
                  item-value="id"
                  chips
                  @update:modelValue="SelectorDiscount"
                ></v-autocomplete>
                <v-number-input
                  v-model="form.discount_paid"
                  label="Discount Amount"
                  density="comfortable"
                  variant="outlined"
                  disabled="true"
                /> -->
              </v-col>
            </v-card>
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
const discounts = ref([]);
const fetchDisountData = async () => {
  try {
    const response = await request("get", `/discounts/`);

    discounts.value = response;
    console.log('discount',discounts.value)
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Discounts.",
    });
  }
};
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
    payment_type: form.value.payment_type,
    biller: form.value.biller,
    reference: form.value.reference,
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
    console.log(payload)
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
fetchDisountData()
const SelectorDiscount = (item) => {
  const selectedDiscount = discounts.value.find(
    (discount) => discount.id === item
  );
  if (selectedDiscount) {
    updateAmountPaid(selectedDiscount);
  }
};
const updateAmountPaid = (selectedDiscount) => {
  console.log(selectedDiscount)
  let total = activatorClass[1].value.balance;
  let discountAmount = selectedDiscount.amount;
  if (selectedDiscount.percentage === 1) {
    discountAmount = total * (selectedDiscount.amount / 100);
  }
  form.value.discount_paid = discountAmount;
};
</script>
