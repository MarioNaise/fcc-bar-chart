(function(){
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  const getData = async () => {
    const response = await fetch(dataUrl);
    const dataObj = await response.json();
    const data = dataObj.data;
    return await data;
  }
  
  const renderData = async() => {
    const data = await getData();
    console.log(data);
  }
  
  renderData();
})()