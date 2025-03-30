<template>
  <v-row>
    <v-col cols="12" md="9">
      <v-stepper v-model="currentStep" :items="['New Appointment', 'Loyalty Card', 'Free Service','Payment']">
        <template v-slot:item.1>
          <v-card flat>
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
                <v-autocomplete
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
                  :disabled="
                    (form.combos == null ? false : form.combos.length > 0) ||
                    (form.services == null ? false : form.services.length > 0)
                  "
                  :return-object="_true"
                  @update:modelValue="
                    sub_amount =
                      form.packages == null
                        ? grandTotal()
                        : form.packages.length > 0
                        ? grandTotal() / 2
                        : grandTotal();
                      form.amount_paid = sub_amount
                  "
                ></v-autocomplete>
              </v-row>
              <v-row class="ga-3">
                <v-autocomplete
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
                  :disabled="
                    (form.packages == null ? false : form.packages.length > 0) ||
                    (form.services == null ? false : form.services.length > 0)
                  "
                  :return-object="_true"
                  @update:modelValue="
                    sub_amount =
                      form.packages == null
                        ? grandTotal()
                        : form.packages.length > 0
                        ? grandTotal() / 2
                        : grandTotal();
                    form.amount_paid = sub_amount
                  "
                ></v-autocomplete>
              </v-row>
              <v-row>
                <v-autocomplete
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
                  :disabled="
                    (form.combos == null ? false : form.combos.length > 0) ||
                    (form.packages == null ? false : form.packages.length > 0)
                  "
                  :return-object="_true"
                  @update:modelValue="
                    sub_amount =
                      form.packages == null
                        ? grandTotal()
                        : form.packages.length > 0
                        ? grandTotal() / 2
                        : grandTotal();
                    form.amount_paid = sub_amount
                  "
                ></v-autocomplete>
              </v-row>
            </v-form>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card flat border class="pa-5 mt-5">
            <v-card-title>
              <h4>Loyalty Card Upload</h4>
            </v-card-title>
            <div v-bind="getRootProps()" class="dropzone">
              <input v-bind="getInputProps()" />
              <p v-if="isDragActive">Drop the image files here ...</p>
              <p v-else>Drag image files here, or click to select files</p>
            </div>

            <!-- Image Previews -->
            <h5 v-if="imagePreviews.length">Uploads Preview</h5>
            <div v-if="imagePreviews.length" class="previews mt-5">
              <div
                v-for="(image, index) in imagePreviews"
                :key="index"
                class="image-preview"
              >
                <img :src="image" alt="Preview" />
              </div>
            </div>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card flat border class="pa-5 mt-5">
            <v-card-title>
              <h4>Free Service Upload</h4>
            </v-card-title>
            <div v-bind="getRootProps()" class="dropzone">
              <input v-bind="getInputProps()" />
              <p v-if="isDragActive">Drop the image files here for Free Service...</p>
              <p v-else>Drag image files here, or click to select files for Free Service</p>
            </div>

            <!-- Free Service Image Previews -->
            <h5 v-if="imagePreviewsFs.length">Free Service Upload Preview</h5>
            <div v-if="imagePreviewsFs.length" class="previews mt-5">
              <div
                v-for="(image, index) in imagePreviewsFs"
                :key="index"
                class="image-preview"
              >
                <img :src="image" alt="Preview" />
              </div>
            </div>
          </v-card>
        </template>

        <template v-slot:item.4>
          <v-card flat border>
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
                <v-autocomplete
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
              </v-col>
            </v-card>
          </v-card>
        </template>
      </v-stepper>
    </v-col>
    <v-col cols="12" md="3">
      <v-card 
        v-if="form.packages.length > 0 || form.combos.length > 0 || form.services.length > 0"
        flat
        border
        class="mt-5 py-5 px-10"
      >
      <v-card-title class="my-5">
        <h3>Summary</h3>
      </v-card-title>
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
            <v-sheet v-if="sub_amount">
              <div class="d-flex justify-end text-medium-emphasis">
                <span> Amount paid </span>
                <v-spacer></v-spacer>
                <span>
                  <h4>₱ {{ formatNumber(sub_amount) }}</h4>
                </span>
              </div>
            </v-sheet>
            <div v-if="form.disc_amount" class="d-flex justify-end font-weight-bold">
              <span> Discount </span>
              <v-spacer></v-spacer>
              <span> ₱ {{ formatNumber(form.disc_amount) }} </span>
            </div>
          </v-col>
          <v-col v-if="grandTotal() != form.amount_paid">
            <v-chip class="ma-2" color="orange-darken-3" label>
              <v-icon icon="mdi-cash-multiple" start></v-icon>
              {{ formatNumber(grandTotal() - form.amount_paid - form.disc_amount) }}

              <v-tooltip activator="parent" location="end"
                >Payment Balance</v-tooltip
              >
            </v-chip>
          </v-col>
        </v-row>
        <v-col class="d-flex justify-center align-center mt-5">
          <v-btn
            :disabled="!form.client_id || currentStep !== 4"
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
    </v-col>
  </v-row>
  <FormClientDialog @exitDialog="exitDialog" />
</template>
<script setup>
const { request, fileRequest } = useNuxtApp().$api;
const {
  getRootProps,
  getInputProps,
  isDragActive,
  acceptedFiles,
  acceptedFilesFs,
  createFormData,
} = useNuxtApp().$useDropzoneFormData({
  accept: {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"], // Allow only image file types
  },
});
import { useUserStore } from "@/stores/user";
import { useFormDialogStore } from "@/stores/formDialog";
import { useAlertStore } from "@/stores/alertDialog";
const userStore = useUserStore();
const formDialogStore = useFormDialogStore();
const alertDialog = useAlertStore();

const currentStep = ref(1);
const clients = ref([]);
const packages = ref([]);
const combos = ref([]);
const services = ref([]);
const discounts = ref([]);
const sub_amount = ref(0);
const form = ref({
  packages: [],
  combos: [],
  services: [],
  discounts: null,
  disc_amount: 0,
});

const files = ref([]);
const imagePreviews = ref([]);

const filesFs = ref([]);
const imagePreviewsFs = ref([]);

watch(acceptedFiles, (newFiles) => {
  if (currentStep.value === 2) {
    files.value = newFiles;
    imagePreviews.value = [];
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  } else if (currentStep.value === 3) {
    filesFs.value = newFiles;
    imagePreviewsFs.value = [];
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewsFs.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

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

const updateAmountPaid = (selectedDiscount) => {
  console.log(selectedDiscount)
  let total = grandTotal()
  if(form.value.packages.length > 0) {
    total.value = grandTotal() / 2;
  }
  sub_amount.value = total;
  let discountAmount = selectedDiscount.amount;
  if (selectedDiscount.percentage === 1) {
    discountAmount = total * (selectedDiscount.amount / 100);
  }
  form.value.disc_amount = discountAmount;
  form.value.amount_paid = total - discountAmount;
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
const SelectorDiscount = (item) => {
  const selectedDiscount = discounts.value.find(
    (discount) => discount.id === item
  );
  if (selectedDiscount) {
    updateAmountPaid(selectedDiscount);
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
    const response = await request("get", `/clients/`);
    clients.value = response;
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
    const response = await request("get", `/packages/`);

    packages.value = response;
  } catch (error) {
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to fetch Packages.",
    });
  }
};
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
const fetchComboData = async () => {
  try {
    const response = await request("get", `/combos/`);

    combos.value = response;
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
    const response = await request("get", `/services/`);

    services.value = response;
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
fetchDisountData();
const createAppointment = async () => {
  try {
    let payload = form.value;
    payload.package_id = payload.packages ? payload.packages.id : null;
    payload.combo_id = payload.combos ? payload.combos.id : null;
    payload.service_id = payload.services ? payload.services.id : null;
    payload.branch_id = userStore.branch.select.id;
    payload.amount_payable = grandTotal();

    const response = await request("post", `/appointments/`, form.value);
    alertDialog.setAlert({
      show: true,
      color: "success",
      content: "New Appointment Created!",
    });
    uploadFiles(response.id);
    form.value = {};
    files.value = [];
    imagePreviews.value = [];
  } catch (error) {
    console.error(error);
    alertDialog.setAlert({
      show: true,
      color: "error",
      content: "Failed to Create Appointment.",
    });
  }
};
const uploadFiles = async (appointment_id) => {
  try {
    if(files.value.length) {
      const formData = createFormData(files.value);
      formData.append("appointment_id", appointment_id);
      console.log([files, appointment_id]);
      console.log("formData", formData);
      const response = await fileRequest(
        "/product/upload_loyalty_cards",
        formData
      );
      console.log("Files uploaded successfully:", formData);
    }
    if(filesFs.value.length) {
      const formData = createFormData(filesFs.value);
      formData.append("appointment_id", appointment_id);
      console.log([filesFs, appointment_id]);
      console.log("formData", formData);
      const response = await fileRequest(
        "/product/upload_free_services",
        formData
      );
      console.log("Files uploaded successfully:", formData);
    }
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};
</script>