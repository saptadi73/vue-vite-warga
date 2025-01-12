<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <p>Laporan Iuran Warga</p>

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
                <label for="id_iuran">Jenis Setoran</label>
                <div v-if="listType">
                  <select
                    class="custom-select form-control-border"
                    id="id_iuran"
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
                  @click="laporanSetoranonTheSpot"
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
                <th>Jumlah</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody v-if="hasilSetoran">
              <tr v-for="(resultku, index) in hasilSetoran" :key="resultku.id">
                <td>{{ index + 1 }}</td>
                <td>{{ resultku.kk.warga[0].nama }}</td>
                <td>{{ resultku.kk.blok.blok }}</td>
                <td>{{ resultku.kk.no_rumah }}</td>
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
import FlatpickrComponent from "../FlatpickrComponent.vue";
import { ref } from "vue";

export default {
  components: {
   
    FlatpickrComponent,
  },
  data() {
    return {
      hasilAllWarga: {},
      hasilSetoran: {},
      formValues: {},
      listType: {},
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

    formatTanggal(dateString) {
      const tanggal = new Date(dateString);
      const localeDate = tanggal.toLocaleDateString("en-GB");

      return localeDate;
    },

    async laporanSetoranonTheSpot() {
      this.formValues.iuran = parseInt(
        this.formValues.iuran
      );
      this.formValues.tanggal_awal =
        this.formValues.tanggal_awal + " 00:00:00";
      this.formValues.tanggal_akhir =
        this.formValues.tanggal_akhir + " 23:59:59";
        const url = BASE_URL + "bayar/list/setoran";

        console.log(this.formValues);

        await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilSetoran = response.data.result;
          console.log(this.hasilSetoran);
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
    this.getAllWarga();
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
