<template>
  <v-data-iterator :items="desserts" item-value="name">
    <template v-slot:default="{ items, isExpanded, toggleExpand }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw.name"
          cols="12"
          md="6"
          sm="12"
        >
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon
                :color="item.raw.color"
                :icon="item.raw.icon"
                size="18"
                start
              ></v-icon>

              <h4>{{ item.raw.name }}</h4>
            </v-card-title>

            <v-card-text>
              {{ item.raw.description }}
            </v-card-text>

            <div class="px-4">
              <v-switch
                :label="`${isExpanded(item) ? 'Hide' : 'Show'} details`"
                :model-value="isExpanded(item)"
                density="compact"
                inset
                @click="() => toggleExpand(item)"
              ></v-switch>
            </div>

            <v-divider></v-divider>

            <v-expand-transition>
              <div v-if="isExpanded(item)">
                <v-list :items="services" :lines="true" density="compact">
                  <!-- <v-list-item active> -->
                  <template v-slot:title="{ title }">
                    {{ title.service }}
                    <v-chip class="ma-2" color="purple" label>
                      <v-icon icon="mdi-cash-multiple" start></v-icon>
                      {{ title.commission }}
                    </v-chip>
                    <v-chip class="ma-2" color="blue" label>
                      <v-icon icon="mdi-pencil" start></v-icon>
                      Edit Commission Percentage
                    </v-chip>
                  </template>
                  <!-- </v-list-item> -->
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script>
export default {
  data: () => ({
    desserts: [
      {
        name: "Beauty Package",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia unde atque natus ea mollitia ratione eaque et, hic, adipisci cumque ut. Quia accusamus, id inventore facilis aspernatur qui eveniet.",
        icon: "mdi-face-woman-shimmer",
        color: "#6EC1E4",
      },
      {
        name: "Exfoliate Package",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia unde atque natus ea mollitia ratione eaque et, hic, adipisci cumque ut. Quia accusamus, id inventore facilis aspernatur qui eveniet.",
        icon: "mdi-lotion-outline",
        color: "#F4A261",
      },
      {
        name: "Massage Package",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia unde atque natus ea mollitia ratione eaque et, hic, adipisci cumque ut. Quia accusamus, id inventore facilis aspernatur qui eveniet.",
        icon: "mdi-hand-water",
        color: "#6D4C41",
      },
      {
        name: "All-in-one Package",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia unde atque natus ea mollitia ratione eaque et, hic, adipisci cumque ut. Quia accusamus, id inventore facilis aspernatur qui eveniet.",
        color: "#FFADAD",
        icon: "mdi-package-variant-closed",
      },
    ],
    services: [
      {
        title: {
          service: "🟡  Service 1:",
          commission: "10%",
        },
      },
      {
        title: {
          service: "🟡  Service 2:",
          commission: "20%",
        },
      },
      {
        title: {
          service: "🟡  Service 3:",
          commission: "7%",
        },
      },
      {
        title: {
          service: "🟡  Service 4:",
          commission: "5%",
        },
      },
      {
        title: {
          service: "🟡  Service 5:",
          commission: "10%",
        },
      },
    ],
  }),
};
</script>
