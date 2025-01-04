<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Upload Kartu Keluarga Keluarga</h3>
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
                  <img :src="previewImage" v-if="previewImage" width="350"/>
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="kirimKK"
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
import ToastSuccess from "@/components/ToastSuccess.vue";
import { ref } from "vue";

export default {
  components: {
    ToastSuccess,
  },
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
    
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
      this.namaGambar = event.target.files[0].name;
      this.previewImage = URL.createObjectURL(event.target.files[0]);
    },

    async kirimKK() {
      const idku = this.$route.params.id;
      const url = BASE_URL + "warga/fotokk";
      const formDataku = new FormData();
      formDataku.append("file",this.file);
      formDataku.append("id_kk", idku);
      formDataku.append("nama",this.formValues.nama_file);
      formDataku.append("keterangan", this.formValues.keterangan);

      axios
      .post(url, formDataku, {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.hasilTambahKK = response.data;
          if (this.hasilTambahKK.status == "ok") {
            this.showToast = true;
            this.title = this.hasilTambahKK.status;
            this.description = this.hasilTambahKK.message;
          } else {
            this.showToast = true;
            this.title = this.hasilTambahKK.status;
            this.description = this.hasilTambahKK.message;
          }
        })


    },

    tutupToast() {
      this.showToast = false;
      if(this.hasilTambahKK.status == "ok")
      {
        let urlkuya = "/asset/daftar/kk";
        this.$router.push(urlkuya);
      }
    },
  },
  setup() {
    const showToast = ref(false);

    return {
      showToast,
    };
  },
};
</script>
