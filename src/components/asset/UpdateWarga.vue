<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Input Isian Warga</h3>
            </div>
            <form v-on:submit.prevent>
              <div class="card-body">
                <div class="form-group">
                  <label for="nik">Nomor NIK</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nik"
                    placeholder="nomor NIK"
                    
                  />
                </div>

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
                  <label for="type">Type Anggota Keluarga</label>
                  <div v-if="listType">
                    <select
                      class="custom-select form-control-border"
                      id="type"
                      
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

                <div class="form-group">
                  <label for="jenis_kelamin">Jenis Kelamin</label>
                  <select
                    class="custom-select form-control-border"
                    id="jenis_kelamin"
                    
                  >
                    <option value="1">Laki-laki</option>
                    <option value="0">Perempuan</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Input Isian Warga</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="tempat_lahir">Tempat Lahir</label>
                <input
                  type="text"
                  class="form-control"
                  id="tempat_lahir"
                  placeholder="Tempat Lahir"
                  
                />
              </div>
              <div>
                <label for="tanggal_lahir">Tanggal lahir:</label>
                <flat-pickr
                  v-model="tanggal_lahir"
                  :config="config"
                  class="form-control"
                  id="tanggal_lahir"
                ></flat-pickr>
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
            </div>
            <div class="card-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click="submitTambahWarga"
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
      tanggal_lahir: null,
      hasilTambahWarga: "",
      jenis_kelaminku:"",
      type_anggotaku: "",
      cariWarga: {},
      listType: {},
      config: {
        enableTime: false, // Hanya date picker
        dateFormat: "Y-m-d", // Format tanggal
      },
    };
  },
  methods: {
    async submitUpdateWarga() {
      const idku = this.$route.params.id;
      const url = BASE_URL + "warga/add/warga";
      (this.formValues.tanggal_lahir = this.tanggal_lahir + " 00:00:00"),
        (this.formValues.id_type = parseInt(this.formValues.id_type));
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

    async listTypeku() {
      const url = BASE_URL + "warga/list/type";
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

    async findWarga() {
      const idWarga = this.$route.params.id;
      const url = BASE_URL + "warga/find/warga/" + idWarga;
      await axios.get(url).then((response) => {
        this.cariWarga = response.data.result;
        console.log(this.cariWarga);

        document.getElementById("nama").value = this.cariWarga.nama;
        document.getElementById("nik").value = this.cariWarga.nik;
        document.getElementById("tempat_lahir").value =
          this.cariWarga.tempat_lahir;
        document.getElementById("no_hp").value = this.cariWarga.no_hp;

        let dbDate = this.cariWarga.tanggal_lahir;

        // Convert the database date into a Date object
        let dateObj = new Date(dbDate);

        // Format the date as 'YYYY-MM-DD'
        let year = dateObj.getFullYear();
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based
        let day = ("0" + dateObj.getDate()).slice(-2);

        // Combine into the desired format
        let formattedDate = `${year}-${month}-${day}`;

        // Set the value of the input field
        document.getElementById("tanggal_lahir").value = formattedDate;

        const indexku = this.cariWarga.jenis_kelamin;

        if (indexku==false) {
          this.jenis_kelaminku="0";
        }else{
          this.jenis_kelaminku="1";
        }
        console.log(indexku);
        console.log(this.jenis_kelaminku);

        document.getElementById("jenis_kelamin").value = this.jenis_kelaminku;

        const id_typeku = this.cariWarga.id_type;
        console.log(id_typeku);

        document.getElementById("type").value=id_typeku;
      });
    },
  },
  created() {
    this.listTypeku();
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
