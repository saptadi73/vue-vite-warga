<template>
  <div>
    <button @click="getLocation">Get Location</button>
    {{ lat }},{{ lng }}
    <div ref="mapContainer" style="width: 400px; height: 400px"></div>
    <button @click="createPolygon">Create Polygon</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import L, { Draggable } from "leaflet";
import { event } from "jquery";
import { polygon } from "leaflet";

export default {
  setup() {
    const lat = ref(0);
    const lng = ref(0);
    const map = ref();
    const latlng = ref();
    const mapContainer = ref();
    const polygonku = ref();

    onMounted(() => {
      map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value);
    });

    return {
      lat,
      lng,
      map,
      mapContainer,
      latlng,
      polygonku,
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.setView([this.lat, this.lng], 50);
          L.marker([this.lat, this.lng], { draggable: true })
            .addTo(this.map)
            .on("dragend", (event) => {
              console.log(event);
            });
        });
      }
    },
    createPolygon() {
      // create a red polygon from an array of LatLng points
      this.latlngs = [
        [-6.32358, 107.02060],
        [-6.32366, 107.02094],
        [-6.32389, 107.02088],
        [-6.32381, 107.02054],
      ];

      this.polygonku = L.polygon(this.latlngs, { color: "red" }).addTo(this.map);

      // zoom the map to the polygon
      this.map.fitBounds(this.polygonku.getBounds());
    },
  },
};
</script>

<style lang="scss" scoped></style>
