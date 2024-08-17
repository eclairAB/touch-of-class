<template>
  <!-- <v-card class="mx-aut w-autoo" flat border width="450">
    <v-toolbar color="orange-lighten-4">
      <v-btn icon="mdi-menu" variant="text"></v-btn>
      <v-toolbar-title><b>Commissions</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="black" label>
          <v-icon icon="mdi-cash-multiple" start></v-icon>
          2,300
        </v-chip>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>

    <v-list :items="items" lines="three" item-props>
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
        <v-chip class="ma-2" color="purple" label>
          <v-icon icon="mdi-cash-multiple" start></v-icon>
          {{ subtitle.commission }}
        </v-chip>
        <v-chip class="ma-2" color="teal" label>
          <v-icon icon="mdi-content-cut" start></v-icon>
          {{ subtitle.service }}
        </v-chip>
      </template>
    </v-list>
  </v-card> -->
  <v-card flat border width="500">
    <v-toolbar color="orange-lighten-4">
      <v-toolbar-title><b>Commissions</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="black" label>
        <v-icon icon="mdi-cash-multiple" start></v-icon>
        2,300
      </v-chip>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>
    <v-data-iterator :items="games" :items-per-page="4">
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
                <v-img :src="item.raw.img" width=""></v-img>

                <v-col>
                  <v-chip class="ma-2" color="blue" label>
                    <v-icon icon="mdi-emoticon-happy" start></v-icon>
                    {{ item.raw.client }}
                  </v-chip>
                  <v-chip class="ma-2" color="teal" label>
                    <v-icon icon="mdi-content-cut" start></v-icon>
                    {{ item.raw.stylist }}
                  </v-chip>
                </v-col>
                <v-col>
                  <v-chip class="ma-2" color="purple" label>
                    <v-icon icon="mdi-cash-multiple" start></v-icon>
                    {{ item.raw.commission }}
                  </v-chip>
                  <v-chip class="ma-2" color="orange-darken-3" label>
                    <v-icon icon="mdi-store" start></v-icon>
                    {{ item.raw.branch }}
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
    // items: [
    //   { type: "subheader", title: "Today" },
    //   {
    //     prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    //     title: "Juan Dela Cruz",
    //     subtitle: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`
    //     //  {
    //     //   label: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`,
    //     //   commission: `400`,
    //     //   service: `Haircut`,
    //     // },
    //   },
    //   { type: "divider", inset: true },
    //   {
    //     prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    //     title: "Bernard Bernardo",
    //     subtitle: `<span class="text-primary">Obrero</span> &mdash; Hair Specialist`
    //     //  {
    //     //   label: `<span class="text-primary">Obrero</span> &mdash; Hair Specialist`,
    //     //   commission: `600`,
    //     //   service: `Massage`,
    //     // },
    //   },
    //   { type: "divider", inset: true },
    //   {
    //     prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    //     title: "Maria Clara",
    //     subtitle: `<span class="text-primary">Dacudao</span> &mdash; Hair Specialist`
    //     //  {
    //     //   label: `<span class="text-primary">Dacudao</span> &mdash; Hair Specialist`,
    //     //   commission: `400`,
    //     //   service: `Haircut`,
    //     // },
    //   },
    //   { type: "divider", inset: true },
    //   {
    //     prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    //     title: "Margarette",
    //     subtitle: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`
    //     //  {
    //     //   label: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`,
    //     //   commission: `500`,
    //     //   service: `Exfoliate`,
    //     // },
    //   },
    //   { type: "divider", inset: true },
    //   {
    //     prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    //     title: "Abigail Adam",
    //     subtitle: `<span class="text-primary">JP Laurel</span> &mdash; Hair Specialist`
    //     //  {
    //     //   label: `<span class="text-primary">JP Laurel</span> &mdash; Hair Specialist`,
    //     //   commission: `400`,
    //     //   service: `Haircut`,
    //     // },
    //   },
    // ],
    games: [
      {
        img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
      {
        img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        client: `Mr. Client`,
        duration: "8 minutes",
        branch: `Buhangin`,
        profession: `Hair Specialist`,
        stylist: `Juan Dela Cruz`,
        commission: `400`,
        service: `Haircut`,
      },
    ],
  }),
};
</script>