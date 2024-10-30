<template>
    <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{hasilWargaKk}}</h3>

              <p>Jumlah KK</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <router-link to="/asset/daftar/kk/all" class="small-box-footer">More Info<i class="fas fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{hasilWargaAll}}</h3>

              <p>Jumlah Warga</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <router-link to="/asset/daftar/warga/all" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{hasilWargaLk}}</h3>

              <p>Pria</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <router-link to="/asset/daftar/warga/lk" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{{hasilWargaPr}}</h3>

              <p>Wanita</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <router-link to="/asset/daftar/warga/pr" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{formatRupiah(hasilIuran)}}</h3>

              <p>Jumlah Iuran</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{formatRupiah(hasilPemasukan)}}</h3>

              <p>Pemasukan</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{formatRupiah(hasilPengeluaran)}}</h3>

              <p>Pengeluaran</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{{formatRupiah(this.hasilIuran + this.hasilPemasukan - this.hasilPengeluaran)}}</h3>

              <p>Saldo</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <div class="row">
        <div class="col-md-6">
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
      </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "@/base.url.util";
import { RouterLink } from "vue-router";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default{
  components: {Bar},
  data() {
    return {
      hasilWargaAll: null,
      hasilWargaKk: null,
      hasilWargaPr: null,
      hasilWargaLk: null,
      hasilIuran: null,
      hasilPemasukan: null,
      hasilPengeluaran: null,
      saldo: null,
      hasilIuranBulanan: {},
      listBulan: [],
      listIuran: [],
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
  methods: {

    async getWargaKk() {
      const url = BASE_URL + "warga/jumlah/kk/all";
      await axios.get(url)
      .then((response)=>{
        this.hasilWargaKk = response.data.result._count.id;
        console.log(this.hasilWargaKk);
      })

    },

    async getWargaAll() {
      const url = BASE_URL + "warga/jumlah/warga/all";
      await axios.get(url)
      .then((response)=>{
        this.hasilWargaAll = response.data.result._count.id;
        console.log(this.hasilWargaAll);
      })

    },

    async getWargaLk() {
      const url = BASE_URL + "warga/jumlah/warga/lk";
      await axios.get(url)
      .then((response)=>{
        this.hasilWargaLk = response.data.result._count.id;
        console.log(this.hasilWargaLk);
      })

    },

    async getWargaPr() {
      const url = BASE_URL + "warga/jumlah/warga/pr";
      await axios.get(url)
      .then((response)=>{
        this.hasilWargaPr = response.data.result._count.id;
        console.log(this.hasilWargaPr);
      })

    },

    async getiuran() {
      const url = BASE_URL + "bayar/jumlah/iuran";
      await axios.get(url)
      .then((response)=>{
        this.hasilIuran = response.data.data._sum.nilai;
        console.log(this.hasilIuran);
      })

    },

    async getMasuk() {
      const url = BASE_URL + "bayar/jumlah/anggaran/masuk";
      await axios.get(url)
      .then((response)=>{
        this.hasilPemasukan = response.data.data._sum.nilai;
        console.log(this.hasilPemasukan);
      })

    },

    async getKeluar() {
      const url = BASE_URL + "bayar/jumlah/anggaran/keluar";
      await axios.get(url)
      .then((response)=>{
        this.hasilPengeluaran = response.data.data._sum.nilai;
        console.log(this.hasilPengeluaran);
      })

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

    async iuranBulanan() {
      const url = BASE_URL + "bayar/iuran/bulanan";
      await axios.get(url).then((response) => {
        this.hasilIuranBulanan = response.data.data;
        console.log(this.hasilIuranBulanan);

        const myBulan = this.hasilIuranBulanan.map((bulan)=>bulan.bulan);
        const ValueSBulan = Object.values(myBulan);
        const myJumlah = this.hasilIuranBulanan.map((iuran)=>iuran.jumlah);
        const ValueSJumlah = Object.values(myJumlah);
        this.listBulan = ValueSBulan;
        console.log(ValueSBulan);
        
        console.log(ValueSJumlah);
        
        this.chartData.labels = ValueSBulan;
        this.chartData.datasets[0].data = ValueSJumlah;
      });
    },

  },
  created() {
    this.getWargaAll();
    this.getWargaKk();
    this.getWargaLk();
    this.getWargaPr();
    this.getiuran();
    this.getMasuk();
    this.getKeluar();
  }
}
</script>