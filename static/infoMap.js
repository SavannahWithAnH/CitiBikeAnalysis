
//create base layer to the map
// adding variables to the layer

let street = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 20,
    attribution:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>' +
      "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101> Github<a/>",
  }
);

let Staellite = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
    "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101/leaflet-challenge> Github<a/>",
});

let carManufacturers = new L.layerGroup(); // This layer group contains all the car manufacturer icons


// creating a base map object
let baseMaps = {
  "Street Map": street,
  "Staellite": Staellite,
};

let ranking = new L.layerGroup();

//creating overlay object
let overlayMaps = {
  Ranking: ranking,
  "Manufacturers info": carManufacturers,
};

let myMap = L.map("map", {
  center: [39, 4],
  zoom: 2,
  layers: [street, ranking],
});

let originalZoom = myMap.getZoom();
let originalCenter = myMap.getCenter();

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);


//creating a button element 
let exitButton = L.control({ position: 'bottomright' });

exitButton.onAdd = function (myMap) {
  this._div = L.DomUtil.create('div', "exit-button");
  this._div.innerHTML = 'Exit';
  this._div.onmousedown = this._div.onclick = function () {
    myMap.setView(originalCenter, originalZoom);
  };
  return this._div;
};
// Adding the exit button to the map
exitButton.addTo(myMap);


// Event listener for the button
document.querySelector('.exit-button').addEventListener('click', function () {
  myMap.setView(originalCenter, originalZoom);
});





const largestData = "../Resources/infoMapData.json";

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
//using D3 to impoort json file largestData
d3.json(largestData).then(function (data) {
  let companies = reformatData(data);
  //looping over the list of companies and adding each company as a marker to the map

  companies.forEach((company) => {
    let customIcon = L.icon({
      iconUrl: company.Logo,
      iconSize: [30, 30],
      iconAnchor: [19, 19],
      popupAnchor: [-3, -76],
    });
    // assigning the marker to a variable
    let marker = L.marker([company.Latitude, company.Longitude], { icon: customIcon });
    marker.bindPopup(
      `<h3>${company.Name}</h3>
        <h2>rank: ${company.Rank}</h2>
        <p>Market Cap: ${company.marketcap}<br>Price (USD): ${company["price (USD)"]}</p>`
    )
      .on('click', function (e) {
        myMap.setView(e.latlng, 8)
      }).addTo(carManufacturers)
  });
  });
//refrences: https://leaflet-extras.github.io/leaflet-providers/preview/ for the base map
//https://stackoverflow.com/questions/16927793/marker-in-leaflet-click-event for the zoom in and center markers when clicked
// https://www.investing.com/academy/statistics/tesla-facts/