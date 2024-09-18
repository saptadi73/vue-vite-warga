import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetLayoutView from '@/views/AssetLayoutView.vue'
import AssetTable from '@/components/asset/AssetTable.vue'
import InputAsset from '@/components/asset/InputAsset.vue'
import KeluargaTable from '@/components/asset/KeluargaTable.vue'
import InputWarga from '@/components/asset/InputWarga.vue'
import WargaTable from '@/components/asset/WargaTable.vue'
import WargaKomplitTable from '@/components/asset/WargaKomplitTable.vue'

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
          path: 'list/table/komplit',
          name: 'table_komplit',
          component: WargaKomplitTable,
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
