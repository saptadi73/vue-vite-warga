<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Table Iuran Warga</h3>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent>
            <div>
              <label for="tanggal_awal">Tanggal</label>
              <flat-pickr
                :config="config"
                class="form-control"
                id="tanggal_awal"
              ></flat-pickr>
            </div>
            <div>
              <label for="tanggal_akhir">Tanggal</label>
              <flat-pickr
                :config="config"
                class="form-control"
                id="tanggal_akhir"
              ></flat-pickr>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">DataTable with default features</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="tableoke" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Blok</th>
                <th>No</th>
                <th>Nilai.</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody v-if="hasilAllWarga">
              <tr
                v-for="(resultku, index) in hasilAllWarga.result"
                :key="resultku.id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ resultku.nama }}</td>
                <td>{{ resultku.nik }}</td>
                <td>C {{ resultku.kk.no_blok }}</td>
                <td>{{ resultku.kk.no_rumah }}</td>
                <td>
                  <a :href="`/asset/form/update/warga/${resultku.id}`"
                    ><i class="fa fa-magic" aria-hidden="true"></i
                  ></a>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Blok</th>
                <th>No</th>
                <th>Nilai.</th>
                <th>Tanggal</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "@/base.url.util";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      hasilAllWarga: {},
    };
  },

  methods: {
    async getAllWarga() {
      // const id_kk = this.$route.params.id;
      const url = BASE_URL + "warga/list/all";
      axios.get(url).then((response) => {
        this.hasilAllWarga = response.data;
        console.log(this.hasilAllWarga);
      });
    },
  },
  created() {
    this.getAllWarga();
  },
};
</script>
