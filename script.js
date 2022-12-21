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
    console.log("dataset: ", dataset);
    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - d[1])
       .attr("width", 25)
       .attr("height", (d, i) => d[1])
  }
  
  renderData();
})()