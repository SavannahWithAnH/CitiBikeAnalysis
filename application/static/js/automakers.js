const auto_data = "../static/Largest automakers by market capitalization.json";
const auto_stockfeed = "../static/Top 10 Automaker Stocks 2010-2022.json";

let option = '';
let dataSet;

//d3 to load data
d3.json(auto_data).then(function (data) {
  dataSet = data;

  let optionMenu = d3.select('#selDataset');

  console.log(dataSet.Name)

  for (let i = 0; i < 10; i++) {
    optionMenu.append('option').text(dataSet.Name[String(i)]).property('value', dataSet.Symbol[String(i)]);
  };

  console.log(dataSet)
});

// d3 to load data
d3.json(auto_stockfeed).then(function (stockfeed) {
  dataSet = stockfeed;

  console.log(dataSet)
});

// initialize function
function init() {
  let option1 = 'TSLA';
  d3.json(auto_stockfeed).then(function (data) {
    dataSet = data;
    displayLineChart(option1, dataSet);
  }).then(function () {
    displayHBarChart(option1, dataSet);
  });
};

init();

function optionChanged(value) {
  option = value;
  displayLineChart(option, dataSet);
  displayHBarChart(option, dataSet);
}

// bar chart
function displayHBarChart(option, dataSet) {
  let trace1 = {
    x: [],
    y: [],
    name: '2010',
    type: 'bar'
  };

  let trace2 = {
    x: [],
    y: [],
    name: '2022',
    type: 'bar'
  };

  for (let i = 0; i < dataSet.length; i++) {
    let element = dataSet[i];
    let date = new Date(element.Date);
    if (date >= new Date('2010-01-01') && date <= new Date('2022-12-31')) {
      if (date >= new Date('2010-01-01') && date <= new Date('2010-12-31')) {
        trace1.x.push(element.Symbol);
        trace1.y.push(element.Close);
      } else if (date >= new Date('2022-01-01') && date <= new Date('2022-12-31')) {
        trace2.x.push(element.Symbol);
        trace2.y.push(element.Close);
      }
    }
  };
 
  let data = [trace1, trace2];

  let layout = {barmode: 'group',
  title: 'Automaker stock in 2010 vs 2022',
  xaxis: {
    title: 'Automaker Stock Symbol'
  },
  yaxis: {
    title: 'Value'
  }
};

  Plotly.newPlot('bar', data, layout, option);
};

// line chart
function displayLineChart(option, dataSet) {

  let x = []
  let y = []

  dataSet.forEach(element => {
    if (element.Symbol == option) {
      x.push(element.Date);
      y.push(element['Adj Close'])
    }
  });
  console.log(x, y);

  let trace1 = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'lines',
    line: {
      color: '#000000',
      width: 1.5
    }
  }

  let data = [trace1];

  let layout = {
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Adjusted Close Value'
    },
    title: 'Stock Value 2010 to 2022'
  };

  Plotly.newPlot('line', data, layout);

};