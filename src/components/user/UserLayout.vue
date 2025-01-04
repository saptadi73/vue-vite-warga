<template>
    <div class="wrapper">
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <LeftSidebar
        title1="User"
        title2="Administration"
        />
        <RightSidebar />
      </nav>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <MainSidebarTop />
      </aside>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </section>
      </div>
      <FooterLayout />
    </div>
  </template>
  
  <script>
  import LeftSidebar from './LeftSidebar.vue'
  import RightSidebar from './RightSidebar.vue'
  import MainSidebarTop from './MainSidebarTop.vue'
  import FooterLayout from './FooterLayout.vue'
  export default {
    components: { LeftSidebar,
    RightSidebar, MainSidebarTop,
    FooterLayout,
    }
  }
  </script>
  
  