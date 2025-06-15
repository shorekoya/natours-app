/* eslint-disable */
function displayMap(locations) {
  const map = L.map('map', { zoomControl: false });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crossOrigin: '',
    },
  ).addTo(map);

  const points = [];

  locations.forEach((loc) => {
    const [lng, lat] = loc.coordinates;
    points.push([lat, lng]);
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        `<p>Day ${loc.day}: ${loc.description}</p>`,
        {
          autoClose: false,
        },
      )
      .openPopup();
  });

  const bounds = L.latLngBounds(points).pad(0.5);
  map.fitBounds(bounds);
  map.scrollWheelZoom.disable();
}

// Attach to window so you can access it globally
window.displayMap = displayMap;
