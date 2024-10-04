<template>
  <div>
    <v-app>
      <AlertNotification />
      <BranchPrompt />
      <TopMenu />
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <v-sheet class="pa-5" v-if="authState">
        <v-chip>
          <pre v-html="authState" />&nbsp;- debug security token
        </v-chip>
      </v-sheet>
    </v-app>
  </div>
</template>
<script setup>
const { authState } = useNuxtApp().$authState();
</script>