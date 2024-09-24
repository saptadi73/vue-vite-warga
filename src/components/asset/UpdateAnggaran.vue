<template>
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Form Input Isian Warga</h3>
              </div>
              <form>
                <div class="card-body">
                  <div class="form-group">
                    <label for="nama">Nama</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nama"
                      placeholder="Nama"
                    />
                  </div>
  
                  <div class="form-group">
                    <label for="no_hp">No HP/WA</label>
                    <input
                      type="text"
                      class="form-control"
                      id="no_hp"
                      placeholder="No HP/WA"
                    />
                  </div>
  
                  <div class="form-group">
                    <label for="id_iuran">Jenis Setoran</label>
                    <div v-if="listType">
                      <select
                        class="custom-select form-control-border"
                        id="id_iuran"
                        v-model="formValues.id_iuran"
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
                <h3 class="card-title">Form Input Setoran Warga</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="nilai">Nilai</label>
                  <input
                    type="number"
                    class="form-control"
                    id="nilai"
                    placeholder="00000"
                    v-model="formValues.nilai"
                  />
                </div>
                <div>
                  <label for="tanggal">Tanggal</label>
                  <flat-pickr
                    v-model="tanggal"
                    :config="config"
                    class="form-control"
                    id="tanggal"
                  ></flat-pickr>
                </div>
  
                <div class="form-group">
                  <label for="keterangan">Keterangan</label>
                  <input
                    type="text"
                    class="form-control"
                    id="keterangan"
                    placeholder="keterangan"
                    v-model="formValues.keterangan"
                  />
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="submitTambahSetor"
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
        tanggal: null,
        hasilTambahWarga: "",
        hasilCariWarga: "",
        listType: {},
        config: {
          enableTime: false, // Hanya date picker
          dateFormat: "Y-m-d", // Format tanggal
        },
      };
    },
    methods: {
      async submitTambahSetor() {
        const idku = this.$route.params.id;
        const url = BASE_URL + "bayar/add/setor";
        (this.formValues.tanggal = this.tanggal + " 00:00:00"),
          (this.formValues.id_iuran = parseInt(this.formValues.id_iuran));
          this.formValues.nilai = parseInt(this.formValues.nilai);
        this.formValues.id_kk = parseInt(idku);
        await axios
          .post(url, this.formValues, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.hasilTambahWarga = response.data;
            console.log(this.hasilTambahWarga);
            if (this.hasilTambahWarga.status == "ok") {
              this.showToast = true;
              this.title = this.hasilTambahWarga.status;
              this.description = this.hasilTambahWarga.message;
            } else {
              this.showToast = true;
              this.title = this.hasilTambahWarga.status;
              this.description = this.hasilTambahWarga.message;
            }
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(this.formValues);
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
  
      tutupToast() {
        this.showToast = false;
        if (this.hasilTambahWarga.status == "ok") {
          this.$router.push("/asset/daftar/kk");
        }
      },
  
      async findAnggaran() {
        const idku = this.$route.params.id;
        const url = BASE_URL + "bayar/cari/anggaran/" + idku;
  
        await axios
          .get(url)
          .then((response) => {
            this.hasilCariWarga = response.data;
            console.log(this.hasilCariWarga);
            document.getElementById("nama").value =
              this.hasilCariWarga.result.nama;
            document.getElementById("no_hp").value =
              this.hasilCariWarga.result.no_hp;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
    created() {
      this.listIuran();
      this.findWarga();
    },
    setup() {
      const showToast = ref(false);
  
      return {
        showToast,
      };
    },
  };
  </script>
  