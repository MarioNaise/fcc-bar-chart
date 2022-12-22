(function() {
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  const getData = async () => {
    const response = await fetch(dataUrl);
    const dataObj = await response.json();
    const data = dataObj.data;
    return await data;
  }

  const renderData = async () => {
    const dataset = await getData();
    const w = 1000;
    const h = 700;
    const padding = 50;

    const xScale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([0, h - padding]);

    const tooltip = d3
      .select("main")
      .append("div")
      .attr("id", "tooltip")
      .style("width", "150px")
      .style("height", "100px")
      .style("background-color", "rgba(122,168,214,.5)")
      .style("position", "absolute")
      .style("bottom", padding*2+"px")
      .style("color", "white")
      .style("outline", "1px solid black")
      .style("display", "none")
      

    const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => h - yScale(d[1]) - padding)
      .attr("width", (w - (padding * 2)) / dataset.length)
      .attr("height", (d) => yScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d)=>d[0])
      .attr("data-gdp", (d)=>d[1])
      .on("mouseover", (e, d)=>{
        const year = d[0].slice(0,4);
        const month = d[0].slice(5,7);
        
        tooltip
        .attr("data-date", d[0])
        .attr("data-gdp", d[1])
        .style("display", "block")
        .style("left", e.screenX+"px")
        .html(
          `<p>${month}/${year}</p>
          <p>$${d[1]} Billion</p>`
        )
        
      })
      .on("mouseout", (e, d)=>{
        tooltip
        .style("display", "none")
      })
  }


  renderData();
})()