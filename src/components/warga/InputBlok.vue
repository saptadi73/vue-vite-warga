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
                      placeholder="Contoh Isi Blok A, A2, A02"
  
                      v-model="formValues.blok"
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
        const url = BASE_URL + 'warga/add/blok';
        this.formValues.blok= this.formValues.blok;
        await axios.post(url, this.formValues, {
          headers: {
            'Content-Type':'application/json',
          },
        }).then((response)=>{
          this.hasilTambahKK = response.data;
          console.log(this.hasilTambahKK);
          this.$router.push('/warga/daftar/blok');
        }).catch(error=>{console.error(error)});
      }
    }
  }
  
  </script>
  