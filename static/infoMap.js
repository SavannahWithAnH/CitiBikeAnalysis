let myMap = L.map("map", {
  center: [5, 5],
  zoom: 2.35,
});
//adding atile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);
//using D3 to impoort json file largestData
const largestData =
  "../Resources/Largest automakers by market capitalization.json";
d3.json(largestData).then(function (data) {
  let companyInfoList = Object.keys(data.Name).map((key) => ({
    name: data.Name[key],
    founded: data.country[key],
    lat: 30.2672,
    long: 97.7431,
    info: `Market Cap: ${data.marketcap[key]}<br>Price (USD): ${data["price (USD)"][key]}`,
    logo: "https://www.carlogos.org/car-logos/honda-logo.png",
  }));
// applayin a custome logo to the markers
  let customIcon = L.icon({
    iconUrl: "https://www.carlogos.org/car-logos/honda-logo.png",
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [-3, -76],
  });

  //looping over the list of companies and adding each company as a marker to the map
  companyInfoList.forEach((company) => {
    L.marker([company.lat, company.long], {icon: customIcon})
      .bindPopup(`<h2>${company.name}</h2><p>${company.info}</p>`)
      .addTo(myMap);
  });
});
