export default defineNuxtPlugin((nuxtApp) => {
  const myObject = {
    dessert: [
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "1",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "0",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "6",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "7",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "16",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "1",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "2",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "8",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "45",
      },
      {
        name: "₱ 4000",
        calories: "Juan Dela Cruz",
        fat: "Downpayment",
        carbs: "102100082",
        protein: "01/01/2024",
        iron: "22",
      },
    ],
    //   greet: function() {
    //     console.log(this.message);
    //   }

  };

  nuxtApp.provide("myObject", myObject);
});
