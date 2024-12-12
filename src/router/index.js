import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetLayoutView from '@/views/AssetLayoutView.vue'
import AssetTable from '@/components/asset/AssetTable.vue'
import InputAsset from '@/components/asset/InputAsset.vue'
import KeluargaTable from '@/components/asset/KeluargaTable.vue'
import InputWarga from '@/components/asset/InputWarga.vue'
import WargaTable from '@/components/asset/WargaTable.vue'
import InputSetoran from '@/components/asset/InputSetoran.vue'
import InputAnggaran from '@/components/asset/InputAnggaran.vue'
import UpdateKeluarga from '@/components/asset/UpdateKeluarga.vue'
import UpdateWarga from '@/components/asset/UpdateWarga.vue'
import UpdateSetoran from '@/components/asset/UpdateSetoran.vue'
import UpdateAnggaran from '@/components/asset/UpdateAnggaran.vue'
import WargaKomplitTable from '@/components/asset/WargaKomplitTable.vue'
import LaporanIuranWarga from '@/components/asset/LaporanIuranWarga.vue'
import LaporanAnggaranRt from '@/components/asset/LaporanAnggaranRt.vue'
import LaporanBelumBayarIuran from '@/components/asset/LaporanBelumBayarIuran.vue'
import TopChartMenu from '@/components/asset/TopChartMenu.vue'
import JumlahKkAll from '@/components/asset/JumlahKkAll.vue'
import DaftarWargaAll from '@/components/asset/DaftarWargaAll.vue'
import DaftarWargaLk from '@/components/asset/DaftarWargaLk.vue'
import DaftarWargaPr from '@/components/asset/DaftarWargaPr.vue'
import BarChart from '../components/BarChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssetLayoutView,
      children: [
        {
          path: 'daftar',
          name: 'daftar_asset',
          component: AssetTable,
        },
        {
          path:'new/asset',
          name: 'new_asset',
          component: InputAsset,
        },
        {
          path: 'daftar/kk',
          name: 'daftar_kk',
          component: KeluargaTable,
        },
        {
          path: 'new/warga/:id',
          name: 'new_warga',
          component: InputWarga,
        },
        {
          path: 'list/warga/:id',
          name: 'list_warga_kk',
          component: WargaTable,
        },
        {
          path: 'setor/warga/:id',
          name: 'setor_warga',
          component: InputSetoran,
        },
        {
          path: 'input/anggaran',
          name: 'input_anggaran',
          component: InputAnggaran,
        },
        {
          path: 'form/update/kk/:id',
          name: 'form_update_kk',
          component: UpdateKeluarga,
        },
        {
          path: 'form/update/warga/:id',
          name: 'form_update_warga',
          component: UpdateWarga,
        },
        {
          path: 'form/update/setoran/:id',
          name: 'form_update_setoran',
          component: UpdateSetoran,
        },
        {
          path: 'form/update/anggaran/:id',
          name: 'form_update_anggaran',
          component: UpdateAnggaran,
        },
        {
          path: 'all/warga',
          name: 'all_warga',
          component: WargaKomplitTable,
        },
        {
          path: 'cari/iuran',
          name: 'cari_iuran',
          component: LaporanIuranWarga,
        },
        {
          path: 'cari/anggaran',
          name: 'cari_anggaran',
          component: LaporanAnggaranRt,
        },
        {
          path: 'laporan/belum/iuran',
          name: 'laporan_belum_iuran',
          component: LaporanBelumBayarIuran,
        },
        {
          path: 'top/chart',
          name: 'top_chart',
          component: TopChartMenu,
        },
        {
          path: 'daftar/kk/all',
          name: 'daftar_kk_all',
          component: JumlahKkAll,
        },
        {
          path: 'daftar/warga/all',
          name: 'daftar_warga_all',
          component: DaftarWargaAll,
        },
        {
          path: 'daftar/warga/lk',
          name: 'daftar_warga_lk',
          component: DaftarWargaLk,
        },
        {
          path: 'daftar/warga/pr',
          name: 'daftar_warga_pr',
          component: DaftarWargaPr,
        },
        {
          path: 'barchart',
          name: 'barchart',
          component: BarChart
        },
        {
          path: 'upload/filekk/:id',
          name: 'upload_kk',
          component: () => import('../components/asset/InputFileKeluarga.vue')
        },
        {
          path: 'upload/filektp/:id',
          name: 'upload_kk',
          component: () => import('../components/asset/InputFileWarga.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
