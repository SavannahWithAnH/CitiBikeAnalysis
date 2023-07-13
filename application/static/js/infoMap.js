// // Create base layers for the map
// let street = L.tileLayer(
//   "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
//   {
//     maxZoom: 20,
//     attribution:
//       'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>' +
//       "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101> Github<a/>",
//   }
// );

// let satellite = L.tileLayer(
//   "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
//   {
//     attribution:
//       'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' +
//       "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101/leaflet-challenge> Github<a/>",
//   }
// );

// let carManufacturers = new L.layerGroup(); // This layer group contains all the car manufacturer icons

// // Create a base map object
// let baseMaps = {
//   "Street Map": street,
//   "Satellite": satellite,
// };

// let ranking = new L.layerGroup();

// // Create an overlay object
// let overlayMaps = {
//   Ranking: ranking,
//   "Manufacturers Info": carManufacturers,
// };

// let myMap = L.map("map", {
//   center: [39, 4],
//   zoom: 2,
//   layers: [street, ranking],
// });

// function getIconSize(marketcap) {
//   let cap = parseFloat(marketcap);
//   let size = Math.sqrt(cap) / 1000000;

//   if (size < 10) size = 10;
//   if (size > 100) size = 100;

//   return [size, size];
// }

// const largestData = "../Resources/infoMapData.json";

// let timeline = L.control.timelineSlider({
//   timelineItems: ["Before", "After"],
//   changeMap: function ({ label, value, map }) {
//     console.log("Changed time to:", label);
//     d3.json(largestData).then(function (data) {
//       let companies = reformatData(data.features);

//       if (label === "After") {
//         carManufacturers.clearLayers();
//         companies.forEach((company) => {
//           let customIcon = L.icon({
//             iconUrl: company.Logo,
//             iconSize: getIconSize(company.marketcap),
//             iconAnchor: [19, 19],
//             popupAnchor: [-3, -76],
//           });

//           let marker = L.marker([company.Latitude, company.Longitude], {
//             icon: customIcon,
//           });

//           marker
//             .bindPopup(
//               `<h3>${company.Name}</h3>
//               <h2>Rank: ${company.Rank}</h2>
//               <p>Market Cap: ${company.marketcap}<br>Price (USD): ${company["price (USD)"]}</p>`
//             )
//             .on("click", function (e) {
//               myMap.setView(e.latlng, 8);
//             })
//             .addTo(carManufacturers);
//         });
//       }
//     });
//   },
// });
// // converting the json file to a different format
// function reformatData(data) {
//   let result = [];

//   for (let i = 0; i < 10; i++) {
//     let company = {
//       Rank: data[i].Rank,
//       Name: data[i].Name,
//       Symbol: data[i].Symbol,
//       marketcap: data[i].marketcap,
//       "price (USD)": data[i]["price (USD)"],
//       country: data[i].country,
//       Latitude: data[i].Latitude,
//       Longitude: data[i].Longitude,
//       Logo: data[i].Logo,
//       IPO: data[i].IPO,
//     };
//     result.push(company);
//   }

//   return result;
// }

// timeline.addTo(myMap);


// let originalZoom = myMap.getZoom();
// let originalCenter = myMap.getCenter();

// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false,
// }).addTo(myMap);

// let exitButton = L.control({ position: "bottomright" });

// exitButton.onAdd = function (myMap) {
//   this._div = L.DomUtil.create("div", "exit-button");
//   this._div.innerHTML = "Exit";
//   this._div.onmousedown = this._div.onclick = function () {
//     myMap.setView(originalCenter, originalZoom);
//   };
//   return this._div;
// };

// exitButton.addTo(myMap);

// document.querySelector(".exit-button").addEventListener("click", function () {
//   myMap.setView(originalCenter, originalZoom);
// });

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

const largestData = "../static/infoMapData.json";

//defininf the timeline variable and setting the parameters for certain years
function markerSize(magnitude) {
  return magnitude / 2; // Adjust the division factor as needed
}
let timeline = L.control.timelineSlider({
  timelineItems: ["Before", "After"],
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
            `<h3>${company.Name}</h3>
            <h2>rank: ${company.Rank}</h2>
            <p>Market Cap: ${company.marketcap}<br>Price (USD): ${company["price (USD)"]}</p>`
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

//using D3 to impoort json file largestData

  //looping over the list of companies and adding each company as a marker to the map
//   companies.forEach((company) => {
//     let customIcon = L.icon({
//       iconUrl: company.Logo,
//       iconSize: [30, 30],
//       iconAnchor: [19, 19],
//       popupAnchor: [-3, -76],
//     });
//     // assigning the marker to a variable
//     let marker = L.marker([company.Latitude, company.Longitude], {
//       icon: customIcon,
//     });
//     marker
//       .bindPopup(
//         `<h3>${company.Name}</h3>
//         <h2>rank: ${company.Rank}</h2>
//         <p>Market Cap: ${company.marketcap}<br>Price (USD): ${company["price (USD)"]}</p>`
//       )
//       .on("click", function (e) {
//         myMap.setView(e.latlng, 8);
//       })
//       .addTo(carManufacturers);
//   });
// });
//refrences: https://leaflet-extras.github.io/leaflet-providers/preview/ for the base map
//https://stackoverflow.com/questions/16927793/marker-in-leaflet-click-event for the zoom in and center markers when clicked
// https://www.investing.com/academy/statistics/tesla-facts