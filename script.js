(function(){
  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  const getData = async () => {
    const response = await fetch(dataUrl);
    return await response.json();
  }
  
  const renderData = async() => {
    const dataObj = await getData();
    const data = dataObj.data;
    console.log(data);
  }
  
  renderData();
})()