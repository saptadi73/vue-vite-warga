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
                  <label for="nik">Nomor NIK</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nik"
                    placeholder="nomor NIK"
                    v-model="formValues.nik"
                  />
                </div>

                <div class="form-group">
                  <label for="nama">Nama</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nama"
                    placeholder="Nama"
                    v-model="formValues.nama"
                  />
                </div>

                <div class="form-group">
                  <label for="type">Type Anggota Keluarga</label>
                  <div v-if="listType">
                    <select
                      class="custom-select form-control-border"
                      id="type"
                      v-model="formValues.id_type"
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
                    v-model="formValues.jenis_kelamin"
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
                  v-model="formValues.tempat_lahir"
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
                  v-model="formValues.no_hp"
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
      listType: {},
      config: {
        enableTime: false, // Hanya date picker
        dateFormat: "Y-m-d", // Format tanggal
      },
    };
  },
  methods: {
    async submitTambahWarga() {
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
  },
  created() {
    this.listTypeku();
  },
  setup() {
    const showToast = ref(false);

    return {
      showToast,
    };
  },
};
</script>
