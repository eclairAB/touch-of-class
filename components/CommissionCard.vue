<template>
  <v-card class="mx-aut w-autoo" flat border width="450">
    <v-toolbar color="orange-lighten-4">
      <!-- <v-btn icon="mdi-menu" variant="text"></v-btn> -->
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
        <div v-html="subtitle.label"></div>
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
  </v-card>
</template>
  <script>
export default {
  data: () => ({
    items: [
      { type: "subheader", title: "Today" },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Juan Dela Cruz",
        subtitle: {
          label: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`,
          commission: `400`,
          service: `Haircut`,
        },
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Bernard Bernardo",
        subtitle: {
          label: `<span class="text-primary">Obrero</span> &mdash; Hair Specialist`,
          commission: `600`,
          service: `Massage`,
        },
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Maria Clara",
        subtitle: {
          label: `<span class="text-primary">Dacudao</span> &mdash; Hair Specialist`,
          commission: `400`,
          service: `Haircut`,
        },
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Margarette",
        subtitle: {
          label: `<span class="text-primary">Buhangin</span> &mdash; Hair Specialist`,
          commission: `500`,
          service: `Exfoliate`,
        },
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Abigail Adam",
        subtitle: {
          label: `<span class="text-primary">JP Laurel</span> &mdash; Hair Specialist`,
          commission: `400`,
          service: `Haircut`,
        },
      },
    ],
  }),
};
</script>