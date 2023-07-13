// setting the street layer
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

let carManufacturers = new L.layerGroup(); // This layer group contains all the car manufacturer icons

// creating a base map object
let baseMaps = {
  "Street Map": street,
  Staellite: Staellite,
};

let ranking = new L.layerGroup();

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
function getIconSize(rank, symbol) {
  if (symbol === "TSLA") {
    return [100, 100]; // Set a fixed size for Tesla
  }

  let size = 30; // Default size for other companies
  let teslaSize = 100; // Size of Tesla

  if (rank > 0 && rank <= 10) {
    // Adjust the size for the top 10 companies
    size = teslaSize * (11 - rank) / 10;
  }

  return [size, size];
}

const largestData = "../Resources/infoMapData.json";

//defininf the timeline variable and setting the parameters for certain years
function markerSize(magnitude) {
  return magnitude / 2; // Adjust the division factor as needed
}
let timeline = L.control.timelineSlider({
  timelineItems: ["2010", "2012"],
  changeMap: function ({ label, value, map }) {
    console.log("Changed time to:", label);
    d3.json(largestData).then(function (data){
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
})


timeline.addTo(myMap);

let originalZoom = myMap.getZoom();
let originalCenter = myMap.getCenter();

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

//creating a button element
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


// converting the json file to a difrrent format
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

