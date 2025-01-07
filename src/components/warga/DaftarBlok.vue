<template>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">DataTable with default features</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <table id="tableoke" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Blok</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody v-if="hasilAllWarga">
                <tr
                v-for="(resultku, index) in hasilAllWarga.result"
                      :key="resultku.id"
                >
                  <td>{{index+1}}</td>
                  <td>{{resultku.blok}}</td>
                  <td><router-link :to="`/warga/update/blok/${resultku.id}`">Edit</router-link></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Blok</th>
                  <th>Keterangan</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import { BASE_URL } from "@/base.url.util";
  import { RouterLink } from 'vue-router';
  
  export default {
    data() {
      return {
        hasilAllWarga: {},
      };
    },
  
    methods: {
      async getAllWarga() {
        // const id_kk = this.$route.params.id;
        const url = BASE_URL + "warga/daftar/blok";
        axios.get(url).then((response) => {
          this.hasilAllWarga = response.data;
          console.log(this.hasilAllWarga);
        });
      },
    },
    created() {
      this.getAllWarga();
    },
  };
  </script>
  