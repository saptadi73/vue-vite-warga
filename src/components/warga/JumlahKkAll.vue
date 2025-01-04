<template>
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Daftar Rumah Warga RT01/14</h1>
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
                        
                        <th>Kepala Keluarga</th>
                        
                      </tr>
                    </thead>
                    <tbody v-if="dataKeluarga">
                      <tr v-for="(resultku,index) in dataKeluarga.result":key="resultku.id">
                        <td>{{index+1}}</td>
                        <td>C{{resultku.no_blok}}</td>
                        <td>{{resultku.no_rumah}}</td>
                       
                        <td>{{resultku.warga[0].nama}}</td>
                        
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
            },
            tambahKK() {
              this.$router.push('/asset/new/asset');
            }
        },
        created(){
            this.listKK();
        }
    }
</script>