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
                    <label for="blok">Isikan Blok Rumah</label>
                    <input
                      type="text"
                      class="form-control"
                      id="blok"
                    />
                  </div>
  
                  
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary" @click="submitTambahBlok">Submit</button>
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
      }
    },
    methods: {
  
      async submitTambahBlok() {
        const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/edit/blok';
        this.formValues.blok= document.getElementById("blok").value;
        this.formValues.id = parseInt(idWargaKK);
        await axios.post(url, this.formValues, {
          headers: {
            'Content-Type':'application/json',
          },
        }).then((response)=>{
          this.hasilTambahKK = response.data;
          console.log(this.hasilTambahKK);
          this.$router.push('/warga/daftar/blok');
        }).catch(error=>{console.error(error)});
      },

      async findBlok() {
        const idWargaKK = this.$route.params.id;
        const url = BASE_URL + 'warga/cari/blok/' + idWargaKK;
        await axios.get(url)
        .then((response)=>{
          this.cariWargaKK = response.data.result;
          document.getElementById("blok").value = this.cariWargaKK.blok;
          console.log(this.cariWargaKK);
        }).catch(error=>{console.log(error)})
    }
    },
    created() {
        this.findBlok();
    }
  }
  
  </script>
  