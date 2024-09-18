<template>
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Daftar Warga RT01/14</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Asset</li>
              </ol>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </section>
  
      <section class="content">
        <div class="container-fluid">
          <div class="row">
  
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Table Daftar KK</h3>
  
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                      <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
  
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Blok</th>
                        <th>No. Rumah</th>
                        <th>No.KK</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody v-if="dataKeluarga">
                      <tr v-for="(resultku,index) in dataKeluarga.result":key="resultku.id">
                        <td>{{index+1}}</td>
                        <td>C{{resultku.no_blok}}</td>
                        <td>{{resultku.no_rumah}}</td>
                        <td>{{resultku.no_kk}}</td>
                        <td><router-link :to="`/asset/new/warga/${resultku.id}`"><i class="fa fa-user" aria-hidden="true"></i></router-link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
          </div>
          <!-- /.row -->
  
        </div>
      </section>
</template>
<script>
import axios from 'axios';
import { BASE_URL } from '../../base.url.util';


    export default {
        data(){
            return{
                dataKeluarga: {},
                nomor: 0,
            }
        },
        methods: {
            async listKK() {
                const url = BASE_URL + 'warga/list/kk';
                await axios.get(url)
                .then((response)=>{
                    this.dataKeluarga = response.data;
                    console.log(this.dataKeluarga);
                })
            }
        },
        created(){
            this.listKK();
        }
    }
</script>