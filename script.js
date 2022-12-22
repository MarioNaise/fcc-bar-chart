(function(){
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  const getData = async () => {
    const response = await fetch(dataUrl);
    const dataObj = await response.json();
    const data = dataObj.data;
    return await data;
  }
  
  const renderData = async() => {
    const dataset = await getData();
    const w = 1000;
    const h = 500;
    const padding = 30;

    const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

    console.log(yScale(200))
    
    const svg = d3.select("main")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
    
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => h - d[1] / 50)
    .attr("width", ((w - (padding*2)) / dataset.length ) * 0.67)
    .attr("height", (d) => d[1] / 50)
    
  }

  
  renderData();
})()