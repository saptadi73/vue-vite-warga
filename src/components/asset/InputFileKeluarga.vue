<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Upload File Keluarga</h3>
            </div>
            <form v-on:submit.prevent>
              <div class="card-body">
                <div class="form-group">
                  <label for="nama_file">Nama File</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nama_file"
                    placeholder="Nama File"
                    v-model="formValues.nama_file"
                  />
                </div>

                <div class="form-group">
                  <label for="keterangan">Keterangan</label>
                  <input
                    type="text"
                    class="form-control"
                    id="keterangan"
                    placeholder="Keterangan"
                    v-model="formValues.keterangan"
                  />
                </div>

                <div class="form-group">
                  <label for="fileInput">File</label>
                  <input
                    type="file"
                    class="form-control"
                    id="fileInput"
                    placeholder="Input File"
                    v-on:change="pickFile"
                  />
                </div>
                <div class="h-auto d-inline-block">
                  Preview Image
                  <img :src="previewImage" v-if="previewImage" />
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="submitTambahKK"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import router from "../router";
import { ref } from "vue";
export default {
  data() {
    return {
      formValues: {},
      hasilTambahKK: "",
      previewImage: null,
      namaGambar: "",
      file: null,
    };
  },
  methods: {
    async submitTambahKK() {
      this.formValues.no_blok = parseInt(this.formValues.no_blok);
      this.formValues.no_rumah = parseInt(this.formValues.no_rumah);
      await axios
        .post("http://localhost:3000/warga/add/kk", this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilTambahKK = response.data;
          console.log(this.hasilTambahKK);
          this.$router.push("/asset/daftar/kk");
        })
        .catch((error) => {
          console.error(error);
        });
    },

    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
      this.namaGambar = event.target.files[0].name;
      this.previewImage = URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>
