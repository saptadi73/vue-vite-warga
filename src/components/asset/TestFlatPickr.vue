<template>
    <div>
      <FlatpickrComponent
        v-model="selectedDate"
        :options="{ dateFormat: 'Y-m-d' }"
        placeholder="Pick a date"
      />
      <p>Selected Date: {{ selectedDate }}</p>
    </div>
  </template>
  
  <script>
  import FlatpickrComponent from "../FlatpickrComponent.vue";
  import { ref } from "vue";
  
  export default {
    components: { FlatpickrComponent },
    setup() {
      const selectedDate = ref(null);
  
      return { selectedDate };
    },
    methods: {
        setTanggal() {
            this.selectedDate="2023-01-02";
        }
    },
    created() {
        this.setTanggal();
    }

  };
  </script>
  