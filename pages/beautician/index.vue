<template>
  <div class="w-100 h-100 d-flex justify-center align-center">
    <!-- <h1>{{ useRoute().name }}</h1> -->
    <v-col class="pt-15">
      <v-row class="mx-10 px-10 ga-5 d-flex justify-center">
        <div class="">
          <BeauticianPersonInfo />
        </div>
        <div class="">
          <commission-card2 />
        </div>
      </v-row>
      <!-- <v-row class="mx-10 px-10">
        <div class="flex-grow-1 mt-5">
          <clients-quick-view />
        </div>
      </v-row> -->
    </v-col>
  </div>
</template>