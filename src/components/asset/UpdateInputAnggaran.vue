<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Input Isian Arus Anggaran</h3>
            </div>
            <form>
              <div class="card-body">
                <div class="form-group">
                  <label for="id_warga">Nama Warga</label>
                  <div v-if="listNama">
                    <select
                      class="custom-select form-control-border"
                      id="id_warga"
                    >
                      <option
                        v-for="resultmu in listNama.result"
                        :key="resultmu.id"
                        :value="`${resultmu.id}`"
                      >
                        {{ resultmu.nama }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
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

                  <label for="id_jenis_anggaran"
                    >Jenis Pembiayaan/Pemasukan</label
                  >
                  <div v-if="listType">
                    <select
                      class="custom-select form-control-border"
                      id="id_jenis_anggaran"
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
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Input Isian Arus Anggaran</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="nilai">Nilai</label>
                <input
                  type="number"
                  class="form-control"
                  id="nilai"
                  placeholder="00000"
                />
              </div>
              <div class="form-group">
                <label for="tanggal">Tanggal</label>
                <input
                  type="text"
                  class="form-control"
                  id="tanggal"
                  
                />
              </div>

              <div class="form-group">
                <label for="keterangan">Keterangan</label>
                <input
                  type="text"
                  class="form-control"
                  id="keterangan"
                  placeholder="keterangan"
                />
              </div>
            </div>
            <div class="card-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click="submitTambahAnggaran"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ToastSuccess
    v-if="showToast"
    :title="title"
    :description="description"
    v-on:closeButton="tutupToast"
  ></ToastSuccess>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../base.url.util";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css"; // CSS default dari Flatpickr
import ToastSuccess from "@/components/ToastSuccess.vue";
import { ref } from "vue";

export default {
  components: {
    flatPickr,
    ToastSuccess,
  },
  data() {
    return {
      formValues: {},
      formType: {},
      tanggal: null,
      hasilTambahWarga: "",
      hasilCariWarga: "",
      listType: {},
      listTypeAnggaranku: {},
      listNama: {},
      config: {
        enableTime: false, // Hanya date picker
        dateFormat: "Y-m-d", // Format tanggal
      },
    };
  },
  methods: {
    async submitTambahAnggaran() {
      this.formValues.id_warga = parseInt(this.formValues.id_warga);
      const url = BASE_URL + "bayar/add/anggaran";
      (this.formValues.tanggal = this.tanggal + " 00:00:00"),
        (this.formValues.id_type_anggaran = parseInt(
          document.getElementById("id_type_anggaran").value
        )),
        (this.formValues.id_jenis_anggaran = parseInt(
          this.formValues.id_jenis_anggaran
        ));
      this.formValues.nilai = parseInt(this.formValues.nilai);
      await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilTambahWarga = response.data;
          console.log(this.hasilTambahWarga);
          this.$router.push("/anggaran/cari");
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.formValues);
    },

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

    async listWarga() {
      const url = BASE_URL + "warga/list/all";
      await axios
        .get(url)
        .then((response) => {
          this.listNama = response.data;
          console.log(this.listNama);
        })
        .catch((error) => console.error(error));
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

    tutupToast() {
      this.showToast = false;
      if (this.hasilTambahWarga.status == "ok") {
        this.$router.push("/asset/daftar/kk");
      }
    },

    async findAnggaran() {
      const idku = this.$route.params.id;
      const url = BASE_URL + "bayar/find/anggaran/" + idku;

      await axios
        .get(url)
        .then((response) => {
          this.hasilCariAnggaran = response.data;
          console.log(this.hasilCariAnggaran);

          document.getElementById("id_warga").selectedIndex =
            this.hasilCariAnggaran.result.warga.id;

          const typeku = this.hasilCariAnggaran.result.type_anggaran.id;

          console.log(typeku);

          document.getElementById("id_type_anggaran").selectedIndex = typeku;

          this.listJenisAnggaran(typeku);

          document.getElementById("id_jenis_anggaran").value =
            this.hasilCariAnggaran.result.jenis_anggaran.id;

          let dbDate = this.hasilCariAnggaran.result.tanggal;

          // Convert the database date into a Date object
          let dateObj = new Date(dbDate);

          // Format the date as 'YYYY-MM-DD'
          let year = dateObj.getFullYear();
          let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based
          let day = ("0" + dateObj.getDate()).slice(-2);

          // Combine into the desired format
          let formattedDate = `${year}-${month}-${day}`;
          console.log(formattedDate);

          // Set the value of the input field
          document.getElementById("tanggal").value = formattedDate;

          document.getElementById("nilai").value =
            this.hasilCariAnggaran.result.nilai;

          document.getElementById("keterangan").value =
            this.hasilCariAnggaran.result.keterangan;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async setDatePickr() {

        const datemu = flatPickr("#tanggal");
        const dateToSet = "03/03/2025"; // ISO 8601 format
      datemu.setDate(dateToSet, true);
    }
  },
  created() {
    this.listWarga();
    this.listTypeAnggran();
    this.findAnggaran();

  },
  setup() {
    const showToast = ref(false);

    return {
      showToast,
    };
  },
};
</script>
