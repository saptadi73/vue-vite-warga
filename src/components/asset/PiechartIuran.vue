<template>
  <div class="container">
    <Doughnut v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { BASE_URL } from "@/base.url.util";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "PiecharttIuran",
  components: { Doughnut },
  data: () => ({
    loaded: false,
    chartData: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(23, 159, 64, 0.2)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  }),
  async mounted() {
    this.loaded = false;

    try {
      const url = BASE_URL + "warga/jumlah/kk/all";
      const jumlah_kk = await axios.get(url);
      const jml_kk = jumlah_kk.data.result._count.id;
      console.log(jml_kk);

      const url2 = BASE_URL + "bayar/jumlah/warga/iuran";
      const jumlah_warga_iuran = await axios.get(url2);
      const jml_iuran_final = jumlah_warga_iuran.data.data._count.id_kk;
      console.log(jml_iuran_final);

      this.chartData.datasets[0].data[0] = jml_kk - jml_iuran_final;
      this.chartData.datasets[0].data[1] = jml_iuran_final;
      this.chartData.labels = ["belum iuran", "bayar iuran"];

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
