<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <p>Laporan Arus Keluar / Masuk Anggaran</p>

          <div>
            <form v-on:submit.prevent>
              <div>
                <label for="tanggal">Tanggal Awal</label>
                <FlatpickrComponent
                  v-model="formValues.tanggal_awal"
                  :options="{ dateFormat: 'Y-m-d' }"
                  placeholder="Pilih tanggal"
                />
              </div>
              <div>
                <label for="tanggal">Tanggal Akhir</label>
                <FlatpickrComponent
                  v-model="formValues.tanggal_akhir"
                  :options="{ dateFormat: 'Y-m-d' }"
                  placeholder="Pilih tanggal"
                />
              </div>
              <div class="form-group">
                <label for="id_type_anggaran">Type Arus Anggaran</label>
                <select
                  class="custom-select form-control-border"
                  id="id_type_anggaran"
                  @change="pilihType"
                >
                  <option value="0" selected>Pilih Type Anggaran</option>
                  <option
                    v-for="resultmu in listTypeAnggaranku.result"
                    :key="resultmu.id"
                    :value="`${resultmu.id}`"
                  >
                    {{ resultmu.type }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="id_jenis_anggaran"
                  >Jenis Pembiayaan/Pemasukan</label
                >
                <div v-if="listType">
                  <select
                    class="custom-select form-control-border"
                    id="id_jenis_anggaran"
                    v-model="formValues.id_jenis_anggaran"
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
                  @click="laporanAnggaran"
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
                <th>Blok</th>
                <th>No.</th>
                <th>Jenis</th>
                <th>Jumlah</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody v-if="hasilAnggaran">
              <tr v-for="(resultku, index) in hasilAnggaran" :key="resultku.id">
                <td>{{ index + 1 }}</td>
                <td>{{ resultku.warga.nama }}</td>
                <td>{{ resultku.warga.kk.blok.blok }}</td>
                <td>{{ resultku.warga.kk.no_rumah }}</td>
                <td>{{ resultku.jenis_anggaran.nama }}</td>
                <td>{{ formatRupiah(resultku.nilai) }}</td>
                <td>{{ formatTanggal(resultku.tanggal) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Blok</th>
                <th>No.</th>
                <th>Jenis</th>
                <th>Jumlah</th>
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
import flatPickr from "vue-flatpickr-component";
import FlatpickrComponent from "../FlatpickrComponent.vue";
import { ref } from "vue";

export default {
  components: {
    flatPickr,
    FlatpickrComponent,
  },
  data() {
    return {
      hasilAnggaran: {},
      hasiltest: {},
      formValues: {},
      formType: {},
      listType: {},
      listTypeAnggaranku: {},
      config: {
        enableTime: false, // Hanya date picker
        dateFormat: "Y-m-d", // Format tanggal
      },
      tanggal_akhir: null,
      tanggal_awal: null,
    };
  },

  methods: {
    async listJenisAnggaran(id_type_anggaran) {
      const url = BASE_URL + "bayar/list/jenis/anggaran";
      this.formType.id_type_anggaran = parseInt(id_type_anggaran);
      await axios
        .post(url, this.formType, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.listType = response.data;
          console.log(this.listType);
        })
        .catch((error) => console.error(error));
    },

    pilihType() {
      const typekuAnggaran = document.getElementById("id_type_anggaran").value;
      this.listJenisAnggaran(typekuAnggaran);
    },

    async listTypeAnggran() {
      const url = BASE_URL + "bayar/list/type/anggaran";
      await axios
        .get(url)
        .then((response) => {
          this.listTypeAnggaranku = response.data;
          console.log(this.listTypeAnggaranku);
        })
        .catch((error) => console.error(error));
    },

    formatTanggal(dateString) {
      const tanggal = new Date(dateString);
      const localeDate = tanggal.toLocaleDateString("en-GB");

      return localeDate;
    },

    async laporanAnggaran() {
      this.formValues.id_jenis_anggaran = parseInt(
        this.formValues.id_jenis_anggaran
      );
      this.formValues.id_type_anggaran=parseInt(document.getElementById("id_type_anggaran").value);
      this.formValues.tanggal_awal = this.formValues.tanggal_awal + " 00:00:00";
      this.formValues.tanggal_akhir =
        this.formValues.tanggal_akhir + " 23:59:59";
      const url = BASE_URL + "bayar/list/anggaran";

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
          // console.log(this.hasilAnggaran[0].warga.nama);
          // console.log(this.hasilAnggaran[0].warga.kk.no_blok);
          // console.log(this.hasilAnggaran[0].warga.kk.no_rumah);
          // console.log(this.hasilAnggaran[0].nilai);
          // console.log(this.hasilAnggaran[0].tanggal);
          // console.log(this.hasilAnggaran[0].jenis_anggaran.nama);
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
  },
  created() {
    this.listTypeAnggran();
  },
  setup() {
    const selectedDate = ref(null);

    return {
      selectedDate,
    };
  },
};
</script>
