<template>
  <div>
    <client-only>
      <v-app-bar
        v-if="route.path != '/'"
        color="blue-lighten-1"
        scroll-behavior="collapse"
        scroll-threshold="150"
        elevation="0"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
          {{ `Greeting ${username[0]}!` }}

          <v-chip
            class="ml-5"
            @click="changeBranch()"
            v-if="userStore.role == 'Cashier'"
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
    </client-only>
  </div>
</template>
<script setup>
const { request } = useNuxtApp().$api;
const { clearAuthToken } = useNuxtApp().$authState();
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useTheme } from "vuetify";

const route = useRoute();
const userStore = useUserStore();
const username = computed(() => userStore.username);
const theme = useTheme();

const items = ref({
  Admin: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: `/touch-of-class/admin`,
    },
    // {
    //   icon: "mdi-emoticon-happy",
    //   title: "Clients",
    //   value: "/touch-of-class/admin/clients",
    // },
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
    {
      icon: "mdi-account-group",
      title: "Manage Staffs",
      value: "/touch-of-class/admin/staffs",
    },
    {
      icon: "mdi-sale",
      title: "Manage Promos",
      value: "/touch-of-class/admin/promos",
    },
  ],
  Cashier: [
    {
      icon: "mdi-home",
      title: "Homepage",
      value: "/touch-of-class/cashier",
    },
    {
      icon: "mdi-cash-multiple",
      title: "Payments",
      value: `/touch-of-class/admin`,
    },
    {
      icon: "mdi-emoticon-happy",
      title: "Clients",
      value: "/touch-of-class/cashier/clients",
    },
    {
      icon: "mdi-account-group",
      title: "Employee Staff",
      value: "/touch-of-class/cashier/staffs",
    },
  ],
});
const menuItem = [
  {
    title: "Log out",
  },
];
// const drawer = useState("value", () => false);
const drawer = ref(false);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

async function menuItemClick(item) {
  if (item.title == "Log out") {
    const result = confirm("Are you sure you want to log out?");
    if (result) {
      userStore.setBranch({
        select: "",
        dialog: false,
      }); 

      try {
        await request("post", `/logout/`);
        clearAuthToken();

        window.location.href = "/touch-of-class/";
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function changeBranch() {
  // let branch = userStore.branch;
  // branch.dialog = true;

  // userStore.setBranch(branch);
}
</script>