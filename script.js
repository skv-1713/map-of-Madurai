// Initialize map
const map = L.map('map').setView([20.5937, 78.9629], 5); // India center

// Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Example locations
const locations = {
  "Chennai": [13.0827, 80.2707],
  "Bangalore": [12.9716, 77.5946],
  "Hyderabad": [17.3850, 78.4867],
  "Mumbai": [19.0760, 72.8777],
  "Delhi": [28.6139, 77.2090]
};

// Recommended routes
const recommendedRoutes = [
  { start: "Chennai", end: "Bangalore" },
  { start: "Hyderabad", end: "Mumbai" },
  { start: "Delhi", end: "Mumbai" }
];

// Dropdowns
const startSelect = document.getElementById("start");
const endSelect = document.getElementById("end");

// Populate dropdowns
for (let loc in locations) {
  let opt1 = document.createElement("option");
  opt1.value = loc;
  opt1.textContent = loc;
  startSelect.appendChild(opt1);

  let opt2 = document.createElement("option");
  opt2.value = loc;
  opt2.textContent = loc;
  endSelect.appendChild(opt2);
}

// Function to draw a route
function drawRoute(start, end) {
  const startCoords = locations[start];
  const endCoords = locations[end];

  if (!startCoords || !endCoords) return;

  // Clear old routes
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add markers
  L.marker(startCoords).addTo(map).bindPopup("Start: " + start).openPopup();
  L.marker(endCoords).addTo(map).bindPopup("Destination: " + end);

  // Draw line
  L.polyline([startCoords, endCoords], {color: 'red'}).addTo(map);

  // Zoom to fit
  map.fitBounds([startCoords, endCoords]);

  // Info text
  document.getElementById("search-route-info").textContent =
    `Route from ${start} → ${end}`;
}

// Handle form submit
document.getElementById("search-form").addEventListener("submit", function(e) {
  e.preventDefault();
  drawRoute(startSelect.value, endSelect.value);
});

// Populate recommended routes
const recList = document.getElementById("recommended-list");
recommendedRoutes.forEach((route) => {
  let div = document.createElement("div");
  div.className = "route-box";
  div.textContent = `${route.start} → ${route.end}`;
  div.addEventListener("click", () => drawRoute(route.start, route.end));
  recList.appendChild(div);
});
