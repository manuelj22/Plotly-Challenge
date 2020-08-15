d3.json("samples.json").then((samples_data) => {
    let option = d3.select("#selDataset");
    let data_names = samples_data.names

    // Setting up the selection options
    data_names.forEach(d =>{
        option.append("option")
            .property("value", d)
            .text(d)
    });

});

function optionChanged(selection){
    d3.json("samples.json").then((samples_data) => {
        let sel = d3.select("#sample-metadata"); 
        let data_names = samples_data.names
        
        // getting data for the information chart and the plots
        let metadata = samples_data.metadata.filter(d => d.id === parseInt(selection))[0];
        let samples = samples_data.samples.filter(d => d.id === selection)[0];
        //console.log(metadata)

        // Making Information Chart
        sel.selectAll("p").remove()
        let entries_data = Object.entries(metadata)
        //console.log(entries_data)
        
        entries_data.forEach(d => {
            sel
            .append("p")
            .text(`${d[0]}: ${d[1]}`)
        });

        // Plotting Bar plot
        let traceBar = {
            x: samples.sample_values,
            y: samples.otu_ids.sort((a, b) => a - b).map(d => "OTU " + d),
            text: samples.otu_labels,
            type: "bar",
            orientation: "h"
        };
    
        let dataBar = [traceBar]  
        Plotly.newPlot("bar", dataBar);
    
        // Plotting Bubble plot
        traceBuble = {
            x: samples.otu_ids.sort((a, b) => a - b),
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            marker: {
                size: samples.sample_values, 
                sizeref: 0.1,
                sizemode: "area"
            }
        };
    
        let dataBubble = [traceBuble];
        Plotly.newPlot("bubble", dataBubble);

    });
};