const crazyCookMonument = [31.49701005427551, -108.20874221059238];

const map = L.map("map").setView(crazyCookMonument, 5);

L.marker(crazyCookMonument)
  .addTo(map)
  .bindPopup("Crazy Cook Monument Trailhead<br />Meagan started here!");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 4,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
