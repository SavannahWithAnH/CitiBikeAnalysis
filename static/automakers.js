const auto_data="../Resources/Largest automakers by market capitalization.json";
const auto_stockfeed="../Resources/Top 10 Automaker Stocks 2010-2022.json";
// console.log(auto_data);

var option = '';
var dataSet ;


  d3.json(auto_data).then(function(data) {
    dataSet = data;

    var optionMenu = d3.select('#selDataset');

    // console.log(dataSet.Name)

    for (let i=0; i < 10; i++) {
      optionMenu.append('option').text(dataSet.Name[String(i)]).property('value', dataSet.Symbol[String(i)]);
    };

    // console.log(dataSet)
  });

  d3.json(auto_stockfeed).then(function(stockfeed) {
      dataSet = stockfeed;

      // console.log(dataSet)
    });
  
      
      function init() {
        let option1= 'TSLA';
        d3.json(auto_stockfeed).then(function (data) {
          dataSet = data;
          displayLineChart(option1, dataSet);
          // console.log(dataSet);
        });
        // $.getJSON(auto_stockfeed, function (data) {
        //   stockfeed = data;
        //   console.log(stockfeed);
        // });
      }
      init();
      // function init() {
      //   option = 'TSLA';
      //   displayLineChart(option,dataSet);

  // }
    
//     displayMetaData(940,dataSet);
//     displayHBarChart(940,dataSet);
    


//  })
// }

// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }

function optionChanged(value) {
    option = value;
    displayLineChart(option,dataSet);
}

// function displayMetaData(option,dataSet) {
    
    
//     var mtdata = dataSet.metadata.filter(row => row.id == option);
//     d3.select('#sample-metadata').html(displayObject(mtdata[0]));
        
// }

// function displayObject(obj) {
//     var str = '';
//     Object.entries(obj).forEach(([key,value]) => {
//         str += `<br>${key}:${value}</br>`;
//         if(key=='wfreq'){
//             buildGauge(value);
//             console.log('gauge value is:' +value);
//         }
        
//     });
//     return str;
// }

// function displayHBarChart(option,dataSet) {
    
//     var barData = dataSet.samples.filter(sample => sample.id == option);
//     console.log(barData);
    

//     var y = barData.map(row =>row.otu_ids);  
//     var y1 =[];

    
//     for(i=0;i<y[0].length;i++){
//         y1.push(`OTU ${y[0][i]}`);
//     }

//     var x = barData.map(row =>(row.sample_values));
//     var text = barData.map(row =>row.otu_labels);
   
//     var trace = {
//         x:x[0].slice(0,10),
//         y:y1.slice(0,10),
//         text:text[0].slice(0,10),
//         type:'bar',
//         orientation:'h',
//         marker: {
//             color: 'rgba(121, 40, 198, 1)',
//             width: 1
//           }
//     };

//     var data = [trace];

//     var layout = {
//         yaxis: {
//             autorange: 'reversed' 
//         },
//         xaxis: {
//             title: 'Top 10 Bacteria Cultures Found' 
//         }
//     }
    
    
//     Plotly.newPlot('bar',data,layout);
// }

function displayLineChart(option,dataSet) {

  var x = []
  var y = []

console.log(option);
console.log(dataSet);


    dataSet.forEach(element => {
      if (element.Symbol == option) {
      x.push(element.Date);
      y.push(element['Adj Close'])  
      }
    });
    // console.log(x, y); 
  
    var trace1 = {
        x:x,
        y:y,
        type:'scatter',
        mode: 'lines',
        line: {
          color: '#000000',
          width: 1.5
        }
      }       

    var data = [trace1];

    var layout = {
        xaxis:{
            title: 'Year'
        },
        yaxis:{
            title: 'Adjusted Close Value'
        },
        title: 'Stock Value 2010-2022'
    };

    Plotly.newPlot('line',data,layout);

}
