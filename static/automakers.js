const auto_data = "../Resources/Largest automakers by market capitalization.json";
const auto_stockfeed = "../Resources/Top 10 Automaker Stocks 2010-2022.json";

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
    if (element.Date === '2010-12-31') {
      trace1.x.push(element.Symbol);
      trace1.y.push(element.Close);
      console.log('Added element to trace1:', element);
    } else if (element.Date === '2022-12-31') {
      trace2.x.push(element.Symbol);
      trace2.y.push(element.Close);
      console.log('Added element to trace2:', element);
    }
  }

  let data = [trace1, trace2];

  let layout = { barmode: 'group' };

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
    title: 'Stock Value 2010-2022'
  };

  Plotly.newPlot('line', data, layout);

}
