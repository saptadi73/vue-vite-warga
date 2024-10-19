<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <h4>Laporan Setoran</h4>
        <div class="card-header">
          <div>
            <p></p>
          </div>
          <div>
            <form v-on:submit.prevent>
              <div>
                <label for="tanggal_awal">Tanggal Awal</label>
                <flat-pickr
                  v-model="tanggal_awal"
                  :config="config"
                  class="form-control"
                  id="tanggal_awal"
                ></flat-pickr>
              </div>
              <div>
                <label for="tanggal_akhir">Tanggal Akhir</label>
                <flat-pickr
                  v-model="tanggal_akhir"
                  :config="config"
                  class="form-control"
                  id="tanggal_akhir"
                ></flat-pickr>
              </div>
              <div>
                &nbsp;<br>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="laporanSetoranku"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="tableoke" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIK</th>
                <th>Blok</th>
                <th>No.</th>
                <th>Edit</th>
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
                <th>NIK</th>
                <th>Blok</th>
                <th>No.</th>
                <th>Edit</th>
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
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      hasilAllWarga: {},
      formValues: {},
      config: {
        enableTime: false, // Hanya date picker
        dateFormat: "Y-m-d", // Format tanggal
      },
      tanggal_akhir: null,
      tanggal_awal: null,
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

    async laporanSetoranku(){
        this.formValues.tanggal_awal = this.tanggal_awal + "00:00:00";
        this.formValues.tanggal_akhir = this.tanggal_akhir + "00:00:00";
    }
  },
  created() {
    this.getAllWarga();
  },
};
</script>
