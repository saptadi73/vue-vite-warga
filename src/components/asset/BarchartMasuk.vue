<template>
    <div class="container">
      <Bar v-if="loaded" :data="chartData" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import axios from 'axios';
  import { BASE_URL } from '@/base.url.util';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarchartMasuk',
    components: { Bar },
    data: () => ({
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
         {
          label: ['Pemasukan'],
          data: [],
          backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(241, 213, 222, 0.2)',
        'rgba(70, 200, 155, 0.2)',
        'rgba(213, 155, 75, 0.2)',
        'rgba(201, 188, 240, 0.2)',
        'rgba(155, 60, 115, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(76, 109, 78)',
        'rgb(35, 233, 115)',
        'rgb(251, 55, 70)',
        'rgb(21, 170, 227)',
        'rgb(253, 66, 80)',
      ],
      borderWidth: 1,
         }
        ],
      },
    }),
    async mounted () {
      this.loaded = false
  
      try {
        const url = BASE_URL + "bayar/masuk/bulanan";
        const userlist = await axios.get(url);
        // console.log(userlist.data.data);
        const dataChart = userlist.data.data;
        const bulan = dataChart.map((bulan)=>bulan.bulan);
        console.log(bulan);
  
        this.chartData.labels = bulan;
  
        const jumlah = dataChart.map((jumlah)=>jumlah.jumlah)
        console.log(jumlah);
        this.chartData.datasets[0].data = jumlah;
        this.loaded = true;
        
      } catch (e) {
        console.error(e)
      }
    }
  }
  </script>