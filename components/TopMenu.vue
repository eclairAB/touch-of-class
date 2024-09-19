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

        <v-chip
          class="ml-5"
          @click="changeBranch()"
          v-if="userStore.role == 'cashier'"
        >
          Current Branch:&nbsp;<span class="text">{{
            userStore.branch.select.name || "loading..."
          }}</span>
        </v-chip>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn
          :icon="
            theme.global.current.value.dark
              ? 'mdi-white-balance-sunny'
              : 'mdi-moon-waning-crescent'
          "
          @click="toggleTheme"
        ></v-btn>

        <!-- <v-btn icon="mdi-magnify"></v-btn> -->

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in menuItem"
              :key="i"
              :href="item.value"
              @click="menuItemClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <v-list nav :key="index" v-for="(item, index) in items[userStore.role]">
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
import { useTheme } from "vuetify";

const route = useRoute();
const userStore = useUserStore();
const username = computed(() => userStore.username);
const theme = useTheme();

const items = ref({
  admin: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: `/touch-of-class/admin`,
    },
    {
      icon: "mdi-emoticon-happy",
      title: "Clients",
      value: "/touch-of-class/admin/clients",
    },
    {
      icon: "mdi-hair-dryer",
      title: "Products",
      value: "/touch-of-class/admin/products",
    },
    {
      icon: "mdi-store",
      title: "Branches",
      value: "/touch-of-class/admin/branches",
    },
  ],
  cashier: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: "/touch-of-class/cashier",
    },
    {
      icon: "mdi-emoticon-happy",
      title: "Clients",
      value: "/touch-of-class/cashier/clients",
    },
  ],
});
const menuItem = [
  {
    title: "Log out",
    value: "/touch-of-class/",
  },
];
const drawer = useState("value", () => false);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

function menuItemClick(item) {
  if (item.title == "Log out") {
    userStore.setBranch({
      select: "",
      dialog: false,
    });
  }
}

function changeBranch() {
  let branch = userStore.branch;
  branch.dialog = true;

  userStore.setBranch(branch);
}


</script>