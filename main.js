(() => {
  const map = L.map("map");
  const url =
    "https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/1Ey1qWMA7MQIG4mWlxPR2ePSkLrEl4xqq/latest.json?feedPassword=";
  const feedPassword = prompt("No murderers allowed. What's the password?");

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 3,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  async function updateLocation() {
    const resp = await fetch(url + feedPassword, {
      mode: "cors",
      cache: "no-cache",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return resp.json();
  }

  updateLocation().then((json) => {
    const payload = json.response;
    if (payload.hasOwnProperty("errors")) {
      const centerishCDT = [40.921741012763725, -108.03588951589632];
      map.setView(centerishCDT, 4);
      L.circle(centerishCDT, {
        color: "#3388ff",
        fillOpacity: 0.2,
        radius: 2254691 / 2,
      })
        .addTo(map)
        .bindPopup("Meagan is hiking approximately in this area.")
        .openPopup();
    } else {
      const lastMsg = payload.feedMessageResponse.messages.message;
      const lastLocation = [lastMsg.latitude, lastMsg.longitude];
      const lastLocationTime =
        new Date(lastMsg.dateTime)
          .toLocaleString("en-US", { timeZone: "America/Denver" })
          .replace(",", " at") + " her time";
      const crazyCookMonument = [31.49701005427551, -108.20874221059238];

      L.marker(crazyCookMonument)
        .addTo(map)
        .bindPopup("Crazy Cook Monument Trailhead<br />Meagan started here!");

      L.marker(lastLocation)
        .addTo(map)
        .bindPopup(`Meagan was here<br /> on ${lastLocationTime}!`);
      map.setView(lastLocation, 7);
    }
  });
})();
