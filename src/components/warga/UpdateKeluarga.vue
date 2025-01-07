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
                  <label for="blok">Daftar Blok</label>
                  <div v-if="listBlok">
                    <select
                      class="custom-select form-control-border"
                      id="blok"
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
      listBlok: '',
    }
  },
  methods: {

    async submitUpdateKK() {
      const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/update/kk/' + idWargaKK;
      this.formValues.id_blok= parseInt(document.getElementById("blok").value);
      this.formValues.no_rumah=parseInt(document.getElementById("no_rumah").value);
      this.formValues.no_kk=document.getElementById("no_kk").value;
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

    async findKeluarga() {
        const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/find/kk/' + idWargaKK;
        await axios.get(url)
        .then((response)=>{
          this.cariWargaKK = response.data.result;
          console.log(this.cariWargaKK);
          document.getElementById("blok").value = this.cariWargaKK.blok.id;
          document.getElementById("no_rumah").value = this.cariWargaKK.no_rumah
          document.getElementById("no_kk").value = this.cariWargaKK.no_kk;
        }).catch(error=>{console.log(error)})
    },
    async daftarBlok() {
      const url = BASE_URL + 'warga/daftar/blok';
      await axios.get(url)
      .then((response)=>{
        this.listBlok = response.data;
        console.log(this.listBlok);
      })
      .catch(error=>{console.error(error)});
    },
  },
  created() {
    this.daftarBlok();
    this.findKeluarga();
  }
}

</script>
