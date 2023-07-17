/*  The first part of the code uses D3.js to asynchronously load data from two JSON files, one containing information
 about the automakers and their market capitalization, and the other containing information about stock prices from 2010-2022.*/
const auto_data =
  "../Resources/Largest automakers by market capitalization.json";
const auto_stockfeed = "../Resources/Top 10 Automaker Stocks 2010-2022.json";

let option = "";
let dataSet;

//d3 to load data
d3.json(auto_data).then(function (data) {
  dataSet = data;

  let optionMenu = d3.select("#selDataset");

  console.log(dataSet.Name);

  for (let i = 0; i < 10; i++) {
    optionMenu
      .append("option")
      .text(dataSet.Name[String(i)])
      .property("value", dataSet.Symbol[String(i)]);
  }

  console.log(dataSet);
});

// d3 to load data
d3.json(auto_stockfeed).then(function (stockfeed) {
  dataSet = stockfeed;

  console.log(dataSet);
});
// ===============================================================================================================

/* An initialization function (init()) is defined, which sets a default automaker (in this case, 'TSLA' for Tesla),
 and calls two other functions to display a line chart and a horizontal bar chart for this automaker.
  This function runs as soon as the webpage loads.*/
// initialize function
function init() {
  let option1 = "TSLA";
  d3.json(auto_stockfeed)
    .then(function (data) {
      dataSet = data;
      displayLineChart(option1, dataSet);
    })
    .then(function () {
      displayHBarChart(option1, dataSet);
    });
}

init();
// ================================================================================================================

/*Option Changed Function:  runs whenever the selected option in the dropdown menu changes. It receives the new value 
(the symbol of the selected automaker), and calls the functions to update the line chart and the bar chart with the new data.*/
function optionChanged(value) {
  option = value;
  displayLineChart(option, dataSet);
  displayHBarChart(option, dataSet);
}
//==================================================================================================================

/*Bar Chart Function (displayHBarChart): receives an automaker symbol and a dataset as arguments. It processes the data to create two traces,
 one for 2010 and one for 2022. Each trace contains the stock closing prices for the selected automaker for the respective year.
These traces are then plotted using Plotly.js.*/
// bar chart
function displayHBarChart(option, dataSet) {
  let trace1 = {
    x: [],
    y: [],
    name: "2010",
    type: "bar",
  };

  let trace2 = {
    x: [],
    y: [],
    name: "2022",
    type: "bar",
  };

  for (let i = 0; i < dataSet.length; i++) {
    let element = dataSet[i];
    let date = new Date(element.Date);
    if (date >= new Date("2010-01-01") && date <= new Date("2022-12-31")) {
      if (date >= new Date("2010-01-01") && date <= new Date("2010-12-31")) {
        trace1.x.push(element.Symbol);
        trace1.y.push(element.Close);
      } else if (
        date >= new Date("2022-01-01") &&
        date <= new Date("2022-12-31")
      ) {
        trace2.x.push(element.Symbol);
        trace2.y.push(element.Close);
      }
    }
  }

  let data = [trace1, trace2];

  let layout = {
    barmode: "group",
    title: "Automaker stock in 2010 vs 2022",
    xaxis: {
      title: "Automaker Stock Symbol",
    },
    yaxis: {
      title: "Value",
    },
  };

  Plotly.newPlot("bar", data, layout, option);
}

// line chart
function displayLineChart(option, dataSet) {
  let x = [];
  let y = [];

  dataSet.forEach((element) => {
    if (element.Symbol == option) {
      x.push(element.Date);
      y.push(element["Adj Close"]);
    }
  });
  console.log(x, y);

  let trace1 = {
    x: x,
    y: y,
    type: "scatter",
    mode: "lines",
    line: {
      color: "#000000",
      width: 1.5,
    },
  };

  let data = [trace1];

  let layout = {
    xaxis: {
      title: "Year",
    },
    yaxis: {
      title: "Adjusted Close Value",
    },
    title: "Stock Value 2010 to 2022",
  };

  Plotly.newPlot("line", data, layout);
}


// MeMo: 

// Data Loading: D3.js is used to load data from JSON files.

// Data Visualization: Plotly.js is used to plot the data into line and bar charts.

// Dropdown menu: The value selected in the dropdown menu determines the data to be visualized.

// Initialization: By default, data for Tesla ('TSLA') is displayed when the webpage loads.

// Updating Charts: When a different automaker is selected from the dropdown, the charts update to reflect the new data.


// How to Run

// Ensure that you have a web server set up to serve your HTML, CSS, and JavaScript files.

// Open the HTML file in a web browser. The webpage should automatically display the line and bar charts for Tesla.

// Select a different automaker from the dropdown menu to update the charts with the new data.