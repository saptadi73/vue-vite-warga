<template>
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Form Input Level User</h3>
              </div>
              <form v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group">
                    <label for="nama">Level User</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nama"
                      placeholder="Input Level User"
  
                      v-model="formValues.nama"
                    />
                    <label for="deskripsi">Keterangan</label>
                    <input
                      type="text"
                      class="form-control"
                      id="deskripsi"
                      placeholder="Keterangn Level User"
  
                      v-model="formValues.deskripsi"
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
  export default {
    data() {
      return {
        formValues: {},
        hasilTambahLevel: '',
      }
    },
    methods: {
  
      async submitTambahKK() {
        this.formValues.no_blok= parseInt(this.formValues.nama);
        this.formValues.no_rumah=parseInt(this.formValues.deskripsi);
        await axios.post('http://localhost:3000/user/add/level', this.formValues, {
          headers: {
            'Content-Type':'application/json',
          },
        }).then((response)=>{
          this.hasilTambahKK = response.data;
          console.log(this.hasilTambahKK);
          this.$router.push('/user/daftar/level');
        }).catch(error=>{console.error(error)});
      }
    }
  }
  
  </script>
  