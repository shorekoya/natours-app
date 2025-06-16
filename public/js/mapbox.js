/* eslint-disable */
export const displayMap = (locations) => {
  const map = L.map('map', { zoomControl: false });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const points = [];

  locations.forEach((loc) => {
    const coords = [loc.coordinates[1], loc.coordinates[0]];
    points.push(coords);

    L.marker(coords)
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
};
