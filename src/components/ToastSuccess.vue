<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    style="z-index: 11"
  >
    <div
      class="toast align-items-center text-bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toast"
    >
    <strong class="me-auto">{{title}}</strong>
    
      <div class="d-flex">
        <div class="toast-body">
          {{ description }}
        </div>
        <button
          type="button"
          class="btn-close btn-primary"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="$emit('closeButton')"
        >Close</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    description: String,
    autoHide: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 5000, // 5 seconds by default
    },
  },
  mounted() {
    // Use Bootstrap's JavaScript toast API to show the toast
    const toastEl = this.$refs.toast;
    const toastInstance = new bootstrap.Toast(toastEl, {
      autohide: this.autoHide,
      delay: this.delay,
    });
    toastInstance.show();
  }
}

</script>

<style lang="scss" scoped></style>
