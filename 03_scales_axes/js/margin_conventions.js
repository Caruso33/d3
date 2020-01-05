// margin convention
const margin = {
    top: 20,
    right: 50,
    bottom: 50,
    left: 80
  };
  
  const canvas_dimensions = { width: 960, height: 500 };
  
  const content_width = canvas_dimensions.width - margin.left - margin.right,
    content_height = canvas_dimensions.height - margin.top - margin.bottom;
  
  // margin logic applied
  const g = d3
    .select("#lessons")
    .append("svg")
    .attr("width", canvas_dimensions.width)
    .attr("height", canvas_dimensions.height)
    // group elements are useful for applying transforms on many elements
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20);
  
  g.append("circle")
    .attr("cx", content_width - 20)
    .attr("cy", content_height - 20)
    .attr("r", 20);
  