// Read the JSON file -- Remember to use de Server
d3.json("samples.json").then((PlotData) => {
  console.log(Object.keys(PlotData))
  console.log(PlotData);
  let data = PlotData;
  
    // Create the dropdown list
    let idList = data.names;
    for (var i = 0; i < idList.length; i++) {
      selectBox = d3.select("#selDataset");
      selectBox.append("option").text(idList[i]);
    }
  
    // Set up default plot
    Plots(0)
  
    // Function to update the plot 
    function Plots(index) {
  
  
      // Filter values to create the horizontal bar chart & gauge chart
      let OTUsSS = data.samples[index].otu_ids;
      //console.log(OTUsSS);
      let FreqSS = data.samples[index].sample_values;
      let OTUsLabels = data.samples[index].otu_labels;
      let WashFrequency = data.metadata[+index].wfreq;
      //console.log(WashFrequency);
  
  
      // Create the demographic card
      let CKeys = Object.keys(data.metadata[index]);
      let CValues = Object.values(data.metadata[index])
      let DData = d3.select('#sample-metadata');
  
      // Reset the data
      DData.html("");
  
      for (var i = 0; i < CKeys.length; i++) {
  
        DData.append("p").text(`${CKeys[i]}: ${CValues[i]}`);
      };
  
  
      // Organize data for horizontal bar chart
      let TTTT = data.samples[0].otu_labels.slice(0, 10).reverse();
      let TTFreq = FreqSS.slice(0, 10).reverse();
      let TTOTUS = OTUsSS.slice(0, 10).reverse();
      let TTLabels = TTOTUS.map((otu => "OTU " + otu));
      let Labels = TTLabels.reverse();
  
      // Set Trace1 - Bar
      let trace1 = {
        x: TTFreq,
        y: Labels,
        text: TTTT,
        name: "",
        type: "bar",
        orientation: "h"
      };
  
      // Data and Layout Bar Graph
      let BarGraph = [trace1];
      let Layout1 = {
        title: "Top 10 OTUs",
        margin: {
          l: 75,
          r: 75,
          t: 75,
          b: 50
        }
      };
  
      // Display Graph
      Plotly.newPlot("bar", BarGraph, Layout1);
      
      //Create the Palette of Colors
      let PaletteLB = [];
      let R = 15
      let G = 255
      let B = 157
      let X = 50

      for (var i = 0; i <= X; i++) {
          R = R + 10 
          B = B + 5
          RGB = ("rgb("+R+", 255, "+B+")")
          PaletteLB.push(RGB)
      }

      console.log(PaletteLB);

      // Set Trace2 - Bubble
      trace2 = {
        x: OTUsSS,
        y: FreqSS,
        text: OTUsLabels,
        mode: 'markers',
        marker: {
          color: PaletteLB,
          opacity: [1, 0.8, 0.6, 0.4],
          size: FreqSS
        }
      }
  
      //Data and Layouth Bubble Graph
      let BubbleGraph = [trace2];
      let Layout2 = {
        title: 'OTU Frequency',
        // fill: 'gradient',
        // theme: {
        //   palette: 'palette2'
        // },
        showlegend: false,
        height: 600,
        width: 930
      }
  
      // Display BubbleGraph
      Plotly.newPlot("bubble", BubbleGraph, Layout2)
  
      //Set Graph 3 - Gauge
      //https://plotly.com/javascript/gauge-charts/
      //https://bernii.github.io/gauge.js/

  
      let trace3 = [{
        domain: {x: [0, 1], y: [0,1]},
        type: "indicator",
        mode: "gauge+number",
        value: WashFrequency,
        title: { text: "Belly Button Washes Per Week" },
        gauge: {
          axis: { range: [0, 9], tickwidth: 0.5, tickcolor: "black" },
          bar: { color: "#669999" },
          bgcolor: "white",
          borderwidth: 1,
          bordercolor: "transparent",
          steps: [
            { range: [0,1], color: "#d3ffed" },
            { range: [1,2], color: "#bfffe5" },
            { range: [2,3], color: "#abffdd" },
            { range: [3,4], color: "#98ffd6" },
            { range: [4,5], color: "#84ffce" },
            { range: [5,6], color: "#70ffc6" },
            { range: [6,7], color: "#5dffbe" },
            { range: [7,8], color: "#49ffb6" },
            { range: [8,9], color: "#35ffae" }
          ],
        }
      }];
  
      //Data and Layouth Gauge Graph
      GaugeData = trace3;
      let Layout3 = {
        width: 600,
        height: 500,
        margin: { t: 0, b: 0 },
        //limits: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        // staticLabels: {
        //   font: "10px sans-serif",  // Specifies font
        //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],  // Print labels at these values
        //   color: "#000000",  // Optional: Label text color
        //   fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        // }
      };
  
      // Display GaugeGraph
      Plotly.newPlot("gauge", GaugeData, Layout3);
  
    }
  
    // On button click, call refreshData()
    d3.selectAll("#selDataset").on("change", refreshData);
  
  
  
    function refreshData() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var personsID = dropdownMenu.property("value");
      console.log(personsID);
      // Initialize an empty array for the person's data
      console.log(data)
  
      for (var i = 0; i < data.names.length; i++) {
        if (personsID === data.names[i]) {
          Plots(i);
          return
        }
      }
    }
  
  });