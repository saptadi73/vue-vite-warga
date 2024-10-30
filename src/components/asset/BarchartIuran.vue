<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />

</template>

<script>
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
import axios from "axios";
import { BASE_URL } from "@/base.url.util";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChartIuran",
  components: { Bar },
  data() {
    return {
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
    };
  },
  methods: {
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
    this.iuranBulanan();
  }
};
</script>
