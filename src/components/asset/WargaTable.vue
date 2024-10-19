<template>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Asset</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Asset</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->
  </section>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Table Warga per KK</h3>

              <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px">
                  <button
                    type="submit"
                    class="btn btn-default"
                    @click="tambahWargaKK"
                  >
                    Anggota Baru
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>type</th>
                    <th>No.HP</th>
                    <th>Blok</th>
                    <th>No.</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="dataWargaKK">
                  <tr
                    v-for="(resultku, index) in dataWargaKK.result"
                    :key="resultku.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ resultku.nama }}</td>
                    <td>{{ resultku.nik }}</td>
                    <td>{{ resultku.type.nama }}</td>
                    <td>{{ resultku.no_hp }}</td>
                    <td>{{ resultku.kk.no_blok }}</td>
                    <td>{{ resultku.kk.no_rumah }}</td>
                    <td><router-link :to="`/asset/form/update/warga/${resultku.id}`">&nbsp;&nbsp;<i class="fa fa-check" aria-hidden="true">Edit</i></router-link></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
      </div>
      <!-- /.row -->
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../base.url.util";

export default {
  data() {
    return {
      dataWargaKK: {},
      nomor: 0,
    };
  },
  methods: {
    async listKK() {
      const id_kk = this.$route.params.id;
      const url = BASE_URL + "warga/list/warga/" + id_kk;
      await axios.get(url).then((response) => {
        this.dataWargaKK = response.data;
        console.log(this.dataWargaKK);
      });
    },
    tambahWargaKK() {
      const id_kk = this.$route.params.id;
      const url = "/asset/new/warga/" + id_kk;
      this.$router.push(url);
    },
  },
  created() {
    this.listKK();
  },
};
</script>
