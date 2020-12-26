function buildMetadata(sample) {

    // Metadata Panel
    var metadata_url = "/metadata/" + sample;

    var metadata = d3.select("#sample-metadata");
    metadata.html("");

    d3.json(metadata_url).then(function(sample){
        Object.defineProperties(sample).forEach(([key, value]) => {
            console.log(key, value);
            metadata.append("h6").text('${key.toUpperCase()}:- ${value}');
        });
    });

    // Guage Indicator

    d3.json(metadata_url).then(function(data){

        var wash_freq = data.WFREQ;
        console.log(wash_freq);

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wash_freq,
              title: { text: "<b>Wash Frequency</b><br><i>Scrubs per week</i>"},
              type: "indicator",
              mode: "gauge+number+range",
              gauge: {
                axis: { range: [0, 10] },
                bar: {color: "darkblue"},
                steps: [
                  { range: [0, 1], color: "rgb(204,214,204)" },
                  { range: [1, 2], color: "rgb(186,206,186)" },
                  { range: [2, 3], color: "rgb(168,199,168)" },
                  { range: [3, 4], color: "rgb(150,191,150)" },
                  { range: [4, 5], color: "rgb(132,184,132)" },
                  { range: [5, 6], color: "rgb(114,176,114)" },
                  { range: [6, 7], color: "rgb(96,168,96)" },
                  { range: [7, 8], color: "rgb(78,161,78)" },
                  { range: [8, 9], color: "rgb(60,153,60)" },
                  { range: [9, 10], color: "rgb(42,146,42)" }
                ],
                }
            }
            ];
      
          var layout = { width: 400, height: 300, margin: { t: 1, b: 1 } };
      
          Plotly.newPlot('gauge', data, layout);        

    });
    // Charting the data

}