<template>
  <div>
    <v-app>
      <AlertNotification />
      <BranchPrompt />
      <TopMenu />
      <NuxtRouteAnnouncer />
      <NuxtPage />
      {{ authState }}
    </v-app>
  </div>
</template>
<script setup>
const { authState } = useNuxtApp().$authState();
</script>