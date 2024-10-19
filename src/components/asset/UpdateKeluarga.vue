import axios from 'axios';
<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Form Input Isian Kartu Keluarga</h3>
            </div>
            <form v-on:submit.prevent>
              <div class="card-body">
                <div class="form-group">
                  <label for="no_kk">Nomor Kartu Keluarga</label>
                  <input
                    type="text"
                    class="form-control"
                    id="no_kk"
                    placeholder="nomor Kartu Keluarga"
                  />
                </div>

                <div class="form-group">
                  <label for="no_blok">Nomor Blok</label>
                  <select
                    class="custom-select form-control-border"
                    id="no_blok"
                  >
                    <option value="1">C01</option>
                    <option value="2">C02</option>
                    <option value="8">C08</option>
                    <option value="9">C09</option>
                    <option value="10">C10</option>
                    <option value="11">C11</option>
                    <option value="12">C12</option></select
                  >
                </div>

                <div class="form-group">
                  <label for="no_rumah">No Rumah</label>
                  <input
                    type="text"
                    class="form-control"
                    id="no_rumah"
                    placeholder="nomer rumah"
                  />
                </div>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary" @click="submitUpdateKK">Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
import { BASE_URL } from '@/base.url.util';
import axios from 'axios'
export default {
  data() {
    return {
      formValues: {},
      hasilTambahKK: '',
      cariWargaKK: {},
    }
  },
  methods: {

    async submitUpdateKK() {
      const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/update/kk/' + idWargaKK;
      this.formValues.no_blok= parseInt(document.getElementById("no_blok").value);
      this.formValues.no_rumah=parseInt(document.getElementById("no_rumah").value);
      this.formValues.no_kk=document.getElementById("no_kk").value;
      await axios.post(url, this.formValues, {
        headers: {
          'Content-Type':'application/json',
        },
      }).then((response)=>{
        this.hasilTambahKK = response.data;
        console.log(this.hasilTambahKK);
        this.$router.push('/asset/daftar/kk');
      }).catch(error=>{console.error(error)});
    },

    async findKeluarga() {
        const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/find/kk/' + idWargaKK;
        await axios.get(url)
        .then((response)=>{
          this.cariWargaKK = response.data.result;
          console.log(this.cariWargaKK);
          document.getElementById("no_blok").value = this.cariWargaKK.no_blok;
          document.getElementById("no_rumah").value = this.cariWargaKK.no_rumah
          document.getElementById("no_kk").value = this.cariWargaKK.no_kk;
        }).catch(error=>{console.log(error)})
    }
  },
  created() {
    this.findKeluarga();
  }
}

</script>
