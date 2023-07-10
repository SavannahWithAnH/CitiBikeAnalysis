let myMap = L.map("map", {
    center: [50, 0],
    zoom: 1.45,
});
//adding atile layer to the map
L.tileLayer(
    "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 20,
        attribution:
            'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>' +
            "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101> Github<a/>",
    }
).addTo(myMap);

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
            iconSize: [25, 25],
            iconAnchor: [19, 19],
            popupAnchor: [-3, -76],
        });

        L.marker([company.Latitude, company.Longitude], { icon: customIcon })
            .bindPopup(
                `<h2>${company.Name}</h2><p>Market Cap: ${company.marketcap}<br>Price (USD): ${company["price (USD)"]}</p>`
            )
            .addTo(myMap);
    });
});
