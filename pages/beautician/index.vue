<template>
  <div class="w-100 h-100 d-flex justify-center align-center">
    <!-- <h1>{{ useRoute().name }}</h1> -->
    <v-row>
      <v-col class="mx-10 px-10 ga-5 d-flex justify-center">
        <div class="">
          <BeauticianPersonInfo />
        </div>
        <div class="">
          <commission-card2 />
        </div>
      </v-col>
      <v-col>
        <div>
          <clients-pending-services />
        </div>
      </v-col>
    </v-row>
  </div>
</template>