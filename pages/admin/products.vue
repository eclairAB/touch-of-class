<template>
  <div class="w-100 h-100 d-flex justify-center align-center px-10">
    <v-col>
      <v-row class="mx-10 px-10 ga-5 d-flex justify-center align-center">
        <v-sheet color="orange-lighten-4" border rounded="lg">
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
import { PackageCard, ComboCard } from "#components";

const components_ = {
  package: PackageCard,
  combo: ComboCard,
};

const tab = useState("tab", () => "tab-1");
const tabs = useState("tabItem", () => [
  {
    icon: "mdi-package-variant-closed",
    text: "Packages",
    value: "tab-1",
    component: "package",
  },
  {
    icon: "mdi-shopping",
    text: "Bundles",
    value: "tab-2",
    component: "combo",
  },
]);

function getComponent(x) {
  return components_[x];
}
</script>