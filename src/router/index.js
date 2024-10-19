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
import LaporanSetoran from '@/components/asset/LaporanSetoran.vue'
import CariSetoranTanggal from '@/components/asset/CariSetoranTanggal.vue'

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
          path: 'laporan/setoran',
          name: 'laporan_setoran',
          component: LaporanSetoran,
        },
        {
          path: 'cari/setoran',
          name: 'cari_setoran',
          component: CariSetoranTanggal,
        },
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
