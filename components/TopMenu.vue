<template>
  <div>
    <v-app-bar
      v-if="route.path != '/'"
      color="blue-lighten-1"
      scroll-behavior="collapse"
      scroll-threshold="150"
      elevation="0"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        {{ username ? `Greetings ${username}!` : "Good day!" }}
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>

        <v-btn icon="mdi-magnify"></v-btn>

        <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in menuItem"
                :key="i"
                :href="item.value"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <!-- <v-list :items="items"></v-list> -->
      <v-list nav :key="index" v-for="(item, index) in items.admin">
        <v-list-item
          :prepend-icon="item.icon"
          :title="item.title"
          :href="item.value"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const route = useRoute();
const userStore = useUserStore();
const username = computed(() => userStore.username);

// const items = [
//   {
//     icon: "mdi-home",
//     title: "Homepage",
//     value: "/admin",
//   },
//   {
//     icon: "mdi-cog",
//     title: "Products",
//     value: "/admin/products",
//   },
// ];

const items = {
  admin: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: `/touch-of-class/admin`,
    },
    {
      icon: "mdi-emoticon-happy",
      title: "Clients",
      value: "/admin/clients",
    },
    {
      icon: "mdi-hair-dryer",
      title: "Products",
      value: "/touch-of-class/admin/products",
    },
  ],
  cashier: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: "/touch-of-class/admin",
    },
  ],
};
const menuItem = [
  {
    title: 'Log out',
    value: '/',
  }
]
const drawer = useState("value", () => false);
</script>