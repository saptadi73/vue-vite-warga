<template>
  <!-- Brand Logo -->
  <a href="#" class="brand-link">
    <!-- <img
          src=""
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        /> -->
    <span class="brand-text font-weight-light">Database Warga</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <!-- <img src="" class="img-circle elevation-2" alt="User Image" /> -->
      </div>
      <div class="info">
        <a href="#" class="d-block">RT 01 RW 14</a>
      </div>
    </div>
  </div>

  <div class="sidebar">
    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul
        class="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
              DashBoard&nbsp;&nbsp;&nbsp;
              <i class="fab fa-hubspot"></i>
            </p>
          </a>
          
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-table"></i>
            <p>
              Warga&nbsp;&nbsp;&nbsp;
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <div class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <RouterLink to="/asset/daftar/kk">Daftar KK/Rumah</RouterLink>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link">
                <RouterLink to="/asset/new/asset">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Pendaftaran KK</p>
                </RouterLink>
              </div>
            </li>
            <li class="nav-item">
              <RouterLink to="/asset/all/warga" class="nav-link"><i class="far fa-circle nav-icon"></i>
                <p>Daftar Warga</p></RouterLink>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon far fa-calendar-alt"></i>
            <p>
              Iuran&nbsp;&nbsp;&nbsp;
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>List Jenis Iuran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Setoran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Laporan Iuran</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-money"></i>
            <p>
              Anggaran&nbsp;&nbsp;&nbsp;
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Daftar Anggaran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Jenis Anggaran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <RouterLink to="/asset/input/anggaran">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Input Anggaran</p></RouterLink>
                
                
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-dolly-flatbed"></i>
            <p>
              Laporan-laporan&nbsp;&nbsp;&nbsp;
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Total Pemasukan</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Total Pengeluaran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Jenis Pemasukan</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Jenis Pengeluaran</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Jenis Pemasukan</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Belum Bayar</p>
              </a>
            </li>

            
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="fab fa-hornbill"></i>
            <p>
              Settings&nbsp;&nbsp;&nbsp;
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>User</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Level</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Barang</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Warehouse</p>
              </a>
            </li>

            
          </ul>
        </li>

      </ul>
    </nav>
  </div>
</template>
