<template>
  <!-- <div
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
  </div> -->
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeButton')"></button>
        </div>
        <div class="modal-body">
          <p>{{description}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeButton')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    description: String,
  },
}

</script>

<style lang="scss" scoped></style>
