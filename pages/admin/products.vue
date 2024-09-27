<template>
  <div class="w-100 h-100 d-flex justify-center align-center px-10">
    <v-col>
      <v-row class="mx-10 px-10 ga-5 d-flex justify-center align-center">
        <v-sheet color="orange-lighten-4" border rounded="lg" class="w-75">
          <v-tabs
            v-model="tab"
            :items="tabs"
            align-tabs="center"
            color="orange-darken-1"
            height="60"
            slider-color="#f78166"
          >
            <template v-slot:tab="{ item }">
              <v-tab
                :prepend-icon="item.icon"
                :text="item.text"
                :value="item.value"
                class="text-none"
              ></v-tab>
            </template>

            <template v-slot:item="{ item }">
              <v-tabs-window-item :value="item.value" class="pa-4">
                <component :is="getComponent(item.component)" />
              </v-tabs-window-item>
            </template>
          </v-tabs>
        </v-sheet>
      </v-row>
    </v-col>
  </div>
</template>
<script setup>
import {
  ProductsPackageTab,
  ProductsComboTab,
  ProductsServiceTab,
} from "#components";

const components_ = {
  package: ProductsPackageTab,
  combo: ProductsComboTab,
  service: ProductsServiceTab,
};

const tab = ref("tab-1");
const tabs = ref([
  {
    icon: "mdi-package-variant-closed",
    text: "Packages",
    value: "tab-1",
    component: "package",
  },
  {
    icon: "mdi-shopping",
    text: "Combo",
    value: "tab-2",
    component: "combo",
  },
  {
    icon: "mdi-shopping",
    text: "Services",
    value: "tab-3",
    component: "service",
  },
]);

function getComponent(x) {
  return components_[x];
}
</script>