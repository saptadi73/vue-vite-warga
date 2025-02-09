import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AssetLayoutView from "@/views/AssetLayoutView.vue";
import AssetTable from "@/components/asset/AssetTable.vue";
import InputSetoran from "@/components/asset/InputSetoran.vue";
import InputAnggaran from "@/components/asset/InputAnggaran.vue";
import UpdateSetoran from "@/components/asset/UpdateSetoran.vue";
import UpdateAnggaran from "@/components/asset/UpdateAnggaran.vue";
import LaporanIuranWarga from "@/components/asset/LaporanIuranWarga.vue";
import LaporanAnggaranRt from "@/components/asset/LaporanAnggaranRt.vue";
import LaporanBelumBayarIuran from "@/components/asset/LaporanBelumBayarIuran.vue";
import TopChartMenu from "@/components/asset/TopChartMenu.vue";
import BarChart from "../components/BarChart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/warga",
      name: "warga",
      component: () => import("@/views/WargaLayoutView.vue"),
      children: [
        {
          path: "daftar/kk",
          name: "daftar_kk",
          component: () => import("@/components/warga/KeluargaTable.vue"),
        },
        {
          path: "new/warga/:id",
          name: "new_warga",
          component: () => import("@/components/warga/InputWarga.vue"),
        },
        {
          path: "list/warga/:id",
          name: "list_warga_kk",
          component: () => import("@/components/warga/WargaTable.vue"),
        },
        {
          path: "setor/warga/:id",
          name: "setor_warga",
          component: InputSetoran,
        },
        {
          path: "form/update/kk/:id",
          name: "form_update_kk",
          component: () => import("@/components/warga/UpdateKeluarga.vue"),
        },
        {
          path: "form/update/warga/:id",
          name: "form_update_warga",
          component: () => import("@/components/warga/UpdateWarga.vue"),
        },
        {
          path: "form/update/setoran/:id",
          name: "form_update_setoran",
          component: UpdateSetoran,
        },
        {
          path: "form/update/anggaran/:id",
          name: "form_update_anggaran",
          component: () => import("@/components/asset/UpdateInputAnggaran.vue"),
        },
        {
          path: "all/warga",
          name: "all_warga",
          component: () => import("@/components/warga/WargaKomplitTable.vue"),
        },
        {
          path: "top/chart",
          name: "top_chart",
          component: TopChartMenu,
        },
        {
          path: "daftar/kk/all",
          name: "daftar_kk_all",
          component: () => import("@/components/warga/JumlahKkAll.vue"),
        },
        {
          path: "daftar/warga/all",
          name: "daftar_warga_all",
          component: () => import("@/components/warga/DaftarWargaAll.vue"),
        },
        {
          path: "daftar/warga/lk",
          name: "daftar_warga_lk",
          component: () => import("@/components/warga/DaftarWargaLk.vue"),
        },
        {
          path: "daftar/warga/pr",
          name: "daftar_warga_pr",
          component: () => import("@/components/warga/DaftarWargaPr.vue"),
        },
        {
          path: "barchart",
          name: "barchart",
          component: BarChart,
        },
        {
          path: "upload/filekk/:id",
          name: "upload_kk",
          component: () => import("../components/warga/InputFileKeluarga.vue"),
        },
        {
          path: "upload/filektp/:id",
          name: "upload_kk",
          component: () => import("../components/warga/InputFileWarga.vue"),
        },
        {
          path: "viewktp/:id",
          name: "viewktp",
          component: () => import("../components/warga/ViewKtp.vue"),
        },
        {
          path: "new/kk",
          name: "new_kk",
          component: () => import("@/components/warga/InputAsset.vue"),
        },
        {
          path: "new/blok",
          name: "new_blok",
          component: () => import("@/components/warga/InputBlok.vue"),
        },
        {
          path: "update/blok/:id",
          name: "update_blok",
          component: () => import("@/components/warga/UpdateBlok.vue"),
        },
        {
          path: "daftar/blok",
          name: "daftar_blok",
          component: () => import("@/components/warga/DaftarBlok.vue"),
        },
        {
          path: "add/type",
          name: "add_type",
          component: () => import("@/components/warga/InputTypeKeluarga.vue"),
        },
        {
          path: "update/type/:id",
          name: "update_type",
          component: () => import("@/components/warga/UpdateTypeKeluarga.vue"),
        },
        {
          path: "daftar/type",
          name: "daftar_type",
          component: () => import("@/components/warga/DaftarTypeKeluarga.vue"),
        },
        {
          path: "test/map",
          name: "test_map",
          component: () => import("@/components/GetMapLocation.vue"),
        }
      ],
    },
    {
      path: "/asset",
      name: "asset",
      component: AssetLayoutView,
      children: [
        {
          path: "daftar",
          name: "daftar_asset",
          component: AssetTable,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/laporan",
      name: "laporan",
      component: () => import("../views/LaporanIuranView.vue"),
      children: [
        {
          path: "cari/iuran",
          name: "cari_iuran",
          component: LaporanIuranWarga,
        },
        {
          path: "belum/iuran",
          name: "laporan_belum_iuran",
          component: LaporanBelumBayarIuran,
        },
      ]
    },
    {
      path: "/anggaran",
      name: "anggaran",
      component: () => import("../views/AnggaranLayoutView.vue"),
      children:[
        {
          path: "cari",
          name: "cari_anggaran",
          component: LaporanAnggaranRt,
        },
        {
          path: "input",
          name: "input_anggaran",
          component: InputAnggaran,
        },
      ]
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserLayoutView.vue"),
      children:[
        {
          path: "add/level/user",
          name: "add_level_user",
          component: () =>("../components/user/InputLevelUser.vue"),
        },
        {
          path: "daftar/level",
          name: "user_daftar_level",
          component: () => import("../components/user/DaftarLevelUser.vue"),
        }
      ],
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileLayoutView.vue"),
      children:[
        {
          path: "input",
          name: "input_profile",
          component: () => import("../components/asset/InputEntity.vue"),
        },
      ]
    },
  ],
});

export default router;
