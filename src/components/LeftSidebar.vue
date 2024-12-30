<template>
  <!-- Left navbar links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" data-widget="pushmenu" href="#" role="button"
        ><i class="fas fa-bars"></i
      ></a>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
      <a href="#" class="nav-link">{{title1}}</a>
      <i class="right fas fa-angle-left"></i>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
      <a href="#" class="nav-link">{{title2}}</a>
      <i class="right fas fa-angle-left"></i>
    </li>
  </ul>
</template>
<script setup lang="ts">

interface PropsLeftSide {
  title1: string
  title2: string
}

defineProps<PropsLeftSide>()
</script>
