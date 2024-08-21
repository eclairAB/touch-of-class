<template>
  <v-card flat border width="500">
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title><b>Commissions</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="black" label>
        <v-icon icon="mdi-cash-multiple" start></v-icon>
        2,300
      </v-chip>
      <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn> -->
    </v-toolbar>
    <v-data-iterator :items="commissions" :items-per-page="4">
      <!-- <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template> -->

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-col dense>
            <v-row v-for="item in items" :key="item.title" cols="auto" md="4">
              <v-card class="d-flex flex-row my-1 w-100" border flat>
                <!-- <v-img :src="item.raw.img" width=""></v-img> -->

                <v-col>
                  <v-chip class="ma-2" color="blue" label>
                    <v-icon icon="mdi-emoticon-happy" start></v-icon>
                    {{ item.raw.client }}
                  </v-chip>
                  <v-chip class="ma-2" color="teal" label>
                    <v-icon icon="mdi-content-cut" start></v-icon>
                    {{ item.raw.stylist }}
                  </v-chip>
                  <v-chip class="ma-2" color="orange-darken-3" label>
                    <v-icon icon="mdi-store" start></v-icon>
                    {{ item.raw.branch }}
                  </v-chip>
                  <v-chip class="ma-2" color="purple" label>
                    <v-icon icon="mdi-cash-multiple" start></v-icon>
                    {{ item.raw.commission }} ({{ item.raw.percentage }}) - {{ item.raw.service }}
                  </v-chip>
                  <v-chip class="ma-2" color="red" label>
                    <v-icon icon="mdi-clock-time-five-outline" start></v-icon>
                    {{ item.raw.datetime }}
                  </v-chip>
                </v-col>

                <v-list-item :subtitle="item.raw.subtitle" class="mb-2">
                  <template v-slot:title>
                    <!-- <strong class="text-h7 mb-2">{{ item.raw.stylist }}</strong> -->
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4" v-if="false">
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis me-1"
                  >
                    <v-icon icon="mdi-clock" start></v-icon>

                    <div class="text-truncate">{{ item.raw.duration }}</div>
                  </div>

                  <v-btn class="text-none" size="small" text="Read" border flat>
                  </v-btn>
                </div>
              </v-card>
            </v-row>
          </v-col>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>
  <script>
export default {
  data: () => ({
    commissions: [
      {
        img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        percentage: `10%`,
        service: `Gluta drip`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Bernard Bernardo`,
        commission: `600`,
        percentage: `7%`,
        service: `Haircut`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Maria Clara`,
        commission: `300`,
        percentage: `7%`,
        service: `Haircut`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Margarette`,
        commission: `500`,
        percentage: `10%`,
        service: `Gluta drip`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Abigail Adam`,
        commission: `400`,
        percentage: `10%`,
        service: `Manicure`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Bernard Bernardo`,
        commission: `200`,
        percentage: `10%`,
        service: `Haircut`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Maria Clara`,
        commission: `600`,
        percentage: `10%`,
        service: `Haircut`,
        datetime: `01/01/2024 3:00 pm`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Margarette`,
        commission: `400`,
        percentage: `10%`,
        service: `Haircut`,
        datetime: `01/01/2024 3:00 pm`,
      },
    ],
  }),
};
</script>