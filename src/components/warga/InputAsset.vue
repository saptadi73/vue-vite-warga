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

                    v-model="formValues.no_kk"
                  />
                </div>

                <div class="form-group">
                  <label for="id_blok">Daftar Blok</label>
                  <div v-if="listBlok">
                    <select
                      class="custom-select form-control-border"
                      id="id_blok"
                      v-model="formValues.id_blok"
                    >
                      <option
                        v-for="resultmu in listBlok.result"
                        :key="resultmu.id"
                        :value="`${resultmu.id}`"
                      >
                        {{ resultmu.blok }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="no_rumah">No Rumah</label>
                  <input
                    type="number"
                    class="form-control"
                    id="no_rumah"
                    placeholder="nomer rumah"
                    v-model="formValues.no_rumah"
                  />
                </div>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary" @click="submitTambahKK">Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import { BASE_URL } from "../../base.url.util";

export default {
  data() {
    return {
      formValues: {},
      hasilTambahKK: '',
      listBlok:'',
    }
  },
  methods: {

    async submitTambahKK() {
      this.formValues.id_blok= parseInt(this.formValues.id_blok);
      this.formValues.no_rumah = this.formValues.no_rumah;
      const url = BASE_URL + 'warga/add/kk';
      console.log(this.formValues);
      await axios.post(url, this.formValues, {
        headers: {
          'Content-Type':'application/json',
        },
      }).then((response)=>{
        this.hasilTambahKK = response.data;
        console.log(this.hasilTambahKK);
        this.$router.push('/warga/daftar/kk');
      }).catch(error=>{console.error(error)});
    },

    async daftarBlok() {
      const url = BASE_URL + 'warga/daftar/blok';
      await axios.get(url)
      .then((response)=>{
        this.listBlok = response.data;
        console.log(this.listBlok);
      })
      .catch(error=>{console.error(error)});
    }
  },
  created() {
    this.daftarBlok();
  }
}

</script>
