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
                  <label for="nama">Nama Kepala Keluarga</label>
                  <input
                  type="text"
                  class="form-control"
                  id="nama"
                  v-model="formValues.nama"
                />
                </div>
                <div class="form-group">
                  <label for="nama">Blok</label>
                  <input
                  type="text"
                  class="form-control"
                  id="blok"
                  v-model="formValues.blok"
                />
                </div>
                <div class="form-group">
                  <label for="nama">Nomor</label>
                  <input
                  type="text"
                  class="form-control"
                  id="nomor"
                  v-model="formValues.nomor"
                />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">View KTP</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="nilai">Nama File</label>
                <input
                  type="text"
                  class="form-control"
                  id="nama"
                  placeholder="00000"
                  v-model="formValues.nilai"
                />
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
              <div class="h-auto d-inline-block">
                Preview Image
                <img :src="previewImage" v-if="previewImage" width="350" />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
  
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../base.url.util";


import { ref } from "vue";

export default {
  
  data() {
    return {
      formValues: {},
      tanggal: null,
      hasilTambahWarga: "",
      hasilCariWarga: "",
      listType: {},
      listNama: {},
      formValues: {},
      hasilTambahKTP: "",
      previewImage: null,
      namaGambar: "",
      file: null,
    };
  },
  methods: {

    async listWarga() {
      const id = this.$route.params.id;
      const url = BASE_URL + "warga/viewktp/" + id;
      await axios
        .get(url)
        .then((response) => {
          this.listNama = response.data;
          console.log(this.listNama);
          const imageku = this.listNama.data.url;
          console.log(imageku);
          this.previewImage = "https://localhost:3000/files/" + imageku;
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
    this.listWarga();
  },
  setup() {
    const showToast = ref(false);

    return {
      showToast,
    };
  },
};
</script>
