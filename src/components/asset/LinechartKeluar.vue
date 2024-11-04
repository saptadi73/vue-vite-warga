<template>
  <div class="container">
    <Line v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import axios from "axios";
import { BASE_URL } from "@/base.url.util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "LinechartKeluar",
  components: { Line },
  data: () => ({
    loaded: false,
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Pengeluaran",
          data: [],
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    },
  }),
  async mounted() {
    this.loaded = false;

    try {
      const url = BASE_URL + "bayar/keluar/bulanan";
      const userlist = await axios.get(url);
      // console.log(userlist.data.data);
      const dataChart = userlist.data.data;
      const bulan = dataChart.map((bulan) => bulan.bulan);
      console.log(bulan);

      this.chartData.labels = bulan;

      const jumlah = dataChart.map((jumlah) => jumlah.jumlah);
      console.log(jumlah);
      this.chartData.datasets[0].data = jumlah;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
