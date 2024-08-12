<template>
  <v-app-bar
    v-if="route.path != '/'"
    color="blue-lighten-1"
    scroll-behavior="collapse"
    scroll-threshold="150"
    elevation="0"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      {{ username ? `Greetings ${username}!` : "Good day!" }}
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const route = useRoute();
const userStore = useUserStore();
const username = computed(() => userStore.username);

</script>