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

    const yearsDate = dataset.map((item)=>{
      return new Date(item[0]);
    });

    const xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);
    console.log(xMax)

    const xScale = d3.scaleTime()
      .domain([d3.min(yearsDate), xMax])
      .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding,0]);


    const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

    const tooltip = d3
      .select("main")
      .append("div")
      .attr("id", "tooltip")
      

    const xAxis = d3.axisBottom(xScale);
    
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");
      
    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis)
       .attr("id", "y-axis");
      

    
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return xScale(yearsDate[i]);
      })
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => h - yScale(d[1]) - padding)
      .attr("width", (w - (padding * 2)) / dataset.length)
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