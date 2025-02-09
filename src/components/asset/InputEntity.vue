<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Input Data Profile</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="provinsi">Provinsi</label>
                <div v-if="hasilProvinsi">
                  <select
                    class="custom-select form-control-border"
                    id="provinsi"
                    :onchange="getKabupaten"
                  >
                    <option value="0">Pilih Provinsi</option>
                    <option
                      v-for="resultmu in hasilProvinsi.result"
                      :key="resultmu.kode"
                      :value="`${resultmu.kode}`"
                    >
                      {{ resultmu.wilayah }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group" v-if="hasilKabupaten">
                <label for="kabupaten">Kabupaten/Kota</label>
                <div>
                  <select
                    class="custom-select form-control-border"
                    id="kabupaten"
                    :onchange="getKecamatan"
                  >
                    <option value="0">Pilih Kabupaten/Kota</option>
                    <option
                      v-for="resultmu in hasilKabupaten.result"
                      :key="resultmu.kode"
                      :value="`${resultmu.kode}`"
                    >
                      {{ resultmu.wilayah }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group" v-if="hasilKecamatan">
                <label for="kecamatan">Kecamatan</label>
                <div>
                  <select
                    class="custom-select form-control-border"
                    id="kecamatan"
                    :onchange="getDesa"
                  >
                    <option value="0">Pilih Kecamatan</option>
                    <option
                      v-for="resultmu in hasilKecamatan.result"
                      :key="resultmu.kode"
                      :value="`${resultmu.kode}`"
                    >
                      {{ resultmu.wilayah }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group" v-if="hasilDesa">
                <label for="desa">Desa/Kelurahan</label>
                <div>
                  <select class="custom-select form-control-border" id="desa" :onchange="getPilihan">
                    <option value="0">Pilih Desa/Kelurahan</option>
                    <option
                      v-for="resultmu in hasilDesa.result"
                      :key="resultmu.kode"
                      :value="`${resultmu.kode}`"
                    >
                      {{ resultmu.wilayah }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group" v-if="kode_desa">
                <label for="dusun">Dusun/Perumahan</label>
                <input
                  type="text"
                  class="form-control"
                  id="dusun"
                  placeholder="nama dusun"
                  v-model="formValues.dusun"
                />
              </div>
              <div class="form-group" v-if="kode_desa">
                <label for="rw">RW</label>
                <input
                  type="number"
                  class="form-control"
                  id="rw"
                  placeholder="RW tulis angka"
                  v-model="formValues.rw"
                />
              </div>
              <div class="form-group" v-if="kode_desa">
                <label for="rt">RT</label>
                <input
                  type="number"
                  class="form-control"
                  id="rt"
                  placeholder="RT tulis angka"
                  v-model="formValues.rt"
                />
              </div>
            </div>
            <div class="card-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click="submitCreateProfile"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../base.url.util";

export default {
  data() {
    return {
      hasilProvinsi: "",
      hasilKabupaten: "",
      kode_provinsi: "",
      hasilKecamatan: "",
      hasilDesa: "",
      kode_kabupaten: "",
      kode_kecamatan: "",
      kode_desa: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      desa: "",
      kode: "",
      formValues: {},
      submitProfile: '',
    };
  },
  methods: {
    async getProvinsi() {
      const url = BASE_URL + "profile/provinsi";
      await axios
        .get(url)
        .then((response) => {
          this.hasilProvinsi = response.data;
        //   console.log(this.hasilProvinsi);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getKabupaten() {
      const url = BASE_URL + "profile/kabupaten";
      this.kode_provinsi = document.getElementById("provinsi").value;

      this.formValues.kode = this.kode_provinsi;
    //   console.log(this.formValues);
      await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilKabupaten = response.data;
        //   console.log(this.hasilKabupaten);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getKecamatan() {
      const url = BASE_URL + "profile/kecamatan";
      this.kode_kabupaten = document.getElementById("kabupaten").value;

      this.formValues.kode = this.kode_kabupaten;
    //   console.log(this.formValues);
      await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilKecamatan = response.data;
        //   console.log(this.hasilKecamatan);
        })
        .catch((error) => {
          console.log(error)
        });
    },

    async getDesa() {
      const url = BASE_URL + "profile/desa";
      this.kode_kecamatan = document.getElementById("kecamatan").value;

      this.formValues.kode = this.kode_kecamatan;
    //   console.log(this.formValues);
      await axios
        .post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.hasilDesa = response.data;
        //   console.log(this.hasilDesa);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPilihan() {
      // Get the <select> element
      const selectElementProvinsi = document.getElementById("provinsi");

      // Get the selected option
      const selectedOptionProvinsi = selectElementProvinsi.options[selectElementProvinsi.selectedIndex];

      // Get the text content of the selected option
      this.provinsi = selectedOptionProvinsi.text;
      this.kode_provinsi = selectedOptionProvinsi.value;

      const selectElementKabupaten = document.getElementById("kabupaten");
      const selectedOptionKabupaten = selectElementKabupaten.options[selectElementKabupaten.selectedIndex];
      this.kabupaten = selectedOptionKabupaten.text;
      this.kode_kabupaten = selectedOptionKabupaten.value;

      const selectElementKecamatan = document.getElementById("kecamatan");
      const selectedOptionKecamatan = selectElementKecamatan.options[selectElementKecamatan.selectedIndex];
      this.kecamatan = selectedOptionKecamatan.text;
      this.kode_kecamatan = selectedOptionKecamatan.value;

      const selectElementDesa = document.getElementById("desa");
      const selectedOptiondesa = selectElementDesa.options[selectElementDesa.selectedIndex];
      this.desa = selectedOptiondesa.text;
      this.kode_desa = selectedOptiondesa.value;


    },

    async submitCreateProfile() {
      this.formValues.dusun = document.getElementById("dusun").value;
      this.formValues.desa = this.desa ;
      this.formValues.kecamatan = this.kecamatan;
      this.formValues.kabupaten = this.kabupaten;
      this.formValues.provinsi = this.provinsi;
      this.formValues.rt = parseInt(document.getElementById("rt").value);
      this.formValues.rw = parseInt(document.getElementById("rw").value);
      this.formValues.kode_wilayah = this.kode_desa;
      const url = BASE_URL + "profile/create";

      await axios.post(url, this.formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.submitProfile = response.data;
          this.$router.push({ name: "profile" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.getProvinsi();
  },
};
</script>

<style lang="scss" scoped></style>
