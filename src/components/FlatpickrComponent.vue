<template>
  <div>
    <input ref="datepicker" :placeholder="placeholder" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  props: {
    modelValue: {
      type: [String, Date],
      default: null,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: "Select Date",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const datepicker = ref(null);
    let flatpickrInstance = null;

    onMounted(() => {
      flatpickrInstance = flatpickr(datepicker.value, {
        ...props.options,
        defaultDate: props.modelValue,
        onChange: (selectedDates, dateStr) => {
          emit("update:modelValue", dateStr);
        },
      });
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        if (flatpickrInstance) {
          flatpickrInstance.setDate(newValue, true);
        }
      }
    );

    return { datepicker };
  },
  created() {
   

  },
  methods: {

    
  }
};
</script>
