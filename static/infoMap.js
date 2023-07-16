// infoMap.js: This JavaScript code mainly functions to generate an interactive map using the Leaflet library. It visualizes different car manufacturers around the globe. The map's primary features include customized marker icons based on company rankings, a timeline slider, and an 'exit' button to revert the map to the initial view.
// - Function getIconSize(rank, symbol): This function calculates the size of a marker icon based on a company's rank. Tesla is assigned a fixed size, whereas the size of other companies' markers is adjusted based on their ranking, with the number one is the biggest and number ten is the smallest
// - Function reformatData(data): This function reformats the data for ease of use. It loops through the input data and reformats it into an array of objects, each containing information about a company.
// - Layer Initialization: Two tile layers are created, one for 'street' view and another for 'satellite' view. Layer groups for car manufacturers and rankings are also initialized. Then a map is created with the 'street' view and 'ranking' layers.
// - Loading Data and Timeline Slider: The data is loaded from a JSON file. A timeline control slider is added to the map. When the user changes the timeline, the data is reloaded, and markers representing car manufacturers are created and added to the 'carManufacturers' layer group. These markers have custom icons and a click event that zooms into the marker's location.
// - Layer Control Addition: Layer controls are added to the map, which allow users to toggle between 'street' and 'satellite' views, and between 'ranking' and 'manufacturer info'.
// - Exit Button: An exit button is added to the bottom right of the map. Clicking this button reverts the map view back to its original center and zoom level.


// Calculates the size of the marker icon based on rank , however tesla is set to be biggest
function getIconSize(rank, symbol) {
  if (symbol === "TSLA") {
    return [100, 100]; // Set a fixed size for Tesla
  }

  let size = 30; // Default size for other companies
  let teslaSize = 100; // Size of Tesla

  if (rank > 0 && rank <= 10) {
    // Adjust the size for the top 10 companies
    size = (teslaSize * (11 - rank)) / 10;
  }

  return [size, size];
}

// Converts the data into a more usable format
function reformatData(data) {
  let result = [];
  let length = Object.keys(data.Name).length;

  for (let i = 0; i < length; i++) {
    let company = {
      Rank: data.Rank[i],
      Name: data.Name[i],
      Symbol: data.Symbol[i],
      marketcap: data.marketcap[i],
      "price (USD)": data["price (USD)"][i],
      country: data.country[i],
      Latitude: data.Latitude[i],
      Longitude: data.Longitude[i],
      Logo: data.Logo[i],
      IPO: data.IPO[i],
    };
    result.push(company);
  }
  return result;
}

/* Initialization:  creating two map tile layers (street and Staellite),
 */
let street = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 20,
    attribution:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>' +
      "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101> Github<a/>",
  }
);

let Staellite = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
      "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101/leaflet-challenge> Github<a/>",
  }
);
// layer groups for car manufacturers and rankings, and a base map with toggleable overlays.
let carManufacturers = new L.layerGroup(); // This layer group contains all the car manufacturer icons
let ranking = new L.layerGroup();

// creating a base map object
let baseMaps = {
  "Street Map": street,
  Staellite: Staellite,
};

//creating overlay object
let overlayMaps = {
  Ranking: ranking,
  "Manufacturers info": carManufacturers,
};

//my baseMap, with toggles between info and ranking
let myMap = L.map("map", {
  center: [39, 4],
  zoom: 2,
  layers: [street, ranking],
});

const largestData = "../Resources/infoMapData.json";

//defining the timeline variable and setting the parameters for certain years
function markerSize(magnitude) {
  return magnitude / 2; // Adjust the division factor as needed
}
let timeline = L.control.timelineSlider({
  timelineItems: ["Before", "After"], // chooseing what showing on the timeline bar
  changeMap: function ({ label, value, map }) {
    console.log("Changed time to:", label);
    d3.json(largestData).then(function (data) {
      let companies = reformatData(data);

      if (label === "After") {
        carManufacturers.clearLayers();
        companies.forEach((company) => {
          let customIcon = L.icon({
            iconUrl: company.Logo,
            iconSize: getIconSize(company.marketcap, company.Symbol),
            iconAnchor: [19, 19],
            popupAnchor: [-3, -76],
          });
          // assigning the marker to a variable
          let marker = L.marker([company.Latitude, company.Longitude], {
            icon: customIcon,
          });
          marker
            .bindPopup(
              `<h2>${company.Name}</h2>
<h3>Rank: ${company.Rank}</h3>
<p>
  <span class="large-text">Market Cap: ${company.marketcap}</span><br>
  <span class="large-text">Price (USD): ${company["price (USD)"]}</span><br>
  Country: ${company.country}
</p>`
            )
            .on("click", function (e) {
              myMap.setView(e.latlng, 8);
            })
            .addTo(carManufacturers);
        });
      }
    });
  },
});
// Add timeline control to the map
timeline.addTo(myMap);

let originalZoom = myMap.getZoom();
let originalCenter = myMap.getCenter();
// Add layers control to the map
L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

//creating exit button element
let exitButton = L.control({ position: "bottomright" });

exitButton.onAdd = function (myMap) {
  this._div = L.DomUtil.create("div", "exit-button");
  this._div.innerHTML = "Exit";
  this._div.onmousedown = this._div.onclick = function () {
    myMap.setView(originalCenter, originalZoom);
  };
  return this._div;
};
// Adding the exit button to the map
exitButton.addTo(myMap);

// Event listener for the button
document.querySelector(".exit-button").addEventListener("click", function () {
  myMap.setView(originalCenter, originalZoom);
});
