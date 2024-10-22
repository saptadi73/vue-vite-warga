<template>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <p>Laporan Iuran Warga</p>
  
            <div>
              <form v-on:submit.prevent>
                <div>
                  Tanggal Awal
                  <flat-pickr
                    :config="config"
                    class="form-control"
                    id="tanggal_awal"
                    v-model="formValues.tanggal_awal"
                  ></flat-pickr>
                </div>
                <div>
                  Tanggal Akhir
                  <flat-pickr
                    :config="config"
                    class="form-control"
                    v-model="formValues.tanggal_akhir"
                    id="tanggal_akhir"
                  ></flat-pickr>
                </div>
                <div class="form-group">
                    <label for="id_jenis_anggaran">Jenis Pembiayaan/Pemasukan</label>
                    <div v-if="listType">
                      <select
                        class="custom-select form-control-border"
                        id="id_jenis_anggaran"
                        v-model="formValues.id_jenis_anggaran"
                      >
                        <option
                          v-for="resultmu in listType.result"
                          :key="resultmu.id"
                          :value="`${resultmu.id}`"
                        >
                          {{ resultmu.nama }}
                        </option>
                      </select>
                    </div>
                  </div>
  
                  <div class="form-group">
                    <label for="type_anggaran">Type Arus Anggaran</label>
                    <select
                      class="custom-select form-control-border"
                      id="type_anggaran"
                      v-model="formValues.type_anggaran"
                    >
                      <option value="1">Pemasukan</option>
                      <option value="0">Pengeluaran</option>
                    </select>
                  </div>
                <div>
                  &nbsp;<br />
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="laporanAnggaran"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- /.card-header -->
  
          <div class="card-body">
            <table id="tableoke" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Blok</th>
                  <th>No.</th>
                  <th>Jenis</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody v-if="hasilAnggaran">
                <tr v-for="(resultku, index) in hasilAnggaran" :key="resultku.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ resultku.warga.nama }}</td>
                  <td>C {{ resultku.warga.kk.no_blok }}</td>
                  <td>{{ resultku.warga.kk.no_rumah }}</td>
                  <td>{{ resultku.jenis_anggaran.nama }}</td>
                  <td>{{ formatRupiah(resultku.nilai) }}</td>
                  <td>{{ formatTanggal(resultku.tanggal) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Blok</th>
                  <th>No.</th>
                  <th>Jenis</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
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
  import { RouterLink } from "vue-router";
  import flatPickr from "vue-flatpickr-component";
  
  export default {
    components: {
      flatPickr,
    },
    data() {
      return {
        hasilAnggaran: {},
        hasiltest: {},
        formValues: {},
        listType: {},
        config: {
          enableTime: false, // Hanya date picker
          dateFormat: "Y-m-d", // Format tanggal
        },
        tanggal_akhir: null,
        tanggal_awal: null,
      };
    },
  
    methods: {
  
      async listJenisAnggaran() {
      const url = BASE_URL + "bayar/list/jenis/anggaran";
      await axios
        .get(url)
        .then((response) => {
          this.listType = response.data;
          console.log(this.listType);
        })
        .catch((error) => console.error(error));
    },
      
      formatTanggal(dateString) {
        const tanggal = new Date(dateString);
        const localeDate = tanggal.toLocaleDateString("en-GB");
  
        return localeDate;
      },
  
      async laporanAnggaran() {
        this.formValues.id_jenis_anggaran = parseInt(
          this.formValues.id_jenis_anggaran
        );
        this.formValues.tanggal_awal =
          this.formValues.tanggal_awal + " 00:00:00";
        this.formValues.tanggal_akhir =
          this.formValues.tanggal_akhir + " 23:59:59";
          const url = BASE_URL + "bayar/list/anggaran";
  
          console.log(this.formValues);
  
          await axios
          .post(url, this.formValues, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.hasilAnggaran = response.data.result;
            console.log(this.hasilAnggaran);
            // console.log(this.hasilAnggaran[0].warga.nama);
            // console.log(this.hasilAnggaran[0].warga.kk.no_blok);
            // console.log(this.hasilAnggaran[0].warga.kk.no_rumah);
            // console.log(this.hasilAnggaran[0].nilai);
            // console.log(this.hasilAnggaran[0].tanggal);
            // console.log(this.hasilAnggaran[0].jenis_anggaran.nama);
          })
          .catch((error) => {
            console.error(error);
          });
      },
  
      formatRupiah(number) {
        const amount = number;
  
        // Format as Indonesian Rupiah (IDR)
        const formattedIDR = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0, // Rupiah usually doesn't show decimals
          maximumFractionDigits: 0,
        }).format(amount);
  
        return formattedIDR;
      },
    },
    created() {
      this.listJenisAnggaran();
    },
  };
  </script>
  