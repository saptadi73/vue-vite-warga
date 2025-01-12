<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <p>Laporan Iuran Warga</p>

          <div>
            <form v-on:submit.prevent> 
              <div class="form-group">
                <label for="bulan">Bulan</label>
                <select
                  class="custom-select form-control-border"
                  id="bulan"
                  v-model="formValues.bulan"
                >
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>

              <div class="form-group">
                <label for="tahun">Tahun</label>
                <select
                  class="custom-select form-control-border"
                  id="tahun"
                  v-model="formValues.tahun"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              <div class="form-group">
                <label for="iuran">Jenis Setoran</label>
                <div v-if="listType">
                  <select
                    class="custom-select form-control-border"
                    id="iuran"
                    v-model="formValues.iuran"
                  >
                    <option
                      v-for="resultmu in listType.result"
                      :key="resultmu.id"
                      :value="`${resultmu.id}`"
                    >
                      {{ resultmu.nama }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                &nbsp;<br />
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="laporanBelumBayar"
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
                <th>Nama Kepala Keluarga</th>
                <th>Blok</th>
                <th>No.</th>
              </tr>
            </thead>
            <tbody v-if="hasilAnggaran">
              <tr v-for="(resultku, index) in hasilAnggaran" :key="resultku.id">
                <td>{{ index + 1 }}</td>
                <td>{{ resultku.warga[0].nama }}</td>
                <td>{{ resultku.blok.blok }}</td>
                <td>{{ resultku.no_rumah }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Blok</th>
                <th>No.</th>
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
import FlatpickrComponent from "../FlatpickrComponent.vue";
import { ref } from "vue";

export default {
  components: {
    FlatpickrComponent,
  },
  data() {
    return {
      hasilAnggaran: {},
      hasiltest: {},
      formValues: {},
      listType: {},
    };
  },

  methods: {

    formatTanggal(dateString) {
      const tanggal = new Date(dateString);
      const localeDate = tanggal.toLocaleDateString("en-GB");

      return localeDate;
    },

    async laporanBelumBayar() {
      this.formValues.bulan = parseInt(
        this.formValues.bulan
      );
      this.formValues.tahun = parseInt(
        this.formValues.tahun
      );
      this.formValues.iuran = parseInt(
      this.formValues.iuran
      );
      
      const url = BASE_URL + "bayar/list/belum";

      console.log(this.formValues);

      await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilAnggaran = response.data.result;
          console.log(this.hasilAnggaran);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    formatRupiah(number) {
      const amount = number;

      // Format as Indonesian Rupiah (IDR)
      const formattedIDR = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Rupiah usually doesn't show decimals
        maximumFractionDigits: 0,
      }).format(amount);

      return formattedIDR;
    },

    async listIuran() {
      const url = BASE_URL + "bayar/list/iuran";
      await axios
        .get(url)
        .then((response) => {
          this.listType = response.data;
          console.log(this.listType);
        })
        .catch((error) => console.error(error));
    },
  },
  created() {
    this.listIuran();
  },
  setup() {
    const selectedDate = ref(null);

    return {
      selectedDate,
    };
  }
};
</script>
